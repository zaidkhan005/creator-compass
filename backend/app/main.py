from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import ReportRequest
from dotenv import load_dotenv
import os
from googleapiclient.discovery import build
import re
import google.generativeai as genai
import json
import time
from googleapiclient.errors import HttpError

# Load environment variables from .env file
load_dotenv()

# Initialize the FastAPI application
app = FastAPI()

# --- CORS Middleware ---
# This allows our Next.js frontend to communicate with this backend.
# IMPORTANT: In production, you should restrict the origins to your actual domain.
frontend_url = os.getenv("FRONTEND_URL")
origins = [
    *( [frontend_url] if frontend_url else [] ),
    # Production domains
    "https://creator-compass-delta.vercel.app",
    "https://creator-compass-328lgmqu4-zaidkhanji1-gmailcoms-projects.vercel.app",
    # Local development
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_channel_id_from_url(url: str):
    # Extracts channel ID or handle/username token from various YouTube URL formats
    patterns = [
        r'(?:youtube\.com|youtu\.be)/(?:c/|channel/|@)?([a-zA-Z0-9_-]+)'
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


async def fetch_competitor_data(competitor_urls: list):
    if not competitor_urls:
        return None

    youtube_api_key = os.getenv("YOUTUBE_API_KEY")
    if not youtube_api_key:
        return {"error": "YouTube API key is not configured."}

    youtube = build('youtube', 'v3', developerKey=youtube_api_key)
    competitor_analysis = []

    for url in competitor_urls:
        channel_id_or_name = get_channel_id_from_url(url)
        if not channel_id_or_name:
            continue

        try:
            # Try to get channel by username/handle if it's a custom URL or handle
            search_request = youtube.search().list(
                q=channel_id_or_name,
                type='channel',
                part='snippet',
                maxResults=1
            )
            search_response = search_request.execute()

            if not search_response.get('items'):
                competitor_analysis.append({"channel": url, "recent_videos": [], "note": "Channel not found"})
                continue

            channel_id = search_response['items'][0]['snippet']['channelId']
            channel_title = search_response['items'][0]['snippet']['title']

            # Get the uploads playlist ID
            channel_request = youtube.channels().list(
                part='contentDetails',
                id=channel_id
            )
            channel_response = channel_request.execute()
            uploads_playlist_id = channel_response['items'][0]['contentDetails']['relatedPlaylists']['uploads']

            # Get the latest videos from the uploads playlist
            playlist_request = youtube.playlistItems().list(
                playlistId=uploads_playlist_id,
                part='snippet',
                maxResults=10
            )
            playlist_response = playlist_request.execute()

            videos = [item['snippet']['title'] for item in playlist_response.get('items', [])]
            competitor_analysis.append({"channel": channel_title, "recent_videos": videos})

        except HttpError as e:
            status = getattr(e, 'status_code', None) or getattr(e, 'resp', {}).status if hasattr(e, 'resp') else None
            print(f"YouTube API error for {url}: {e}")
            competitor_analysis.append({"channel": url, "recent_videos": [], "note": "YouTube API error"})
            continue
        except Exception as e:
            print(f"Error fetching data for {url}: {e}")
            competitor_analysis.append({"channel": url, "recent_videos": [], "note": "Unknown error fetching data"})
            continue

    return competitor_analysis


async def generate_ai_report(niche: str, region: str, competitor_data: list):
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        return {"error": "Gemini API key is not configured."}

    genai.configure(api_key=gemini_api_key)
    preferred_model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-pro")
    model = genai.GenerativeModel(preferred_model_name)

    # --- The Master Prompt ---
    # This prompt is the "secret sauce" of our application.
    # It instructs the AI on its persona, the required output format, and all the sections.
    prompt = f"""
    You are Creator Compass, a world-class YouTube strategist AI.
    Your task is to generate a comprehensive, data-driven YouTube content strategy report.
    The target creator's niche is: "{niche}"
    The target region is: "{region}"
    Here is the analysis of their top competitors: {json.dumps(competitor_data, indent=2)}

    Generate a complete, five-part report in valid JSON format. The JSON object should have a single root key called "report". Do not include any text or markdown formatting before or after the JSON object.

    The five parts of the report are:
    1.  "marketTrendAnalysis": Analyze the niche and region. Identify 3 breakout keywords or rising topics. For each, provide a "topic" and a "longevityScore" (either "Fad", "Seasonal", or "Evergreen").
    2.  "strategicPosition": Analyze the competitor data. Identify a clear "contentGap" that the creator can exploit. Also, find a "trendNicheFusion" idea that combines a broad trend with the creator's niche.
    3.  "targetAudiencePersona": Create a detailed "persona" for the ideal viewer. Include their "name", "age", "location", "painPoints", and "desiredOutcome".
    4.  "videoBlueprints": Generate 3 distinct video blueprints. Each blueprint in the list must contain:
        - "titleOptions": A list of 3 viral-style title options.
        - "hook": A scripted hook for the first 15 seconds.
        - "outline": A list of 3-4 key talking points for the video script.
        - "thumbnailConcept": A text description of a clickable thumbnail.
        - "creativeDirection": Suggestions for "tone", "visualStyle", and "music".
        - "seoPack": An "optimizedDescription" (2 paragraphs), a list of 10 "tags", and a list of 3 "hashtags".
    5.  "promotionPlan": Create a "socialMediaKit". Include 2 "twitterPosts" and 1 "communityPost" to promote one of the video ideas.
    """

    try:
        try:
            response = model.generate_content(prompt)
        except Exception as e:
            message = str(e)
            if "429" in message or "quota" in message.lower():
                print("Quota error encountered. Falling back to gemini-1.5-flash and retrying once...")
                time.sleep(1)
                fallback_model = genai.GenerativeModel('gemini-1.5-flash')
                response = fallback_model.generate_content(prompt)
            elif "permission" in message.lower() or "invalid api key" in message.lower():
                return {"error": "Gemini API key is invalid or lacks permissions."}
            else:
                raise

        cleaned_response = response.text.strip().replace('```json', '').replace('```', '')
        report_json = json.loads(cleaned_response)
        return report_json
    except json.JSONDecodeError:
        print("AI did not return valid JSON.")
        return {"error": "The AI returned an invalid response. Please try again."}
    except Exception as e:
        print(f"Error during AI generation: {e}")
        return {"error": "Failed to generate AI report."}


@app.get("/")
def read_root():
    return {"status": "Creator Compass Backend is running!"}


@app.post("/api/generate-report")
async def generate_report(request: ReportRequest):
    # Get the secret admin code from our environment variables
    admin_code = os.getenv("ADMIN_PROMO_CODE")

    if not request.niche or not request.region:
        raise HTTPException(status_code=400, detail={"status": "error", "message": "Niche and region are required."})

    # Check if the provided promo code matches the admin code
    if not (request.promoCode and admin_code and request.promoCode == admin_code):
        print("Access denied. Invalid or missing promo code.")
        raise HTTPException(status_code=403, detail={"status": "error", "message": "A valid promo code is required to generate a report."})

    print("Admin access successful. Fetching live data and generating AI report...")

    competitor_data = await fetch_competitor_data(request.competitors)
    if isinstance(competitor_data, dict) and competitor_data.get("error"):
        raise HTTPException(status_code=500, detail={"status": "error", "message": competitor_data["error"]})

    ai_report = await generate_ai_report(
        niche=request.niche,
        region=request.region,
        competitor_data=competitor_data,
    )

    if "error" in ai_report:
        raise HTTPException(status_code=502, detail={"status": "error", "message": ai_report["error"]})

    return {"status": "success", "report": ai_report.get("report")}


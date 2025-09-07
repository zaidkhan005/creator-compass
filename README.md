# Creator Compass

Production-ready setup guide

## Environment variables (do not commit .env)

Set these in Vercel Project Settings → Environment Variables:

- GEMINI_API_KEY
- GEMINI_MODEL (optional, defaults to gemini-1.5-pro)
- YOUTUBE_API_KEY
- ADMIN_PROMO_CODE
- FRONTEND_URL (optional, set to your Vercel domain to tighten CORS)

Local development can use a `.env` file, but it is ignored by git.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Create a new Vercel project and import the repo.
3. Add the environment variables listed above.
4. Deploy. Vercel uses `vercel.json` to build the Next.js app and run the FastAPI backend as a Python serverless function.

## Frontend → Backend calls

The frontend calls the backend via a relative path `/api/generate-report`, which Vercel routes to `backend/app/main.py` per `vercel.json`.

## Error handling

- Frontend shows a friendly error state with a Try Again button.
- Backend validates inputs and surfaces clear messages for invalid promo code, missing API keys, and third-party API errors.

## Accessibility and UX polish

- Labels are associated with inputs via `htmlFor`/`id`.
- Buttons include `aria-label`s where appropriate.
- Transitions use `framer-motion` which is already listed in dependencies.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

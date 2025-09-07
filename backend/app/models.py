from pydantic import BaseModel
from typing import List, Optional


class ReportRequest(BaseModel):
    niche: str
    competitors: List[str]
    region: str
    promoCode: Optional[str] = None


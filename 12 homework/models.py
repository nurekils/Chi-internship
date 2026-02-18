from pydantic import BaseModel, Field
from typing import List, Optional, Literal


class VacancyExtract(BaseModel):
    title: str = Field(min_length=2, max_length=120)

    seniority: Optional[
        Literal["junior", "middle", "senior", "lead"]
    ] = None

    must_have_skills: List[str] = Field(default_factory=list, max_length=30)
    nice_to_have_skills: List[str] = Field(default_factory=list, max_length=30)

    salary: Optional[str] = None
    location: Optional[str] = None

    remote_or_hybrid: Optional[
        Literal["remote", "hybrid", "office"]
    ] = None

    short_summary: str = Field(min_length=10, max_length=300)
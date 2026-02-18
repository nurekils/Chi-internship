import json
from openrouter_client import chat
from models import VacancyExtract
from pydantic import ValidationError


JOB_TEXT = """
Senior Backend Engineer (Python).
We build fintech product. Requirements: Python 3.11, FastAPI, Postgres, Docker, AWS.
Nice to have: Redis, Kafka. Location: Warsaw (hybrid). Salary: 6000-8000 EUR.
"""


def extract_structured(job_text: str) -> VacancyExtract:
    messages = [
        {
            "role": "system",
            "content": (
                "You are an information extraction system.\n"
                "Return ONLY valid JSON.\n"
                "Do NOT use markdown.\n"
                "Do NOT add explanations.\n"
                "Return a pure JSON object only."
            ),
        },
        {
            "role": "user",
            "content": f"""
Return ONLY valid JSON with EXACT keys:

title,
seniority,
must_have_skills,
nice_to_have_skills,
salary,
location,
remote_or_hybrid,
short_summary

Rules:
- seniority must be one of: "junior","middle","senior","lead" or null
- remote_or_hybrid must be one of: "remote","hybrid","office" or null
- skills must be arrays of strings
- If something is missing — use null
- short_summary MUST NOT be null. Always generate 1-2 sentences based only on the vacancy text.
- Use lowercase values for enums.

Vacancy:
{job_text}
""",
        },
    ]

    raw = chat(messages, temperature=0.0)

    print("\n=== RAW MODEL OUTPUT ===")
    print(raw)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        print("\n❌ JSON parsing failed!")
        raise e

    try:
        validated = VacancyExtract.model_validate(data)
    except ValidationError as e:
        print("\n❌ Pydantic validation failed!")
        print(e)
        raise e

    return validated


if __name__ == "__main__":
    result = extract_structured(JOB_TEXT)

    print("\n=== VALIDATED OBJECT ===")
    print(result)

    print("\n=== AS DICT ===")
    print(result.model_dump())
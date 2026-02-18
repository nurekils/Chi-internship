from openrouter_client import chat

def role_prompt(job_text: str):
    messages = [
        {"role": "system", "content": (
            "You are an HR analyst. Extract facts from text strictly without imagination. "
            "If something is missing, write 'null'."
        )},
        {"role": "user", "content": f"""
Extract from the vacancy text:
- title
- seniority (junior/middle/senior/lead)
- must_have_skills (list)
- nice_to_have_skills (list)
- salary (string or null)
- location (string or null)
- remote_or_hybrid (remote/hybrid/office/null)
- short_summary (1-2 sentences)

Vacancy:
{job_text}
"""}
    ]
    return chat(messages, temperature=0.2)

def few_shot_prompt(job_text: str):
    messages = [
        {"role": "system", "content": "Extract vacancy info. Follow the exact format of the example."},
        {"role": "user", "content": """
Example:

Vacancy:
"Junior Python Developer. Remote. Salary $1000-1500. Must have: Python, FastAPI, Docker. Nice to have: Postgres."

Output:
title: Junior Python Developer
seniority: junior
must_have_skills: [Python, FastAPI, Docker]
nice_to_have_skills: [Postgres]
salary: "$1000-1500"
location: null
remote_or_hybrid: remote
short_summary: "Junior Python developer role, fully remote, building FastAPI services with Docker."

Now do the same for this vacancy:
""" + job_text}
    ]
    return chat(messages, temperature=0.2)

def cot_prompt(job_text: str):
    messages = [
        {"role": "system", "content": (
            "Think step-by-step internally, but do NOT reveal your chain-of-thought. "
            "Return only the final extracted fields plus a brief (1-2 bullet) justification."
        )},
        {"role": "user", "content": f"""
Task: Extract fields (title, seniority, skills, salary, location, remote/hybrid, summary)
from this vacancy.

Vacancy:
{job_text}

Output format:
title: ...
seniority: ...
must_have_skills: [...]
nice_to_have_skills: [...]
salary: ...
location: ...
remote_or_hybrid: ...
short_summary: ...
justification:
- ...
- ...
"""}
    ]
    return chat(messages, temperature=0.2)

JOB_TEXT = """
Senior Backend Engineer (Python).
We build fintech product. Requirements: Python 3.11, FastAPI, Postgres, Docker, AWS.
Nice to have: Redis, Kafka. Location: Warsaw (hybrid). Salary: 6000-8000 EUR.
"""

if __name__ == "__main__":
    print("\n=== ROLE PROMPTING ===\n")
    print(role_prompt(JOB_TEXT))

    print("\n=== FEW-SHOT ===\n")
    print(few_shot_prompt(JOB_TEXT))

    print("\n=== CHAIN-OF-THOUGHT (HIDDEN) ===\n")
    print(cot_prompt(JOB_TEXT))
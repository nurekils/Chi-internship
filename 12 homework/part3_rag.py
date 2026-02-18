from __future__ import annotations

from pathlib import Path
from typing import List, Tuple

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from openrouter_client import chat


DOC_PATH = Path("notes.txt")


def chunk_text(text: str, chunk_size: int = 900, overlap: int = 150) -> List[str]:
    chunks = []
    i = 0
    text = text.strip()
    while i < len(text):
        chunk = text[i : i + chunk_size].strip()
        if chunk:
            chunks.append(chunk)
        i += chunk_size - overlap
    return chunks


def retrieve_tfidf(query: str, chunks: List[str], k: int = 2) -> List[Tuple[int, float, str]]:
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(chunks)
    q = vectorizer.transform([query])

    sims = cosine_similarity(q, X)[0]
    top_idx = sims.argsort()[::-1][:k]
    return [(int(i), float(sims[i]), chunks[i]) for i in top_idx]


def answer_without_context(question: str) -> str:
    return chat(
        [
            {"role": "system", "content": "Answer normally and be helpful."},
            {"role": "user", "content": question},
        ],
        temperature=0.2,
    )


def answer_with_context(question: str, context: str) -> str:
    return chat(
        [
            {
                "role": "system",
                "content": (
                    "Answer using ONLY the provided context. "
                    "If the answer is not in the context, say: 'I don't know based on the provided context.' "
                    "Be concise and factual."
                ),
            },
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion:\n{question}"},
        ],
        temperature=0.2,
    )


def main() -> None:
    if not DOC_PATH.exists():
        raise FileNotFoundError(
            "notes.txt not found. Create notes.txt (see the provided text) in the same folder."
        )

    doc = DOC_PATH.read_text(encoding="utf-8")
    chunks = chunk_text(doc)

    question = "Объясни разницу между Docker volume и bind mount в docker-compose и зачем том указывать два раза."

    no_ctx = answer_without_context(question)

    top = retrieve_tfidf(question, chunks, k=2)
    context = "\n\n---\n\n".join([f"[chunk #{idx}, score={score:.3f}]\n{txt}" for idx, score, txt in top])

    with_ctx = answer_with_context(question, context)

    print("\n==============================")
    print("QUESTION:")
    print(question)

    print("\n==============================")
    print("ANSWER (NO CONTEXT):")
    print(no_ctx)

    print("\n==============================")
    print("RETRIEVED CONTEXT:")
    print(context)

    print("\n==============================")
    print("ANSWER (WITH CONTEXT):")
    print(with_ctx)

    print("\n==============================")
    print("SHORT ANALYSIS (for report):")
    print(
        "- Without context: model may answer in general terms and can add assumptions.\n"
        "- With context: answer is grounded in the provided document (volumes vs bind mounts, "
        "why declared twice in compose) and reduces hallucinations.\n"
        "- Retrieval step makes the response more consistent with your notes."
    )


if __name__ == "__main__":
    main()
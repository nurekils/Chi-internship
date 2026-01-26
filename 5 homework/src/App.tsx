import { useEffect } from "react";
import { clearBooks, fetchBooks } from "./features/books/booksSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

export default function App() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.books);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const isLoading = status === "loading";

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Books (Redux)</h1>

      {/* ЯВНО показываем статус */}
      <p style={{ marginTop: 0 }}>
        Status: <b>{status}</b>
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => dispatch(fetchBooks())}
          disabled={isLoading}
          style={{
            padding: "8px 12px",
            border: "1px solid #333",
            borderRadius: 8,
            background: isLoading ? "#eee" : "#fff",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Loading..." : "Reload"}
        </button>

        <button
          onClick={() => dispatch(fetchBooks({ fail: true }))}
          disabled={isLoading}
          style={{
            padding: "8px 12px",
            border: "1px solid #333",
            borderRadius: 8,
            background: isLoading ? "#eee" : "#fff",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          Make error
        </button>

        <button
          onClick={() => dispatch(clearBooks())}
          disabled={isLoading}
          style={{
            padding: "8px 12px",
            border: "1px solid #333",
            borderRadius: 8,
            background: isLoading ? "#eee" : "#fff",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {/* Состояния */}
      {status === "loading" && <p>Loading books...</p>}

      {status === "failed" && (
        <p style={{ color: "crimson" }}>Error: {error}</p>
      )}

      {status === "succeeded" && items.length === 0 && <p>No books</p>}

      {status === "succeeded" && items.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {items.map((b) => (
            <li key={b.id} style={{ marginBottom: 6 }}>
              <b>{b.name}</b> — {b.author} ({b.rating}/5)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

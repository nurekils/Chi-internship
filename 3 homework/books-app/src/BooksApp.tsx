import React, { useEffect, useMemo, useState } from "react";

type Book = {
  id: string;
  name: string;
  author: string;
  imgUrl: string;

  genre: string;
  rating: number;
  description: string;
  isRead: boolean;
};

type FilterState = {
  id: string;
  name: string;
  author: string;
};

const PLACEHOLDER_IMG = "https://via.placeholder.com/120x160.png?text=Book";

const initialBooks: Book[] = [
  {
    id: "b1",
    name: "Clean Code",
    author: "Robert C. Martin",
    imgUrl: PLACEHOLDER_IMG,
    genre: "Programming",
    rating: 5,
    description: "Про те, як писати чистий і зрозумілий код.",
    isRead: false,
  },
  {
    id: "b2",
    name: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    imgUrl: PLACEHOLDER_IMG,
    genre: "Programming",
    rating: 5,
    description: "Практичні поради, звички та мислення розробника.",
    isRead: true,
  },
];

function makeId(): string {
  return "b_" + Math.random().toString(16).slice(2, 10);
}

function clampRating(n: number): number {
  if (Number.isNaN(n)) return 1;
  return Math.max(1, Math.min(5, n));
}

export default function BooksApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterState>({
    id: "",
    name: "",
    author: "",
  });

  const [newName, setNewName] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newRating, setNewRating] = useState<number>(3);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    console.log("BooksApp mounted");
  }, []);

  useEffect(() => {
    console.log("books changed", books);
  }, [books]);

  useEffect(() => {
    console.log("filter changed", filter);
  }, [filter]);

  useEffect(() => {
    console.log("selectedBookId changed", selectedBookId);
  }, [selectedBookId]);

  const selectedBook = useMemo(() => {
    if (!selectedBookId) return null;
    return books.find((b) => b.id === selectedBookId) ?? null;
  }, [books, selectedBookId]);

  const filteredBooks = useMemo(() => {
    const idQ = filter.id.trim().toLowerCase();
    const nameQ = filter.name.trim().toLowerCase();
    const authorQ = filter.author.trim().toLowerCase();

    return books.filter((b) => {
      const okId = !idQ || b.id.toLowerCase().includes(idQ);
      const okName = !nameQ || b.name.toLowerCase().includes(nameQ);
      const okAuthor = !authorQ || b.author.toLowerCase().includes(authorQ);
      return okId && okName && okAuthor;
    });
  }, [books, filter]);

  function addBook() {
    const name = newName.trim();
    const author = newAuthor.trim();

    if (!name || !author) {
      alert("Введи ім'я книги та автора");
      return;
    }

    const book: Book = {
      id: makeId(),
      name,
      author,
      imgUrl: PLACEHOLDER_IMG,
      genre: newGenre.trim() || "Unknown",
      rating: clampRating(Number(newRating)),
      description: newDescription.trim() || "Опис відсутній",
      isRead: false,
    };

    setBooks((prev) => [book, ...prev]);

    setNewName("");
    setNewAuthor("");
    setNewGenre("");
    setNewRating(3);
    setNewDescription("");
  }

  function toggleRead(bookId: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, isRead: !b.isRead } : b)),
    );
  }

  if (selectedBook) {
    return (
      <div style={styles.page}>
        <h1 style={styles.h1}>Деталі книги</h1>

        <div style={styles.card}>
          <img
            src={selectedBook.imgUrl}
            alt={selectedBook.name}
            width={120}
            height={160}
            style={styles.img}
          />

          <div style={{ flex: 1 }}>
            <div style={styles.titleRow}>
              <h2 style={styles.h2}>{selectedBook.name}</h2>
              <span style={styles.badge}>{selectedBook.rating}/5</span>
            </div>

            <p style={styles.p}>
              <b>Автор:</b> {selectedBook.author}
            </p>
            <p style={styles.p}>
              <b>Жанр:</b> {selectedBook.genre}
            </p>
            <p style={styles.p}>
              <b>Опис:</b> {selectedBook.description}
            </p>

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={selectedBook.isRead}
                onChange={() => toggleRead(selectedBook.id)}
              />
              <span style={{ marginLeft: 8 }}>прочитано</span>
            </label>

            <button style={styles.btn} onClick={() => setSelectedBookId(null)}>
              Назад до списку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>BooksApp</h1>

      {/* Фильтр */}
      <div style={styles.block}>
        <h3 style={styles.h3}>Фільтрувати</h3>
        <div style={styles.grid3}>
          <input
            style={styles.input}
            placeholder="id"
            value={filter.id}
            onChange={(e) => setFilter((p) => ({ ...p, id: e.target.value }))}
          />
          <input
            style={styles.input}
            placeholder="name"
            value={filter.name}
            onChange={(e) => setFilter((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            style={styles.input}
            placeholder="author"
            value={filter.author}
            onChange={(e) =>
              setFilter((p) => ({ ...p, author: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Добавление */}
      <div style={styles.block}>
        <h3 style={styles.h3}>Додати нову книгу</h3>

        <div style={styles.grid2}>
          <input
            style={styles.input}
            placeholder="Ім'я"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Автор"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Жанр"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            min={1}
            max={5}
            placeholder="Рейтинг (1-5)"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
          />
        </div>

        <textarea
          style={styles.textarea}
          placeholder="Опис"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <button style={styles.btn} onClick={addBook}>
          Додати
        </button>
      </div>

      {/* Список */}
      <div style={styles.block}>
        <h3 style={styles.h3}>Список книг</h3>

        {filteredBooks.length === 0 ? (
          <p style={styles.p}>Нічого не знайдено.</p>
        ) : (
          <div style={styles.list}>
            {filteredBooks.map((b) => (
              <div key={b.id} style={styles.item}>
                <img
                  src={b.imgUrl}
                  alt={b.name}
                  width={80}
                  height={110}
                  style={styles.imgSmall}
                />

                <div style={{ flex: 1 }}>
                  <div style={styles.titleRow}>
                    <div>
                      <div style={styles.bookName}>{b.name}</div>
                      <div style={styles.muted}>{b.author}</div>
                    </div>
                    <span style={styles.badge}>{b.rating}/5</span>
                  </div>

                  <div style={styles.row}>
                    <button
                      style={styles.linkBtn}
                      onClick={() => setSelectedBookId(b.id)}
                    >
                      Деталі
                    </button>

                    <label style={styles.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={b.isRead}
                        onChange={() => toggleRead(b.id)}
                      />
                      <span style={{ marginLeft: 8 }}>прочитано</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 16,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  h1: { margin: "8px 0 16px" },
  h2: { margin: 0 },
  h3: { margin: "0 0 10px" },

  block: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginBottom: 8,
  },

  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    outline: "none",
    resize: "vertical",
    marginBottom: 8,
    boxSizing: "border-box",
  },

  btn: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#fff",
    cursor: "pointer",
  },
  linkBtn: {
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textDecoration: "underline",
  },

  list: { display: "flex", flexDirection: "column", gap: 10 },
  item: {
    display: "flex",
    gap: 12,
    border: "1px solid #eee",
    borderRadius: 10,
    padding: 10,
    alignItems: "flex-start",
  },

  card: {
    display: "flex",
    gap: 16,
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 12,
    alignItems: "flex-start",
  },

  img: { borderRadius: 8, border: "1px solid #eee" },
  imgSmall: { borderRadius: 8, border: "1px solid #eee" },

  titleRow: { display: "flex", justifyContent: "space-between", gap: 10 },
  bookName: { fontWeight: 700, fontSize: 18 },
  muted: { color: "#666", fontSize: 13, marginTop: 2 },
  p: { margin: "6px 0" },

  row: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    marginTop: 10,
  },

  badge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid #ddd",
    fontSize: 12,
    height: "fit-content",
    whiteSpace: "nowrap",
  },

  checkboxRow: { display: "inline-flex", alignItems: "center" },
};

import { useMemo, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import type { Book } from "./types/book";
import { initialBooks } from "./data/books";
import BookRow from "./components/BookRow";

type FilterState = {
  id: string;
  name: string;
  author: string;
};

function makeId(): string {
  return "b_" + Math.random().toString(16).slice(2, 10);
}

function clampRating(n: number): number {
  if (Number.isNaN(n)) return 1;
  return Math.max(1, Math.min(5, n));
}

export default function BooksApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const [filter, setFilter] = useState<FilterState>({
    id: "",
    name: "",
    author: "",
  });

  const [newName, setNewName] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState<number>(3);

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
      imgUrl: "",
      genre: "Unknown",
      rating: clampRating(Number(newRating)),
      description: "",
      isRead: false,
    };

    setBooks((prev) => [book, ...prev]);

    setNewName("");
    setNewAuthor("");
    setNewRating(3);
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>
        BooksApp
      </Typography>

      {/* Фільтр */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Фільтрувати
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={12} sm={4}>
            <TextField
              fullWidth
              label="id"
              value={filter.id}
              onChange={(e) => setFilter((p) => ({ ...p, id: e.target.value }))}
            />
          </Grid>

          <Grid xs={12} sm={4}>
            <TextField
              fullWidth
              label="name"
              value={filter.name}
              onChange={(e) =>
                setFilter((p) => ({ ...p, name: e.target.value }))
              }
            />
          </Grid>

          <Grid xs={12} sm={4}>
            <TextField
              fullWidth
              label="author"
              value={filter.author}
              onChange={(e) =>
                setFilter((p) => ({ ...p, author: e.target.value }))
              }
            />
          </Grid>
        </Grid>
      </Box>

      {/* Додавання */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Додати нову книгу
        </Typography>

        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid xs={12} sm={5}>
            <TextField
              fullWidth
              label="Ім'я"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Grid>

          <Grid xs={12} sm={5}>
            <TextField
              fullWidth
              label="Автор"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
          </Grid>

          <Grid xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              label="Рейтинг"
              inputProps={{ min: 1, max: 5 }}
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            />
          </Grid>
        </Grid>

        <Button variant="contained" onClick={addBook}>
          Додати
        </Button>
      </Box>

      {/* Список книг */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Список книг
      </Typography>

      <Grid container spacing={1.5}>
        {filteredBooks.length === 0 ? (
          <Grid xs={12}>
            <Typography color="text.secondary">Нічого не знайдено.</Typography>
          </Grid>
        ) : (
          filteredBooks.map((b) => (
            <Grid key={b.id} xs={12}>
              <BookRow book={b} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

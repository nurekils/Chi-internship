import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book } from "../../types/book";

type BooksState = {
  items: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: BooksState = {
  items: [],
  status: "idle",
  error: null,
};

// thunk: загрузка книг
export const fetchBooks = createAsyncThunk<
  Book[],
  { fail?: boolean } | undefined
>("books/fetchBooks", async (arg) => {
  // если arg.fail=true — специально ломаем запрос, чтобы увидеть error state
  const url = arg?.fail
    ? "https://jsonplaceholder.typicode.com/this-route-does-not-exist"
    : "https://jsonplaceholder.typicode.com/users";

  // маленькая задержка, чтобы loading точно было видно
  await new Promise((r) => setTimeout(r, 500));

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const users: Array<{ id: number; name: string; username: string }> =
    await res.json();

  return users.slice(0, 8).map((u) => ({
    id: String(u.id),
    name: u.name,
    author: u.username,
    rating: (u.id % 5) + 1,
  }));
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export default booksSlice.reducer;

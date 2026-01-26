import type { Book } from "../types/book";

const PLACEHOLDER_IMG = "https://via.placeholder.com/120x160.png?text=Book";

export const initialBooks: Book[] = [
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

import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Book } from "../types/book";

type Props = {
  book: Book;
};

export default function BookRow({ book }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={1} alignItems="center">
        {/* Назва */}
        <Grid item xs={12} sm={5} md={6}>
          <Typography fontWeight={700}>{book.name}</Typography>
        </Grid>

        {/* Автор */}
        <Grid item xs={12} sm={5} md={4}>
          <Typography color="text.secondary">{book.author}</Typography>
        </Grid>

        {/* Рейтинг */}
        <Grid item xs={12} sm={2} md={2}>
          <Typography sx={{ textAlign: { xs: "left", sm: "right" } }}>
            {book.rating}/5
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

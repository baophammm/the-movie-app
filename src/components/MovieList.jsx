import { Grid } from '@mui/material';
import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, type }) {
  return (
    <Grid container spacing={2} mt={1} sx={{ width: 1 }}>
      {movies.map((movie, index) => (
        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
          <MovieCard movie={movie} type={type} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;

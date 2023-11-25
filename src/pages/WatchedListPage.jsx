import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import MovieList from '../components/MovieList';

function WatchedListPage() {
  const { watched } = useContext(GlobalContext);

  return (
    <Container
      sx={{
        py: 2,
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      <Box component={Stack} sx={{ height: 1, width: 1, mx: { sm: 0, md: 5 } }}>
        <Typography variant="h4" fontWeight="bold">
          Watched
        </Typography>
        {watched.length > 0 ? (
          <Box
            component={Stack}
            spacing={2}
            sx={{
              position: 'relative',
              height: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <MovieList movies={watched} type="watched" />
          </Box>
        ) : (
          <Typography variant="h3" sx={{ color: 'lightgray' }}>
            No movies in your list, add some
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default WatchedListPage;

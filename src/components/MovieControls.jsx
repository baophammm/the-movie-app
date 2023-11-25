import React, { useContext } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { GlobalContext } from '../contexts/GlobalContext';

function MovieControls({ movie, type }) {
  const {
    watchlist,
    watched,
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveMovieToWatchlist,
    removeMovieFromWatched,
    addMovieToWatchlist,
  } = useContext(GlobalContext);

  let storedMovieWatchlist = watchlist.find(o => o.id === movie.id);
  let storedMovieWatched = watched.find(o => o.id === movie.id);
  const isMovieInWatched = storedMovieWatched ? true : false;

  const toggleMovieToAndFromWatchlist = movie => {
    if (storedMovieWatchlist) {
      removeMovieFromWatchlist(movie.id);
    } else {
      addMovieToWatchlist(movie);
    }
  };

  const toggleMovieToAndFromWatched = movie => {
    if (storedMovieWatched) {
      removeMovieFromWatched(movie.id);
    } else {
      addMovieToWatched(movie);
    }
  };
  return (
    <Box sx={{ zIndex: '1', width: 1 }}>
      {type === 'watchlist' && (
        <Stack direction="row" justifyContent="space-around" sx={{ width: 1 }}>
          <Button onClick={() => addMovieToWatched(movie)} sx={{ width: 0.5 }}>
            <VisibilityIcon />
          </Button>
          <Button
            onClick={() => removeMovieFromWatchlist(movie.id)}
            sx={{ width: 0.5 }}
          >
            <ClearIcon />
          </Button>
        </Stack>
      )}

      {type === 'watched' && (
        <Stack direction="row" justifyContent="space-around" sx={{ width: 1 }}>
          <Button
            onClick={() => moveMovieToWatchlist(movie)}
            sx={{ width: 0.5 }}
          >
            <VisibilityOffIcon />
          </Button>
          <Button
            onClick={() => removeMovieFromWatched(movie.id)}
            sx={{ width: 0.5 }}
          >
            <ClearIcon />
          </Button>
        </Stack>
      )}

      {type === 'homelist' && (
        <Stack direction="row" justifyContent="space-around" sx={{ width: 1 }}>
          <Button
            disabled={isMovieInWatched}
            onClick={() => toggleMovieToAndFromWatchlist(movie)}
            sx={{ width: 0.5, opacity: storedMovieWatchlist ? '0.5' : '1' }}
          >
            <FavoriteRoundedIcon />
          </Button>
          <Button
            onClick={() => toggleMovieToAndFromWatched(movie)}
            sx={{ width: 0.5, opacity: storedMovieWatched ? '0.5' : '1' }}
          >
            <VisibilityIcon />
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default MovieControls;

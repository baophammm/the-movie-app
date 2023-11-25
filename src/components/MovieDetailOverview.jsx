import { Box, Button, CardMedia, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import CircularWithValueLabel from './CircularWithValueLabel';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GlobalContext } from '../contexts/GlobalContext';

function MovieDetailOverview({ movie, movieCredit }) {
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    removeMovieFromWatchlist,
    removeMovieFromWatched,
    watchlist,
    watched,
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
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: {
          sm: 'auto',
          md: '500px',
        },

        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.6)',
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          flexDirection: {
            sm: 'column',
            md: 'row',
          },
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            minWidth: '250px',
            maxWidth: {
              sm: '50%',
              md: '25%',
            },
            margin: 0,
            p: '20px',
          }}
        >
          <CardMedia
            component="img"
            height={'100%'}
            width={'100%'}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.original_title}
            sx={{
              borderRadius: '8px',
            }}
          />
        </Box>

        <Box
          sx={{
            color: '#fff',
            marginLeft: '20px',
            p: '10px',
            height: '100%',
            width: 1,
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: 1 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: '40px',
                  sm: '48px',
                },
              }}
            >
              {movie.original_title}
              {` `}
              <Typography variant="span">
                {`(${movie.release_date?.slice(0, 4)})`}
              </Typography>
            </Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ width: 1 }}
          >
            <Typography variant="body1" sx={{ minWidth: '90px' }}>
              {movie.release_date}
            </Typography>
            <Typography variant="body1">•</Typography>
            <Typography variant="body1">
              {movie.genres?.map(genre => genre.name).toString()}
            </Typography>
            <Typography variant="body1">•</Typography>
            <Typography
              variant="body1"
              sx={{ minWidth: '50px' }}
            >{`${Math.floor(movie.runtime / 60)}h ${
              movie.runtime % 60
            }m`}</Typography>
          </Stack>
          <Stack
            spacing={4}
            direction="row"
            alignItems="center"
            sx={{ my: 2, height: '60px' }}
          >
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{ height: 1 }}
            >
              <CircularWithValueLabel
                progress={Math.round(movie?.vote_average * 10)}
              />
              <Typography
                variant="body1"
                sx={{ lineHeight: '24px', fontWeight: 'bold', width: '40px' }}
              >
                User Score
              </Typography>
            </Stack>

            <Button
              variant="contained"
              color="primary"
              disabled={isMovieInWatched}
              onClick={() => toggleMovieToAndFromWatchlist(movie)}
              sx={{
                height: 1,
                borderRadius: '50%',
                opacity: storedMovieWatchlist ? '0.5' : '1',
              }}
            >
              <FavoriteRoundedIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toggleMovieToAndFromWatched(movie)}
              sx={{
                height: 1,
                borderRadius: '50%',
                opacity: storedMovieWatched ? '0.5' : '1',
              }}
            >
              <VisibilityIcon />
            </Button>
          </Stack>

          <Stack>
            <Typography variant="body2">{movie.tagline}</Typography>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h5">Overview</Typography>
              <Typography variant="body1">{movie.overview}</Typography>
            </Box>
            <Stack spacing={1} direction="row" sx={{ mt: 5 }}>
              {movieCredit.crew
                ?.filter(member => member.job === 'Director')
                .slice(0, 3)
                .map(member => {
                  const directorName = member.name;
                  const directorJobs = movieCredit.crew
                    .filter(member => member.name === directorName)
                    .map(member => member.job);
                  return (
                    <Box key={member.id}>
                      <Typography variant="body1">{directorName}</Typography>
                      <Typography variant="body2">
                        {directorJobs.toString()}
                      </Typography>
                    </Box>
                  );
                })}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default MovieDetailOverview;

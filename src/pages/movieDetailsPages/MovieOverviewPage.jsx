import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../app/config';
import apiService from '../../app/apiService';
import { Alert, Box, Container, Grid, Stack } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import MovieDetailOverview from '../../components/MovieDetailOverview';
import MovieDetailMain from '../../components/MovieDetailMain';
import MovieDetailSide from '../../components/MovieDetailSide';

function MovieOverviewPage() {
  const params = useParams();
  const movieId = params.id;

  const [movie, setMovie] = useState({});
  const [movieCredit, setMovieCredit] = useState({});
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingMovieCredit, setLoadingMovieCredit] = useState(true);
  const [errorMovie, setErrorMovie] = useState('');
  const [errorMovieCredit, setErrorMovieCredit] = useState('');
  useEffect(() => {
    if (movieId) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const getMovie = async () => {
        setLoadingMovie(true);

        try {
          const response = await apiService.get(`3/movie/${movieId}`, options);
          const data = await response.data;

          setMovie(data);
          setErrorMovie('');
        } catch (error) {
          console.log(error);
          setErrorMovie(error.message);
        }
        setLoadingMovie(false);
      };
      getMovie();
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const getMovieCredit = async () => {
        setLoadingMovieCredit(true);
        try {
          const response = await apiService.get(
            `3/movie/${movieId}/credits`,
            options
          );
          const data = await response.data;

          setMovieCredit(data);
          setErrorMovieCredit('');
        } catch (error) {
          console.log(error);
          setErrorMovieCredit(error.message);
        }
        setLoadingMovieCredit(false);
      };
      getMovieCredit();
    }
  }, [movieId]);

  if (loadingMovie || loadingMovieCredit) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        {errorMovie ? (
          <Alert severity="error">{errorMovie}</Alert>
        ) : (
          <>
            {errorMovieCredit ? (
              <Alert severity="error">{errorMovieCredit}</Alert>
            ) : (
              <Container
                sx={{
                  width: '100vw',
                  minHeight: '100vh',
                  my: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <MovieDetailOverview movie={movie} movieCredit={movieCredit} />
                <Box
                  component={Stack}
                  sx={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '1200px',
                    mt: 3,
                    display: 'flex',
                    flexDirection: {
                      sm: 'column',
                      md: 'row',
                    },
                    justifyContent: 'space-between',
                  }}
                >
                  <MovieDetailMain
                    movieId={movieId}
                    movieCredit={movieCredit}
                  />

                  <MovieDetailSide
                    movieId={movieId}
                    movie={movie}
                    movieCredit={movieCredit}
                  />
                </Box>
              </Container>
            )}
          </>
        )}
      </>
    );
  }
}

export default MovieOverviewPage;

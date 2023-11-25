import { Alert, Box, Button, Stack, Typography, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { BACK_UP_FILTER_MOVIE_LANGUAGES_OPTIONS } from '../app/backupData';
import { API_KEY } from '../app/config';
import apiService from '../app/apiService';
import LoadingScreen from './LoadingScreen';

const StyledItemBox = styled(Box)(({ theme }) => ({
  width: '100%',
}));

function MovieDetailSide({ movieId, movie, movieCredit }) {
  const [movieKeywords, setMovieKeywords] = useState([]);
  const [loadingMovieKeywords, setLoadingMovieKeywords] = useState(true);
  const [errorMovieKeywords, setErrorMovieKeywords] = useState('');

  useEffect(() => {
    if (movieId) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const getMovieKeywords = async () => {
        setLoadingMovieKeywords(true);

        try {
          const response = await apiService.get(
            `3/movie/${movieId}/keywords`,
            options
          );
          const data = await response.data.keywords;

          setMovieKeywords(data);

          setErrorMovieKeywords('');
        } catch (error) {
          console.log(error);
          setErrorMovieKeywords(error.message);
        }
        setLoadingMovieKeywords(false);
      };
      getMovieKeywords();
    }
  }, [movieId]);

  return (
    <Box
      sx={{
        height: 1,
        width: {
          sm: 1,
          md: 0.19,
        },
      }}
    >
      <Stack spacing={2} sx={{ height: '100%', width: '100%' }}>
        <StyledItemBox>
          <Typography variant="body2" fontWeight="bold">
            Status
          </Typography>
          <Typography variant="body2">{movie.status}</Typography>
        </StyledItemBox>
        <StyledItemBox>
          <Typography variant="body2" fontWeight="bold">
            Original Language
          </Typography>
          <Typography variant="body2">
            {
              BACK_UP_FILTER_MOVIE_LANGUAGES_OPTIONS.find(
                language => language.iso_639_1 === movie.original_language
              ).english_name
            }
          </Typography>
        </StyledItemBox>
        <StyledItemBox>
          <Typography variant="body2" fontWeight="bold">
            Budget
          </Typography>
          <Typography variant="body2">
            {`$${movie.budget.toLocaleString('en-US')}`}
          </Typography>
        </StyledItemBox>
        <StyledItemBox>
          <Typography variant="body2" fontWeight="bold">
            Revenue
          </Typography>
          <Typography variant="body2">
            {`$${movie.revenue.toLocaleString('en-US')}`}
          </Typography>
        </StyledItemBox>
        <StyledItemBox>
          <Typography variant="body2" fontWeight="bold">
            Keywords
          </Typography>
          {loadingMovieKeywords ? (
            <LoadingScreen />
          ) : (
            <>
              {errorMovieKeywords ? (
                <Alert severity="error">{errorMovieKeywords}</Alert>
              ) : (
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  sx={{
                    width: '100%',
                  }}
                >
                  {movieKeywords.length > 0 &&
                    movieKeywords.map(keywordItem => (
                      <Box
                        key={keywordItem.id}
                        sx={{
                          border: '#636e72',
                          backgroundColor: '#dfe6e9',
                          borderRadius: '4px',
                          padding: 1,
                          marginTop: 1,
                          marginRight: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ lineHeight: '14px', color: 'black' }}
                        >
                          {keywordItem.name}
                        </Typography>
                      </Box>
                    ))}
                </Stack>
              )}
            </>
          )}
        </StyledItemBox>
      </Stack>
    </Box>
  );
}

export default MovieDetailSide;

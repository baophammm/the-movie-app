import { Alert, Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

import { API_KEY } from '../app/config';
import apiService from '../app/apiService';
import { useForm } from 'react-hook-form';
import MovieFilter from '../components/MovieFilter';
import { FormProvider } from '../components/form';
import MovieSearchForm from '../components/MovieSearchForm';
import MovieSort from '../components/MovieSort';
import LoadingScreen from '../components/LoadingScreen';
import BasicPagination from '../components/BasicPagination';

export const FormContext = createContext();

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [totalPages, setTotalPages] = useState(1);
  const [allFilterBoxesUnchecked, setAllFilterBoxesUnchecked] = useState(false);

  const defaultValues = {
    genre: [],
    language: 'en',
    sortBy: 'popularity.desc',
    searchQuery: '',
  };

  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm({
    defaultValues,
  });

  const { reset } = methods;

  const handleFilterSelection = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const toggleAllFilterCheckboxes = () => {
    setAllFilterBoxesUnchecked(
      prevAllFilterBoxesUnchecked => !prevAllFilterBoxesUnchecked
    );
  };
  const clearFilterOptions = () => {
    setFilters(defaultValues);
    setPage(1);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const getMovies = async () => {
      setLoading(true);

      try {
        let response;
        if (filters.searchQuery.length !== 0) {
          response = await apiService.get(
            `3/search/movie?include_adult=false&query=${filters.searchQuery.replaceAll(
              ' ',
              '%20'
            )}&page=${page}`,
            options
          );
        } else {
          response = await apiService.get(
            `/3/discover/movie?include_adult=false&with_original_language=${
              filters.language
            }&sort_by=${filters.sortBy}&with_genres=${filters.genre.join(
              '%2C'
            )}&page=${page}`,
            options
          );
        }

        const data = await response.data.results;
        setMovies(data);
        setTotalPages(await response.data.total_pages);
        setError('');
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [page, filters]);

  return (
    <FormContext.Provider
      value={{
        filters,
        setFilters,
        handleFilterSelection,
        allFilterBoxesUnchecked,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          minHeight: '100%',
          width: '100vw',
          mt: 3,
        }}
      >
        <Grid item xs={4} sm={3}>
          <Stack sx={{}}>
            <Button onClick={clearFilterOptions}>
              <Typography
                fontWeight="bold"
                sx={{ fontSize: { xs: '12px', sm: '16px' } }}
              >
                Clear Filters
              </Typography>
            </Button>
            <FormProvider methods={methods}>
              <MovieFilter resetFilter={reset} />
            </FormProvider>
          </Stack>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Stack sx={{ flexGrow: 1 }}>
            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              justifyContent="space-between"
              mb={2}
            >
              <Box
                sx={{
                  width: { xs: 1, sm: 400 },
                  maxWidth: { xs: 1, sm: 0.4 },
                }}
              >
                <MovieSearchForm />
              </Box>

              <Box
                sx={{
                  width: { xs: 1, sm: 400 },
                  maxWidth: { xs: 1, sm: 0.4 },
                }}
              >
                <FormProvider methods={methods}>
                  <MovieSort />
                </FormProvider>
              </Box>
            </Stack>
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
              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {error ? (
                    <Alert severity="error">{error}</Alert>
                  ) : (
                    <MovieList movies={movies} type="homelist" />
                  )}
                </>
              )}
              <BasicPagination
                page={page}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </FormContext.Provider>
  );
}

export default HomePage;

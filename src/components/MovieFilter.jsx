import { Alert, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { API_KEY } from '../app/config';
import apiService from '../app/apiService';
import { FMultiCheckbox, FRadioGroup, FSelect } from './form';
import { FormContext } from '../pages/HomePage';
import LoadingScreen from './LoadingScreen';
import {
  BACK_UP_FILTER_MOVIE_LANGUAGES_OPTIONS,
  BACK_UP_FILTER_MOVIE_GENRES_OPTIONS,
} from '../app/backupData';

function MovieFilter({ resetFilter }) {
  const { filters, setFilters, handleFilterSelection } =
    useContext(FormContext);
  const [loadingGenre, setLoadingGenre] = useState(true);
  const [loadingLanguage, setLoadingLanguage] = useState(true);
  const [errorGenre, setErrorGenre] = useState('');
  const [errorLanguage, setErrorLanguage] = useState('');
  const [filterMovieGenreOptions, setFilterMovieGenreOptions] = useState([]);
  const [filterLanguageOptions, setFilterLanguageOptions] = useState([]);

  const checkKeyPresenceInArray = (arraOfObj, keyToCheck) => {
    let checkKeyPresenceInArray = key =>
      arraOfObj.some(obj => Object.keys(obj).includes(key));
    const isKeyPresent = checkKeyPresenceInArray(keyToCheck);
    return isKeyPresent;
  };

  const checkIfArrayContainsNulls = array => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === null) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const getMovieGenreList = async () => {
      setLoadingGenre(true);
      try {
        const response = await apiService.get(
          '/3/genre/movie/list?language=en',
          options
        );
        const data = await response.data.genres;
        if (checkIfArrayContainsNulls(data)) {
          setFilterMovieGenreOptions(BACK_UP_FILTER_MOVIE_GENRES_OPTIONS);
        } else {
          setFilterMovieGenreOptions(data);
        }

        setErrorGenre('');
      } catch (error) {
        console.log(error);
        setErrorGenre(error.message);
      }
      setLoadingGenre(false);
    };
    getMovieGenreList();
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const getLanguageList = async () => {
      setLoadingLanguage(true);
      try {
        const response = await apiService.get(
          '/3/configuration/languages',
          options
        );
        const data = await response.data.sort((a, b) =>
          a.english_name.localeCompare(b.english_name)
        );
        if (checkIfArrayContainsNulls(data)) {
          setFilterLanguageOptions(
            BACK_UP_FILTER_MOVIE_LANGUAGES_OPTIONS.sort((a, b) =>
              a.english_name.localeCompare(b.english_name)
            )
          );
        } else {
          setFilterLanguageOptions(data);
        }

        setErrorLanguage('');
      } catch (error) {
        console.log(error);
        setErrorLanguage(error.message);
      }
      setLoadingLanguage(false);
    };
    getLanguageList();
  }, []);

  return (
    <Stack spacing={3} sx={{ width: 1 }}>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '11px', sm: '14px', md: '20px' },
            paddingLeft: { sm: 0, md: 2 },
          }}
        >
          Genres
        </Typography>
        {loadingGenre ? (
          <LoadingScreen />
        ) : (
          <>
            {errorGenre ? (
              <Alert severity="error">{errorGenre}</Alert>
            ) : (
              <FMultiCheckbox
                name="genre"
                options={filterMovieGenreOptions.map(item => item.id)}
                getOptionLabel={filterMovieGenreOptions.map(item => item.name)}
              />
            )}
          </>
        )}
      </Stack>
      <Stack spacing={1}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '11px', sm: '14px', md: '20px' },
            paddingLeft: { sm: 0, md: 2 },
          }}
        >
          Language
        </Typography>
        {loadingLanguage ? (
          <LoadingScreen />
        ) : (
          <>
            {errorLanguage ? (
              <Alert severity="error">{errorLanguage}</Alert>
            ) : (
              <FSelect
                name="language"
                label="Language"
                sx={{
                  width: 1,
                }}
                value={filters.language}
                onChange={e =>
                  handleFilterSelection('language', e.target.value)
                }
              >
                {filterLanguageOptions.map(option => (
                  <option key={option.iso_639_1} value={option.iso_639_1}>
                    {option.english_name}
                  </option>
                ))}
              </FSelect>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default MovieFilter;

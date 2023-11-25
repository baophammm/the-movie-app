import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY } from '../../app/config';
import apiService from '../../app/apiService';
import {
  Box,
  Card,
  CardMedia,
  Container,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function MovieCastPage() {
  const params = useParams();
  const movieId = params.id;
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [movieCredit, setMovieCredit] = useState({});
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingMovieCredit, setLoadingMovieCredit] = useState(true);
  const [errorMovie, setErrorMovie] = useState('');
  const [errorMovieCredit, setErrorMovieCredit] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
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
          setDepartmentList(
            [
              ...new Set(
                data.crew?.map(crewMember => crewMember.known_for_department)
              ),
            ].sort()
          );
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

  const handleBackToMain = () => {
    navigate(`/movie/${movieId}`);
  };

  const StyledBoxMovieMain = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100vw',
    height: '120px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.8)',
  }));

  const StyledBoxCredit = styled(Box)(({ theme }) => ({
    height: 'auto',
    width: '100%',
    maxWidth: '1200px',

    display: 'flex',
    flexDirection: 'row',
  }));
  return (
    <Container
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
        my: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {loadingMovie ? (
        <LoadingScreen />
      ) : (
        <StyledBoxMovieMain>
          <Stack
            spacing={3}
            direction="row"
            alignItems="center"
            sx={{
              width: '100%',
              maxWidth: '1200px',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '100%',
                maxWidth: '7%',
                p: '10px',
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Typography
                variant="h5"
                onClick={handleBackToMain}
                sx={{ '&:hover': { cursor: 'pointer', color: 'gray' } }}
              >
                {movie.original_title}
                {` `}
                <Typography variant="span">
                  {`(${movie.release_date?.slice(0, 4)})`}
                </Typography>
              </Typography>
              <Box
                onClick={handleBackToMain}
                sx={{ '&:hover': { cursor: 'pointer', color: 'gray' } }}
              >
                <Stack spacing={1} direction="row" alignItems="center">
                  <KeyboardBackspaceIcon fontSize="small" />
                  <Typography variant="body2">Back to main</Typography>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </StyledBoxMovieMain>
      )}
      {loadingMovieCredit ? (
        <LoadingScreen />
      ) : (
        <StyledBoxCredit>
          <Box sx={{ width: '50%' }}>
            <Stack spacing={1} direction="row">
              <Typography variant="h6">Cast</Typography>
              <Typography variant="h6" color={'gray'}>
                {movieCredit.cast?.length}
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {movieCredit.cast?.map(castMember => (
                <Stack
                  key={castMember.cast_id}
                  direction="row"
                  alignItems="center"
                  sx={{ height: '60px', width: '100%' }}
                >
                  <Box sx={{ height: '100%', width: '50px' }}>
                    <CardMedia
                      component="img"
                      height={'100%'}
                      width={'100%'}
                      src={
                        castMember.profile_path
                          ? `https://image.tmdb.org/t/p/original${castMember.profile_path}`
                          : 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
                      }
                      alt={castMember.original_name}
                      sx={{
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                  <Box sx={{ ml: 3, flexGrow: '1' }}>
                    <Typography variant="body2" fontWeight="bold">
                      {castMember.original_name}
                    </Typography>
                    <Typography variant="body2">
                      {castMember.character}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Stack spacing={1} direction="row">
              <Typography variant="h6">Crew</Typography>
              <Typography variant="h6" color={'gray'}>
                {
                  movieCredit.crew?.reduce(
                    (resultSet, item) => resultSet.add(item['id']),
                    new Set()
                  ).size
                }
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {departmentList?.map((department, index) => (
                <Box key={index} sx={{ width: '100%' }}>
                  <Typography variant="body2">{department}</Typography>
                  <Stack spacing={2}>
                    {movieCredit.crew
                      ?.filter(
                        crewMember =>
                          crewMember.known_for_department === department
                      )
                      .map(crewMember => (
                        <Stack
                          key={crewMember.credit_id}
                          direction="row"
                          alignItems="center"
                          sx={{ height: '60px', width: '100%' }}
                        >
                          <Box sx={{ height: '100%', width: '50px' }}>
                            <CardMedia
                              component="img"
                              height={'100%'}
                              width={'100%'}
                              src={
                                crewMember.profile_path
                                  ? `https://image.tmdb.org/t/p/original${crewMember.profile_path}`
                                  : 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
                              }
                              alt={crewMember.original_name}
                              sx={{
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                          <Box sx={{ ml: 3, flexGrow: '1' }}>
                            <Typography variant="body2" fontWeight="bold">
                              {crewMember.original_name}
                            </Typography>
                            <Typography variant="body2">
                              {crewMember.job}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </StyledBoxCredit>
      )}
    </Container>
  );
}

export default MovieCastPage;

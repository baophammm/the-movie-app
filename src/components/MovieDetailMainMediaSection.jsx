import { Box, Stack, Typography, styled, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { API_KEY } from '../app/config';
import apiService from '../app/apiService';
import MovieDetailImageList from './MovieDetailImageList';
import MovieDetailVideoList from './MovieDetailVideoList';

const StyledBoxNav = styled(Box)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
  },
}));

const StyledTypographyInNavBox = styled(Typography)(({ theme }) => ({
  height: '100%',

  display: 'flex',
  alignItems: 'center',
}));

function MovieDetailMainMediaSection({ movieId }) {
  const [movieImagesBackdrops, setMovieImagesBackdrops] = useState([]);
  const [movieImagesPosters, setMovieImagesPosters] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);

  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [errorMovieImages, setErrorMovieImages] = useState('');
  const [errorMovieVideos, setErrorMovieVideos] = useState('');

  const [mediaSelection, setMediaSelection] = useState('backdrops');
  const [mediaDisplay, setMediaDisplay] = useState(
    <MovieDetailImageList
      imageList={movieImagesBackdrops.slice(0, 10)}
      imageWidth={'600px'}
    />
  );

  useEffect(() => {
    if (movieId) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const getMovieImages = async () => {
        setLoadingImages(true);

        try {
          const response = await apiService.get(
            `3/movie/${movieId}/images?include_image_language=en`,
            options
          );
          const data = await response.data;

          setMovieImagesBackdrops(data.backdrops);
          setMovieImagesPosters(data.posters);
          setErrorMovieImages('');
        } catch (error) {
          console.log(error);
          setErrorMovieImages(error.message);
        }
        setLoadingImages(false);
      };

      const getMovieVideos = async () => {
        setLoadingVideos(true);

        try {
          const response = await apiService.get(
            `3/movie/${movieId}/videos`,
            options
          );
          const data = await response.data.results;

          setMovieVideos(data);
          setErrorMovieVideos('');
        } catch (error) {
          console.log(error);
          setErrorMovieVideos(error.message);
        }
        setLoadingVideos(false);
      };
      getMovieImages();
      getMovieVideos();
    }
  }, [movieId]);

  useEffect(() => {
    if (mediaSelection === 'backdrops') {
      setMediaDisplay(
        <MovieDetailImageList
          imageList={
            movieImagesBackdrops.length > 10
              ? movieImagesBackdrops.slice(0, 10)
              : movieImagesBackdrops
          }
          imageWidth={'600px'}
        />
      );
    } else if (mediaSelection === 'posters') {
      setMediaDisplay(
        <MovieDetailImageList
          imageList={
            movieImagesPosters.length > 20
              ? movieImagesPosters.slice(0, 20)
              : movieImagesPosters
          }
          imageWidth={'200px'}
        />
      );
    } else if (mediaSelection === 'videos') {
      setMediaDisplay(
        <MovieDetailVideoList
          videoList={movieVideos.slice(0, 10)}
          videoWidth={'480px'}
        />
      );
    }
  }, [mediaSelection, movieImagesBackdrops, movieImagesPosters, movieVideos]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Stack
        spacing={5}
        direction="row"
        justifyContent="space-between"
        alignItems="bottom"
      >
        <Box>
          <Typography variant="h5">Media</Typography>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          alignItems="bottom"
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          <StyledBoxNav
            onClick={e => {
              setMediaSelection('videos');
            }}
          >
            <StyledTypographyInNavBox
              variant="body1"
              sx={{
                textDecoration:
                  mediaSelection === 'videos' ? 'underline' : 'none',
              }}
            >
              Videos
            </StyledTypographyInNavBox>
          </StyledBoxNav>
          <StyledBoxNav
            onClick={() => {
              setMediaSelection('backdrops');
            }}
          >
            <StyledTypographyInNavBox
              variant="body1"
              sx={{
                textDecoration:
                  mediaSelection === 'backdrops' ? 'underline' : 'none',
              }}
            >
              Backdrops
            </StyledTypographyInNavBox>
          </StyledBoxNav>
          <StyledBoxNav
            onClick={() => {
              setMediaSelection('posters');
            }}
          >
            <StyledTypographyInNavBox
              variant="body1"
              sx={{
                textDecoration:
                  mediaSelection === 'posters' ? 'underline' : 'none',
              }}
            >
              Posters
            </StyledTypographyInNavBox>
          </StyledBoxNav>
        </Stack>
        <Box
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
          }}
        >
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>
              <StyledBoxNav
                onClick={e => {
                  setMediaSelection('videos');
                }}
              >
                <StyledTypographyInNavBox
                  variant="body1"
                  sx={{
                    color: '#fff',
                    textDecoration:
                      mediaSelection === 'videos' ? 'underline' : 'none',
                  }}
                >
                  Videos
                </StyledTypographyInNavBox>
              </StyledBoxNav>
            </MenuItem>

            <MenuItem>
              <StyledBoxNav
                onClick={() => {
                  setMediaSelection('backdrops');
                }}
              >
                <StyledTypographyInNavBox
                  variant="body1"
                  sx={{
                    color: '#fff',
                    textDecoration:
                      mediaSelection === 'backdrops' ? 'underline' : 'none',
                  }}
                >
                  Backdrops
                </StyledTypographyInNavBox>
              </StyledBoxNav>
            </MenuItem>

            <MenuItem>
              <StyledBoxNav
                onClick={() => {
                  setMediaSelection('posters');
                }}
              >
                <StyledTypographyInNavBox
                  variant="body1"
                  sx={{
                    color: '#fff',
                    textDecoration:
                      mediaSelection === 'posters' ? 'underline' : 'none',
                  }}
                >
                  Posters
                </StyledTypographyInNavBox>
              </StyledBoxNav>
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
      <Box>{mediaDisplay}</Box>
    </Box>
  );
}

export default MovieDetailMainMediaSection;

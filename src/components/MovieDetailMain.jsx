import { Box, Stack, Typography, Divider, styled } from '@mui/material';
import React from 'react';
import SingleLineCardList from './SingleLineCardList';
import { useNavigate } from 'react-router-dom';
import MovieDetailMainMediaSection from './MovieDetailMainMediaSection';

const StyledBoxChildElement = styled(Box)(({ theme }) => ({
  width: '100%',
}));

function MovieDetailMain({ movieId, movieCredit, ...sx }) {
  const navigate = useNavigate();

  const navigateToFullCastCrew = () => navigate(`/movie/${movieId}/cast`);

  return (
    <Box
      sx={{
        height: 1,
        width: {
          sm: 1,
          md: 0.8,
        },
      }}
    >
      <Stack spacing={2} sx={{ width: 1, height: 1 }}>
        <Typography variant="h5">Top Billed Cast</Typography>
        <SingleLineCardList
          movieId={movieId}
          castMembers={movieCredit?.cast?.slice(0, 10)}
        />
        <StyledBoxChildElement
          sx={{
            paddingLeft: 2,
            '&:hover': { cursor: 'pointer', color: '#636e72' },
          }}
        >
          <Typography onClick={navigateToFullCastCrew}>
            Full Cast & Crew
          </Typography>
        </StyledBoxChildElement>
        <StyledBoxChildElement sx={{ alignSelf: 'center', width: '95%' }}>
          <Divider variant="fullWidth" />
        </StyledBoxChildElement>
        <MovieDetailMainMediaSection movieId={movieId} />
      </Stack>
    </Box>
  );
}

export default MovieDetailMain;

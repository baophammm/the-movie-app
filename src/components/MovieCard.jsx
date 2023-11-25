import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieControls from './MovieControls';

const StyledCardCover = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  width: '100%',
}));

function MovieCard({ movie, type }) {
  const navigate = useNavigate();
  return (
    <StyledCardCover>
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="200"
          src={
            movie.poster_path
              ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://t3.ftcdn.net/jpg/03/45/05/92/240_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
          }
          alt={movie.original_title}
        />
        <CardContent>
          <Typography variant="body1" component="div" noWrap>
            {movie.original_title}
          </Typography>
          <Typography variant="body2">
            Release Date: {movie.release_date}
          </Typography>
          <Typography variant="body2">
            Rating: {Math.round(movie.vote_average * 10) / 10}
          </Typography>
        </CardContent>
      </CardActionArea>
      <MovieControls type={type} movie={movie} />
    </StyledCardCover>
  );
}

export default MovieCard;

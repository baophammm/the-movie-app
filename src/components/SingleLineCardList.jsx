import React, { useEffect } from 'react';

import {
  Box,
  Button,
  CardMedia,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from 'react-router-dom';

const RootBox = styled(Box)(({ theme }) => ({
  height: '240px',
  maxWidth: '100%',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
}));

export default function SingleLineCardList({ movieId, castMembers }) {
  const navigate = useNavigate();
  const navigateToFullCastCrew = () => navigate(`/movie/${movieId}/cast`);

  return (
    <RootBox>
      <ImageList
        sx={{
          height: '100%',
          paddingBottom: '0',
          gridAutoFlow: 'column',
          gridTemplateColumns: `repeat(auto-fill,minmax(140px,1fr)) !important`,
          gridAutoColumns: `minmax(140px, 1fr)`,

          borderRadius: '8px',
        }}
      >
        {castMembers?.map(castMember => (
          <ListItem
            key={castMember.cast_id}
            sx={{
              padding: '0',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                minHeight: '80%',
                maxHeight: '80%',
                width: '100%',
              }}
            >
              <CardMedia
                component="img"
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/original/${castMember.profile_path}`
                    : 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
                }
                alt={castMember.character}
                sx={{
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  height: '100%',
                  width: '100%',
                }}
              />
            </Box>
            <Stack
              flexWrap="wrap"
              sx={{ height: '20%', width: '100%', paddingX: 1 }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', fontSize: '10px' }}
              >
                {castMember.original_name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '10px' }}>
                {castMember.character}
              </Typography>
            </Stack>
          </ListItem>
        ))}
        <ListItem sx={{ width: '180px' }}>
          <Stack
            spacing={2}
            onClick={navigateToFullCastCrew}
            direction="row"
            alignItems="center"
            sx={{
              '&:hover': { cursor: 'pointer', color: '#636e72' },
            }}
          >
            <Typography variant="body1">View More</Typography>
            <ArrowCircleRightIcon fontSize="large" />
          </Stack>
        </ListItem>
      </ImageList>
    </RootBox>
  );
}

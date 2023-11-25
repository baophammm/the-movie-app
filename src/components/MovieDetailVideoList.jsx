import {
  Box,
  ImageList,
  ImageListItem,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function MovieDetailVideoList({ videoList, videoWidth }) {
  return (
    <ImageList
      sx={{
        height: '370px',
        gridAutoFlow: 'column',
        gridTemplateColumns: `repeat(auto-fill,minmax(${videoWidth},1fr)) !important`,
        gridAutoColumns: `minmax(${videoWidth}, 1fr)`,

        borderRadius: '8px',
      }}
    >
      {videoList.map(item => (
        <ImageListItem
          key={item.key}
          sx={{
            height: '100%',
            backgroundImage: `url(https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`,
          }}
        >
          <a
            target="blank"
            href={`https://www.youtube.com/watch?v=${item.key}`}
            style={{
              height: '100%',
            }}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PlayCircleFilledWhiteIcon
                fontSize="large"
                sx={{ color: 'white' }}
              />
            </Box>
          </a>
        </ImageListItem>
      ))}
      <ListItem sx={{ width: '200px' }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            '&:hover': { cursor: 'pointer', color: '#636e72' },
          }}
        >
          <Typography variant="h6">View More</Typography>
          <ArrowCircleRightIcon fontSize="large" />
        </Stack>
      </ListItem>
    </ImageList>
  );
}

export default MovieDetailVideoList;

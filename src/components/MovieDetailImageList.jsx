import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ListItem, Stack, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
export default function MovieDetailImageList({ imageList, imageWidth }) {
  return (
    <ImageList
      sx={{
        gridAutoFlow: 'column',
        gridTemplateColumns: `repeat(auto-fill,minmax(${imageWidth},1fr)) !important`,
        gridAutoColumns: `minmax(${imageWidth}, 1fr)`,

        borderRadius: '8px',
      }}
    >
      {imageList.map(item => (
        <ImageListItem key={item.file_path}>
          <img
            src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
            alt={item.file_path}
            loading="lazy"
          />
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

import { Typography } from '@mui/material';
import React from 'react';

function MainFooter() {
  return (
    <Typography variant="body2" align="center" p={1} sx={{ width: 1 }}>
      {`Copyright © TheMovieApp ${new Date().getFullYear()}`}
    </Typography>
  );
}

export default MainFooter;

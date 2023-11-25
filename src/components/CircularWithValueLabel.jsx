import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LensIcon from '@mui/icons-material/Lens';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <LensIcon
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          fontSize: '60px',
          color: 'black',
          opacity: '0.3',
        }}
      />
      <CircularProgress
        variant="determinate"
        size={60}
        {...props}
        sx={{ color: '#2ecc71' }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="white"
          fontWeight="bold"
        >
          {`${Math.round(props.value)}`}
        </Typography>
        <Typography variant="body2" fontSize="8px" sx={{ alignSelf: 'top' }}>
          %
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ progress }) {
  return <CircularProgressWithLabel value={progress} />;
}

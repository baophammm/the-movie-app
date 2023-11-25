import { Box, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

function MainLayout() {
  return (
    <Stack sx={{ minWidth: '100vw', minHeight: '100vh' }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1, width: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;

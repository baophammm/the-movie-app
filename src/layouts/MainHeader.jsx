import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../components/Logo';
import { Button, Grid, Menu, MenuItem, Stack } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

function MainHeader() {
  let auth = useAuth();

  const handleSignout = () => {
    auth.logout(() => {});
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid
            container
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Grid item xs={9} sm={6} md={3}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  borderRadius: '5px',
                  ml: 2,
                }}
              >
                <Logo />
              </IconButton>
            </Grid>
            <Grid item sx={{ height: 1, flexGrow: 1 }} />
            <Grid
              item
              lg={6}
              xl={5}
              sx={{
                height: 1,
                display: { xs: 'none', sm: 'none', md: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h5"
                color="inherit"
                fontWeight="bold"
                component="div"
              >
                Welcome {auth.user?.username} !
              </Typography>

              <Stack spacing={2} direction="row">
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: '5px',

                    '&:hover': {
                      background: '#273c75',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Link
                    to="/favorite"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    <Typography variant="h6">Favorite List</Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: '5px',

                    '&:hover': {
                      background: '#273c75',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Link
                    to="/watched"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    <Typography variant="h6">Watched</Typography>
                  </Link>
                </Box>
              </Stack>
              <Button
                onClick={handleSignout}
                sx={{
                  lineHeight: ' 24px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: 'white',
                  '&:hover': {
                    background: '#273c75',
                  },
                }}
              >
                <Stack spacing={1} direction="row" alignItems="center">
                  <ExitToAppIcon />
                  <Typography variant="h6">Sign Out</Typography>
                </Stack>
              </Button>
            </Grid>
            <Grid
              item
              xs={2}
              sm={1}
              sx={{
                height: 1,
                display: { sm: 'flex', md: 'none' },
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: 'black' }}
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
                <MenuItem
                  onClick={handleClose}
                  sx={{ color: 'primary.contrastText' }}
                >
                  <Typography
                    variant="h6"
                    color="inherit"
                    fontWeight="bold"
                    component="div"
                  >
                    Welcome {auth.user?.username} !
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{ color: 'primary.contrastText' }}
                >
                  <Box
                    sx={{
                      px: 2,
                      borderRadius: '5px',
                      '&:hover': {
                        background: '#273c75',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Link
                      to="/favorite"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      <Typography variant="h6">Favorite List</Typography>
                    </Link>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{ color: 'primary.contrastText' }}
                >
                  <Box
                    sx={{
                      px: 2,
                      borderRadius: '5px',

                      '&:hover': {
                        background: '#273c75',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Link
                      to="/watched"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      <Typography variant="h6">Watched</Typography>
                    </Link>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{ color: 'primary.contrastText' }}
                >
                  <Box
                    onClick={handleSignout}
                    sx={{
                      px: 2,
                      fontWeight: 'bold',

                      color: 'white',
                      '&:hover': {
                        background: '#273c75',
                      },
                    }}
                  >
                    <Stack spacing={1} direction="row" alignItems="center">
                      <ExitToAppIcon />
                      <Typography variant="h6">Sign Out</Typography>
                    </Stack>
                  </Box>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;

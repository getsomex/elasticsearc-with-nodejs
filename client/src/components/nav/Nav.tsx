import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MUIButton from '../reusableComponents/Button';
import LoginIcon from '@mui/icons-material/Login';

const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} color='transparent' position='static'>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Getto
          </Typography>
          <MUIButton name='Sign Up' />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

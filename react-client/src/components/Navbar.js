import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Navbar.css';

function Navbar() {
    return (
          <AppBar position="fixed">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">Dota2 Heroes Recommendation</Typography>
              </Toolbar>
          </AppBar>
    );
}

export default Navbar;
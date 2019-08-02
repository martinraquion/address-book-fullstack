import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
// import IconButton from '@material-ui/core/IconButton';
// import { Link } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const handleClick = () =>{
    localStorage.clear()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Address Book
          </Typography>
          <Link to='/'
          style={{
            textDecoration: 'none',
            color: 'white'
          }}
          >
          <Button color="inherit"
          onClick={handleClick}
          >
          Logout
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
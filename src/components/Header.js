import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  background:{
    backgroundColor: '#00040D',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#D98723'
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const logged_name = localStorage.getItem('name')

  const handleClick = () =>{
    localStorage.clear()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
             ADDRESS BOOK  
          </Typography>
          {/* {logged_name} | */}
        
          <Button
          style={{
            color: '#D98723'
          }}>
          <span>{logged_name}</span>
          </Button>
          <Link to='/'
          style={{
            textDecoration: 'none',
            color: 'white'
          }}
          > | 
          <Button 
          onClick={handleClick}
          style={{
            color: '#D98723'
          }}
          >
         <span>
         Logout
         </span>
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
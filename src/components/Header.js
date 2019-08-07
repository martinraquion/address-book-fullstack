import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

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
          <span style={{display:'flex'}}>
          <span><Icon>supervisor_account</Icon></span>
          &nbsp;
          <span>{logged_name}</span>
          </span>
          </Button>
          <Link to='/'
          style={{
            textDecoration: 'none',
            color: 'white'
          }}
          >
          <span style={{color:'#D98723'}}>|</span>
          <Button 
          onClick={handleClick}
          style={{
            color: '#D98723'
          }}
          >
          <span style={{display:'flex'}}>
          <span>
          <Icon>power_settings_new</Icon>
          </span> 
          &nbsp;
         <span>
         Logout
         </span>
         </span>
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
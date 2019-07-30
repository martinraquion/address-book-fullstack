import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
// import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
     
        <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
        <form className={classes.form} validate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateFn"
            label="First Name"
            name="firstName"
            autoFocus
            error={props.validateFn}
            onBlur={props.handleBlur}
            // value={props.username}
            onChange={props.handleChange}
          />
          
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateLn"
            label="Last Name"
            name="lastName"
            onChange={props.handleChange}
            error={props.validateLn}
            onBlur={props.handleBlur}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateUn"
            label="Username"
            name="username"
            onChange={props.handleChange}
            error={props.validateUn}
            onBlur={props.handleBlur}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateEm"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={props.handleChange}
            error={props.validateEm}
            onBlur={props.handleBlur}
          />
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="validatePs"
            autoComplete="current-password"
            onChange={props.handleChange}
            error={props.validatePs}
            onBlur={props.handleBlur}
          />
   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Register
          </Button>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Link to='/'>
                {"Already have an Account? Sign In"}
              </Link>
            </div>
        </form>
      </div>
   
    </Container>
  );
}
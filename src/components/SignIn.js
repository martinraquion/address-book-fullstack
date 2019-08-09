import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    // marginTop: theme.spacing(20),
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
  container: {
    marginTop: theme.spacing(20),
  },
  spacing: {
    padding: theme.spacing(4, 4),
  }
}));


export default function SignIn() {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState({
    username: '', password: ''
  });

  const [validation, setValidation] = useState({
    validateUn: false, validatePs: false
  })


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      window.location.href = `#/addressbook`
    }else{
      window.location.href = `#/`
    }
  }, [])

  const handleOnChange = event => {
    const { name, value, id } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    (value==='')?
      setValidation({...validation,[id]: true}) 
      : setValidation({...validation,[id]:false })
  };

  const handleBlur = event =>{
    const {value, id} = event.target
    if(value===''){
      setValidation({...validation,
          [id]: true
      })
  }
  }

  const handleSubmit = e =>{
    e.preventDefault()
    axios('http://localhost:3001/api/login', 
    {
      method: 'post',
      data:inputValues
    })
    .then(res =>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', (`${res.data.firstName} ${res.data.lastName}`))
      console.log(res)
      window.location.href = `#/addressbook`
    }
    
    )
    .catch(function(response) {
      toast.error('Incorrect Username or Password')
      console.log(response)
    })
    
  }
 
    

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
    <Paper className={classes.spacing}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ToastContainer
        autoClose={2500}
        hideProgressBar
         />
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={validation.validateUn}
            id="validateUn"
            label="Username"
            name="username"
            helperText={validation.validateUn? 'Username is required': ''}
            value={inputValues.username}
            onChange={handleOnChange}
            onBlur={handleBlur}
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
            helperText={validation.validatePs? 'Password is required': ''}
            error={validation.validatePs}
            value={inputValues.password}
            onChange={handleOnChange}
              onBlur={handleBlur}
            autoComplete="current-password"
          />
          <Button
            type='submit'
            fullWidth
            variant="contained"
            style={{backgroundColor: '#010A26', color:'white'}}
            className={classes.submit}
           
          >
            Sign In
          </Button>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
            <Link to='/register'>
            {"Don't have an account? Sign Up"}
            </Link>
            </div>
        </form>
      </div>
            </Paper>
    </Container>

  );
}
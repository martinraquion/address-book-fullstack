import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'; 
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
    backgroundColor: '#D98723',
    color:'white',
    margin: theme.spacing(3, 0, 2),
  },
  spacing: {
    padding: theme.spacing(4, 4)
  },
  container: {
    marginTop: theme.spacing(10),
  }
}));

export default function Form() {
  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      window.location.href = `#/addressbook`
    }else if(!token){
      window.location.href = `#/register`
    }
  }, [])

  const [inputValues, setInputValues] = useState({
    firstName:'',
    lastName: '',
    username:'',
    password:'',
    email:''
  });

  const [validation, setValidation] = useState({
    validateFn: false,
    validateLn: false,
    validateUn: false,
    validatePs: false,
    validateEm: false
  })

  const handleChange = event => {
    const { name, value, id } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    (value==='')?
      setValidation({...validation,[id]: true}) 
      : setValidation({...validation,[id]:false })
      // console.log(inputValues)
  };

  const handleBlur = event =>{
    const {value, id} = event.target
    if(value===''){
      setValidation({...validation,
          [id]: true
      })
  }}

  const handleSubmit = e =>{
    e.preventDefault()
    axios('http://localhost:3001/api/register', 
    {
      method: 'post',
      data:inputValues
    })
    .then(res =>{
      toast.success('Successfull Registered! Sign in to your account')
      window.location.href = `#/`
      console.log(res)
    }
    
    )
    .catch(res => {
      console.log(res)
     
    })
  }



  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
    <Paper className={classes.spacing}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
        <form className={classes.form} validate onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateFn"
            label="First Name"
            name="firstName"
            autoFocus
            error={validation.validateFn}
            onBlur={handleBlur}
            // value={inputValues.username}
            onChange={handleChange}
          />
          
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateLn"
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            error={validation.validateLn}
            onBlur={handleBlur}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="validateUn"
            label="Username"
            name="username"
            onChange={handleChange}
            error={validation.validateUn}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="validateEm"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            error={validation.validateEm}
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
            autoComplete="current-password"
            onChange={handleChange}
            error={validation.validatePs}
            onBlur={handleBlur}
          />
   
          <Button
            type="submit"  
            fullWidth
            variant="contained"
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
      </Paper>
    </Container>
  );
}
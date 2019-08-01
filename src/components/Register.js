import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from 'axios'
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

export default function Form() {
  const classes = useStyles();

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

  const handleSubmit = () =>{
    // console.log(inputValues)
    axios('http://localhost:3001/api/register', 
    {
      method: 'post',
      data:inputValues
    })
    .then(res =>{
      window.location.href = '#/'
    }
    )}


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
            // type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit}
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
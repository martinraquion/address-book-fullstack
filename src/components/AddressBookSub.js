import React, {useState, useEffect} from 'react';
// import MaterialTable from 'material-table';
import ButtonAppBar from './Header';
import { Container } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// import Create from '@material-ui/icons/CreateOutlined'
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined'
// import { flexbox } from '@material-ui/system';
// import AddModal from './AddModal';
// import EditModal from './EditModal';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import AddBox from '@material-ui/icons/AddBox';
import jwtDecode from 'jwt-decode';
import Create from '@material-ui/icons/CreateOutlined'
// import axios from 'axios'
// import AddBox from '@material-ui/icons/AddBox';
// import Tooltip from '@material-ui/core/Tooltip';
// import { inherits } from 'util'; 

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  searchbar:{
    // float: 'right',
    margin: theme.spacing(2,2,2,3)
  },
  table: {
    minWidth: 650,
  },
  
}));


export default function AddressBookSub() {

    const classes = useStyles();
    // const [contactMount, setContactMount] = useState(true)
    const [contactList, setContactList] = useState([])
    const [loaderState, setLoaderState] = useState(true)
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [inputValues, setInputValues] = useState({
      first_name: "",
      last_name: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city:"",
      state_or_province: "",
      postal_code: "",
      country: ""
    })

    const [editValues, setEditValues] = useState({
      first_name: "",
      last_name: "",
      home_phone: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      city:"",
      state_or_province: "",
      postal_code: "",
      country: ""
    })

    const [currentRow, setCurrentRow] = useState([])

    const token = localStorage.getItem('token');
    if(!token){
     window.location.href='/';
     }
   
   var decoded = jwtDecode(token);
   const current_user = decoded.userId;

    
 
    // }

    const handleClickOpen = () => {
      setOpen(true);
    }
    
    const handleClose = () => {
      setOpen(false);
    }

    // const handleEditOpen = () => {
    //   setEditOpen(true);
    // }
    
    const handleEditClose = () => {
      setEditOpen(false);
    }

    const handleChange = e => {
      const {name, value} = e.target
      setInputValues({...inputValues, 
      [name]: value
      // console.log(na)
      })
      // console.log(inputValues)
      
    }

    const handleEditChange = e => {
      const {name, value} = e.target
      setEditValues({...editValues, 
      [name]: value
      // console.log(na)
      })
      // console.log(inputValues)
      // console.log(editValues)
      
    }

    const handleAddContact = e => {
      // console.log(e.target)
      axios({
              url: `http://localhost:3001/api/contact/${current_user}`,
              method: 'post',
              json: true,
              data: inputValues,
          })
      
      setOpen(false)
  }

  // const handleDeleteContact = e => {
  //   console.log('delete')
  //   axios(`http://localhost:3001/api/deleteContact/${contacts[i].contact_id}`, {
  //     method: 'delete',
  //   }).then(function (res) {
  //     setComponent(true)
  //     // console.log(res)
  //   })
  // }
  useEffect(() => {
    axios.get(`http://localhost:3001/api/contact/list?id=${current_user}`)
    .then(res => {
      setContactList(res.data);
      setLoaderState(false);
    })
  }, [contactList])

  const handleSortLastName = () => {
    // console.log('hi')
    axios.get(`http://localhost:3001/api/contact/lastname?id=${current_user}`)
    .then(res => {
      setContactList(res.data);
      setLoaderState(false);
    })
  }
  
    

      
  return (
    <React.Fragment>
    <ButtonAppBar />
    <Container 
    maxWidth='lg'
    style={{
      marginTop: '40px'
    }}
    >
    <span
    style={{
      display: 'flex',
      justifyContent:'space-between',
      alignItems:'center'
    }}
    >
    {/* <Tooltip title="Add New Contact" placement="right"> */}
    <AddBox onClick={handleClickOpen}/>
    {/* </Tooltip> */}
    <TextField
        id="standard-search"
        label="Search"
        type="search"
        // className={classes.textField}

        // margin="normal"
    />
   
    </span>
    
<Paper className={classes.root}>    
      <Table className={classes.table}>
        <TableHead
        >
          <TableRow>
            <TableCell 
            onClick = {handleSortLastName}
            >Last Name</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell 
            >
            <span
            style={{
              display:'flex',
              justifyContent: 'center'
            }}
            >
            Actions
            </span>
            
            </TableCell>

          </TableRow>
        </TableHead>
        
        <TableBody>
        
          {contactList.map(res => (
            
            <TableRow key={res.id}>
              <TableCell component="th" scope="row">
                {res.last_name}
              </TableCell>
              <TableCell >{res.first_name}</TableCell>
              <TableCell >{res.home_phone}</TableCell>
              <TableCell 
              > 
              <span style={{
                 // style={{
                display: 'flex',
                justifyContent: 'space-evenly',
               
              }}>
              <span
              style={{
                cursor: 'pointer'
              }}
              >
              <Create
              onClick={()=>{
                setEditOpen(true);
                setCurrentRow(res)
                }}
              // value={res.id}
               />
              </span>
              <span
              style={{
                cursor: 'pointer'
              }}>
              
               <DeleteOutlined
                onClick={() => {
                    axios(`http://localhost:3001/api/contact/${res.id}`, {
                    method: 'delete',
                    }).then(function (res) {
                    // setComponent(true)
                    console.log(res)
                    })
                }}
                />
                {/* <span>confirm</span> */}
               </span>
               </span>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loaderState? <h1>Loading</h1>:''}
    </Paper>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
                  <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    ADD NEW CONTACT
                  </DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    
                  </DialogContentText> */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label="First name"
                        fullWidth
                        onChange={handleChange}
                        // autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="last_name"
                        name="last_name"
                        label="Last name"
                        onChange={handleChange}
                        fullWidth
                        // autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="mobile_phone"
                        name="mobile_phone"
                        label="Mobile Phone"
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="home_phone"
                        name="home_phone"
                        label="Home Phone"
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="work_phone"
                        name="work_phone"
                        label="Work Phone"
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        onChange={handleChange}
                        fullWidth
                        autoComplete="billing address-level2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField id="state_or_province" name="state_or_province" label="State/Province/Region" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="postal_code"
                        name="postal_code"
                        label="Zip / Postal code"
                        onChange={handleChange}
                        fullWidth
                        autoComplete="billing postal-code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        onChange={handleChange}
                        fullWidth
                        autoComplete="billing country"
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button color="primary">
                    CANCEL
                  </Button>
                  <Button
                  onClick={handleAddContact} 
                  color="primary"
                  >
                    ADD
                  </Button>
                </DialogActions>
              </Dialog>


              <Dialog open={editopen} onClose={handleEditClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
                  <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    EDIT CONTACT
                  </DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    
                  </DialogContentText> */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label="First name"
                        fullWidth
                        onChange={handleEditChange}
                        defaultValue={currentRow.first_name}
                        // autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="last_name"
                        name="last_name"
                        label="Last name"
                        onChange={handleEditChange}
                        fullWidth
                        defaultValue={currentRow.last_name}
                        // autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        onChange={handleEditChange}
                        defaultValue={currentRow.email}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="mobile_phone"
                        name="mobile_phone"
                        label="Mobile Phone"
                        onChange={handleEditChange}
                        defaultValue={currentRow.mobile_phone}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="home_phone"
                        name="home_phone"
                        label="Home Phone"
                        onChange={handleEditChange}
                        defaultValue={currentRow.home_phone}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="work_phone"
                        name="work_phone"
                        label="Work Phone"
                        onChange={handleEditChange}
                        defaultValue={currentRow.work_phone}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        onChange={handleEditChange}
                        defaultValue={currentRow.city}
                        fullWidth
                        autoComplete="billing address-level2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                      id="state_or_province" 
                      name="state_or_province" 
                      label="State/Province/Region"
                      defaultValue={currentRow.state_or_province}
                      fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="postal_code"
                        name="postal_code"
                        label="Zip / Postal code"
                        onChange={handleEditChange}
                        defaultValue={currentRow.postal_code}
                        fullWidth
                        autoComplete="billing postal-code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        onChange={handleEditChange}
                        defaultValue={currentRow.country}
                        fullWidth
                        autoComplete="billing country"
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button 
                  onClick={handleEditClose}
                  color="primary">
                    CANCEL
                  </Button>
                  <Button
                  onClick={() => {
                    setEditOpen(false)
                    axios({
                  method: 'patch',
                  url: ` http://localhost:3001/api/update?cid=${currentRow.id}`,
                  json: true,
                  data: editValues
                  })
                  }}
                  color="primary"
                  >
                   Edit
                  </Button>
                </DialogActions>
              </Dialog>
    
    </Container>
    </React.Fragment>
  );
}
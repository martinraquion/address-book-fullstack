import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined'
import AddBox from '@material-ui/icons/AddBox';
import Create from '@material-ui/icons/CreateOutlined';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowRight from '@material-ui/icons/ArrowRight';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
//COMPONENTS ADDED
import ButtonAppBar from './Header';
import AddDialog from './dialogs/AddDialog'
import EditDialog from './dialogs/EditDialog'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  searchbar:{
    margin: theme.spacing(2,2,2,3)
  },
  table: {
    minWidth: 650,
    
  },
  tablecell: {
    fontSize: '15px',
    background: '#010A26',
    color: 'white'
  }
  
}));


export default function AddressBook() {
    const classes = useStyles();
    const [contactList, setContactList] = useState([])
    const [loaderState, setLoaderState] = useState(true)
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [sortCLick, setSortClick] = useState(false);
    const [openDetails, setOpenDetails] = useState(false)
    const [currentRow, setCurrentRow] = useState([]);
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
    });
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
    });

    const token = localStorage.getItem('token');
    if(!token){
     window.location.href='/';
    }
   
    var decoded = jwtDecode(token);
    const current_user = decoded.userId;


    useEffect(() => {
        if(!sortCLick){
        axios.get(`http://localhost:3001/api/contact/list?id=${current_user}`)
        .then(res => {
            setContactList(res.data);
            setLoaderState(false);
        })
        }else{
        axios.get(`http://localhost:3001/api/contact/lastname?id=${current_user}`)
        .then(res => {
        setContactList(res.data);
        setLoaderState(false);
        })
        }   
    }, [contactList, editValues])
   

    const handleClickOpen = () => {
      setOpen(true);
    }
    
    const handleClose = () => {
      setOpen(false);
    }

    const handleEditClose = () => {
      setEditOpen(false);
    }

    const handleChange = e => {
      const {name, value} = e.target
      setInputValues({...inputValues, 
      [name]: value
      })      
    }

    const handleEditChange = e => {
      const {name, value} = e.target
      setEditValues({...editValues, 
      [name]: value
      })
      console.log(value)   

    }

    const handleAddContact = e => {
      setLoaderState(false)
      axios({
              url: `http://localhost:3001/api/contact/${current_user}`,
              method: 'post',
              json: true,
              data: inputValues,
          }).then(
            setLoaderState(true)
            )
      setOpen(false)
    }

    const handleEditContact = () => {
      
        axios({
            method: 'patch',
            url: ` http://localhost:3001/api/update?cid=${currentRow.id}`,
            json: true,
            data: editValues
            }).then(
            setLoaderState(true)
            )
        setEditOpen(false)
       
    }

    const handleSortLastName = e => {
        setSortClick(!sortCLick)
    }


  
      
  return (
    <React.Fragment>
    <ButtonAppBar />
    <Container 
    maxWidth='xl'
    style={{
      marginTop: '20px',
      color: '#D98723'
    }}
    >
    <Grid container spacing={3}>
    <Grid item xs={12} md={openDetails?10:12}>
   
    <span
    style={{
      display: 'flex',
      justifyContent:'space-between',
      alignItems:'center'
    }}
    >
    <AddBox onClick={handleClickOpen}
      style={{
        fontSize: '30px',
        marginTop: '20px',
        cursor: 'pointer'
      }}
    />
    <TextField
        id="standard-search"
        label="Search"
        type="search"
    />
   
    </span>
    
  <Paper className={classes.root}>   
  {loaderState? <LinearProgress /> :''} 
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          
            <TableCell 
            onClick = {handleSortLastName}
            className = {classes.tablecell}
            >
            Last Name 
            {/* <ArrowDown 
              style={{
                marginTop:'8px'
              }}
            /> */}
           
            </TableCell>
            <TableCell align="left" className = {classes.tablecell}>First Name</TableCell>
            <TableCell className = {classes.tablecell}>Mobile Number</TableCell>
            <TableCell className = {classes.tablecell}
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
            
            <TableRow key={res.id}
            onClick={()=>{
              setOpenDetails(true)
              setCurrentRow(res)
            }}
            style={{
              cursor:'pointer'
            }}
            >
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
                cursor: 'pointer',
                color: '#D98723'
              }}
              >
              <Create
              onClick={()=>{
                setEditOpen(true);
                setCurrentRow(res);
                setEditValues({...editValues, 
                  first_name: res.first_name,
                  last_name: res.last_name,
                  home_phone: res.home_phone,
                  mobile_phone: res.mobile_phone,
                  work_phone: res.work_phone,
                  email: res.email,
                  city: res.city,
                  state_or_province: res.state_or_province,
                  postal_code: res.postal_code,
                  country: res.country
                 // console.log(na)
                })
                
                }}
              // value={res.id}
               />
              </span>

              <span
              style={{
                cursor: 'pointer',
                color: '#D98723'
              }}>
          
               
               <DeleteOutlined
                // onClick={handleDeleteStat}
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
               <span
              style={{
                cursor: 'pointer',
                color: '#D98723'
              }}>
                <ArrowRight />
              </span>
               
               </span>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </Paper>
    
    <AddDialog 
        handleAddContact={handleAddContact}
        handleChange={handleChange}
        handleClose={handleClose}
        open={open}
    />

    <EditDialog 
        editopen={editopen}
        editValues={editValues}
        currentRow={currentRow}
        handleEditChange={handleEditChange}
        handleEditClose={handleEditClose}
        handleEditContact={handleEditContact}
    />
    
    </Grid>
    {openDetails?
    <Grid item xs={12} md={2}>
    <Paper className={classes.root}>
    {/* <Typography>Contact Details</Typography>   */}
   
    <List >
      <ListItem
      style={{
        background: '#010A26',
        color: 'white'
      }}
      >
        <ListItemText primary="CONTACT DETAILS" inset={true}/>

      </ListItem>
      <Divider />
   
      <ListItem>
        <ListItemText primary={`${currentRow.first_name} ${currentRow.last_name}`} secondary="Name" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={currentRow.email} secondary="Email" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.mobile_phone} secondary="Mobile Number" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.home_phone} secondary="Home Number" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.work_phone} secondary="Work Number" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.postal_code} secondary="Postal Code" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.city} secondary="City" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.state_or_province} secondary="State or Province" />
      </ListItem>
      <Divider />
      <ListItem>
       <ListItemText primary={currentRow.country} secondary="Country" />
      </ListItem>
    </List>
    </Paper>
    </Grid>: 
    ''}
    </Grid>
    </Container>
    </React.Fragment>
  );
}
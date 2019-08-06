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
  
}));


export default function AddressBook() {
    const classes = useStyles();
    const [contactList, setContactList] = useState([])
    const [loaderState, setLoaderState] = useState(true)
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [sortCLick, setSortClick] = useState(false);
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
      axios({
              url: `http://localhost:3001/api/contact/${current_user}`,
              method: 'post',
              json: true,
              data: inputValues,
          })
      setOpen(false)
    }

    const handleEditContact = () => {
        axios({
            method: 'patch',
            url: ` http://localhost:3001/api/update?cid=${currentRow.id}`,
            json: true,
            data: editValues
            })
        setEditOpen(false)
    }

    const handleSortLastName = e => {
        setSortClick(!sortCLick)
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
    <AddBox onClick={handleClickOpen}/>
    <TextField
        id="standard-search"
        label="Search"
        type="search"
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
    </Container>
    </React.Fragment>
  );
}
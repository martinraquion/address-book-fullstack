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
import AddBox from '@material-ui/icons/AddBox';
import Create from '@material-ui/icons/CreateOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
//COMPONENTS ADDED
import ButtonAppBar from './Header';
import AddDialog from './dialogs/AddDialog'
import EditDialog from './dialogs/EditDialog'
import DeleteDialog from './dialogs/DeleteDialog'
import ContactView from './views/ContactView'
import Groups from './views/Groups'
import 'react-toastify/dist/ReactToastify.min.css'; 
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

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

  tableBody:{
    height: '200px',
    overflowY: 'auto',
  },

  tablecell: {
    fontSize: '15px',
    background: '#010A26',
    color: 'white'
  },
  tableHover: {
    '&:hover': {
        background: '#ebebeb'
   },
  }
  
}));


export default function AddressBook() {
    const classes = useStyles();
    const [contactList, setContactList] = useState([])
    const [loaderState, setLoaderState] = useState(true)
    const [open, setOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false)
    const [editopen, setEditOpen] = useState(false);
    const [sortCLick, setSortClick] = useState(false);
    const [openDetails, setOpenDetails] = useState(false)
    const [currentRow, setCurrentRow] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('')
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
      postal_code: 0,
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
        // console.log(searchKeyword)   
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

    function handleDeleteClose() {
      setDeleteOpen(false);
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
    }

    const handleSearchInput = e => {
      setSearchKeyword(e.target.value)
    }

    const handleAddContact = e => {
      setLoaderState(true)
      setOpen(false)
      axios({
              url: `http://localhost:3001/api/contact/${current_user}`,
              method: 'post',
              json: true,
              data: inputValues,
          }).then(()=>{
            setLoaderState(false);
            
            setCurrentRow(inputValues)
            toast.success(`${inputValues.first_name} has been succesfully added to your contacts`);
            }
            )
     
     
    }

    const handleEditContact = () => {
      setLoaderState(true)
      setEditOpen(false)
        axios({
            method: 'patch',
            url: ` http://localhost:3001/api/update?cid=${currentRow.id}`,
            json: true,
            data: editValues
            }).then(()=>{
            setLoaderState(false)
            setCurrentRow(editValues)
            toast.info(`${editValues.first_name}'s details has been updated`);
            } 
            )
     
       
    }

    const handleDeleteContact = () => {
      setLoaderState(false)
      setDeleteOpen(false)
      axios({
            method: 'delete',
            url: `http://localhost:3001/api/contact/${currentRow.id}`
            }).then(function(res){
            setLoaderState(false)
             toast.success(`${currentRow.first_name} has been removed from your contacts`);
             setCurrentRow({
              first_name: ' ',
               last_name: ' '
               })
            setOpenDetails(false)
            })
      
    }

    const handleSortLastName = e => {
        setSortClick(!sortCLick)
    }

    const contactFiltered = contactList.filter((data)=>{
      let word = searchKeyword.toLowerCase()
      let fname = data.first_name.toLowerCase().indexOf(word) !== -1;
      let lname = data.last_name.toLowerCase().indexOf(word) !== -1;
      if(fname){
        return fname;
      }else{
        return lname;
      }
    });


  
      
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
    <Grid container spacing={5}>
    <Grid item xs={12} md={9}>
   
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
        onChange={handleSearchInput}
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
        
        <TableBody className={classes.tableBody}>
        
          {contactFiltered.map(res => (
            <React.Fragment key={res.id}>
          
            <TableRow key={res.id}
            onClick={()=>{
              setOpenDetails(true)
              setCurrentRow(res)
            }}
            className={classes.tableHover}
            style={{
              cursor:'pointer',
              backgroundColor: ((res.id===currentRow.id)?'#D98723':''),
            }}
            
            >
              <TableCell component="th" scope="row"
              style={{
                color: ((res.id===currentRow.id)?'white':'black')
              }}
              >
                {res.last_name}
              </TableCell>
              <TableCell 
               style={{
                color: ((res.id===currentRow.id)?'white':'black')
              }}
              >{res.first_name}</TableCell>
              <TableCell 
               style={{
                color: ((res.id===currentRow.id)?'white':'black')
              }}
              >{res.mobile_phone}</TableCell>
              <TableCell 
              > 
              <span style={{
                display: 'flex',
                justifyContent: 'center',
               
              }}>
              <span
              style={{
                cursor: 'pointer',
                color: ((res.id===currentRow.id)?'white':'#D98723')
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
                })
                
                }}
               />
              </span>

              <span
              style={{
                cursor: 'pointer',
                color: ((res.id===currentRow.id)?'white':'#D98723')
              }}>
                <DeleteOutlined style={{
              cursor: 'pointer',
              paddingLeft: '10px',
              color:((res.id===currentRow.id)?'white':'#D98723')
            }}
            onClick={()=>{
              setDeleteOpen(true)
            }}
             /> 
              </span>
            
               </span>
              </TableCell>

            </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      
    </Paper>
    
    <AddDialog 
        handleAddContact={handleAddContact}
        handleChange={handleChange}
        handleClose={handleClose}
        setCurrentRow={setCurrentRow}
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
    
    <DeleteDialog 
      deleteopen={deleteopen}
      handleDeleteClose={handleDeleteClose}
      handleDeleteContact={handleDeleteContact}
      currentRow={currentRow}
      
    />

    </Grid>
    <Grid item xs={12} md={3} >
    <Grid item xs={12} md={12}
    
    >
     <ContactView 
    currentRow={currentRow}
    setDeleteOpen={setDeleteOpen}
    setOpenDetails={setOpenDetails}
    current_user={current_user}
    openDetails={openDetails}
           
    />
   
    </Grid>
  
      <Groups
    currentRow={currentRow}
    setDeleteOpen={setDeleteOpen}
    setOpenDetails={setOpenDetails}
    current_user={current_user}
   
    />
    <Grid item xs={12} md={12}>
    
    </Grid>
    </Grid>
    
  
    </Grid>
    </Container>
    <ToastContainer 
    hideProgressBar
    autoClose='2000'
    position='bottom-left'
    closeButton={false}
     />

    
    </React.Fragment>
  );
}
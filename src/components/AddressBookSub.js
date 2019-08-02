import React, {useState} from 'react';
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
import AddModal from './AddModal';
import EditModal from './EditModal';
import axios from 'axios';
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

function createData(lastName, firstName, phone_number) {
    return { lastName, firstName, phone_number};
  }
  
  const rows = [
    createData('Raquion', 'Martin Earl', '09123446881'),
    createData('Longaza', 'Trizha Kate', '09123446881'),
    createData('Barbin', 'John Paulo', '09123446881'),
   
  ];


export default function AddressBookSub() {
    const classes = useStyles();
    const [contactMount, setContactMount] = useState(true)
    const [contactList, setContactList] = useState([])


    if(contactMount){
    axios.get('http://localhost:3001/api/contact')
    .then(res => {
      // console.log(res)
      // contactList.push(res.data[0])
      setContactMount(false)
      setContactList(res.data)

      // console.log(contactList[0])
    })
    }

    const handleEdit = (e) => {
      e.preventDefault()
      console.log(e.target.id)
    }

    

    // console.log(contactList)

    // console.log(contactList)

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
     <AddModal/>
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
            <TableCell >Last Name</TableCell>
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
            {console.log(res.id)}
              <TableCell component="th" scope="row">
                {res.first_name}
              </TableCell>
              <TableCell >{res.last_name}</TableCell>
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
              <EditModal
              // onClick={handleEdit}
              // value={res.id}
               />
              </span>
              <span
              style={{
                cursor: 'pointer'
              }}>
               <DeleteOutlined
               id={res.id}
               onClick={handleEdit}
                />
               </span>
               </span>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    
    </Container>
    </React.Fragment>
  );
}
import React from 'react';
// import MaterialTable from 'material-table';
import ButtonAppBar from './Header';
import { Container, Typography } from '@material-ui/core';
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
import SimpleModal from './ContactModal'

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

function createData(lastName, firstName, fat, carbs, protein) {
    return { lastName, firstName, fat, carbs, protein };
  }
  
  const rows = [
    createData('Raquion', 'Martin Earl', '09123446881', 24, 4.0),
   
  ];


export default function AddressBookSub() {
    const classes = useStyles();

  return (
    <React.Fragment>
    <ButtonAppBar />
    <Container 
    maxWidth='lg'
    style={{
      marginTop: '40px'
    }}
    >

<Typography className={classes.searchbar}>
          <TextField placeholder='Search' />
      </Typography>
<Paper className={classes.root}>
     
    
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell >Last Name</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell 
            style={{
              display:'flex',
              justifyContent: 'center'
            }}
            >Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.fat}>
              <TableCell component="th" scope="row">
                {row.lastName}
              </TableCell>
              <TableCell >{row.firstName}</TableCell>
              <TableCell >{row.fat}</TableCell>
              <TableCell 
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                
              }}
              > 
              <span style={{
                cursor: 'pointer'
              }}>
              <SimpleModal />
              </span>
               <DeleteOutlined />
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
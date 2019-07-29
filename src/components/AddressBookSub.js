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


<Paper className={classes.root}>
      <Typography className={classes.searchbar}>
          <TextField placeholder='Search' />
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell >Last Name</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Actions</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.lastName}
              </TableCell>
              <TableCell >{row.firstName}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right"></TableCell>
       
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    
    </Container>
    </React.Fragment>
  );
}
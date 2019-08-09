import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import axios from 'axios'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteOutlined from '@material-ui/icons/DeleteOutline'

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
  dialogTitle: {
    backgroundColor: '#010A26',
    color: '#D98723'
  }
  
}));

export default function GroupMembers ({
membersopen,
setMembersOpen,
currentRow,
groupMembers
}){


    const classes = useStyles();
    const [groupLoop, setGroupLoop] = useState([])
   useEffect(()=>{
    setGroupLoop([...groupMembers])
   }, [groupLoop])
    
  //  console.log(groupMembers)

    return (
        <Dialog open={membersopen}
        maxWidth='xl'
        aria-labelledby="form-dialog-title" className={classes.dialog}>
                  <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    {currentRow.name}
                  </DialogTitle>
                {/* <DialogContent> */}
                
                <List style={{width:'400px', overflowY:'scroll', height:'400px'}}>
                {groupLoop.map(list=>(
                  
                  <React.Fragment >
                
                <ListItem button>
               
                  <ListItemText primary={list.first_name} />
                  <DeleteOutlined onClick={()=>{
                    axios({
                   method: 'delete',
                   url: `http://localhost:3001/api/deleteMember?id=${list.id}`,
                   }).then(()=>{
                  setMembersOpen(false) 
                   })
                  }}/>
                </ListItem>
                <Divider />
                </React.Fragment>
                ))}
                </List>
              

                {/* </DialogContent> */}
                <DialogActions>
                  <Button 
                  color="primary"
                  onClick={()=>setMembersOpen(false)}
                  >
                  CLOSE
                  </Button>
                  
                </DialogActions>
              </Dialog>
    )
}

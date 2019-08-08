import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddBox from '@material-ui/icons/AddBox';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import GroupDialog from '../dialogs/GroupAdd_Dialog'

export default function Groups({}){

    const [open, setOpen] = useState(false);
    const [groupopen, setGroupOpen] = useState(false)
    const [groupList] = useState([])

    function handleExpandClick() {
        setOpen(!open);
      }
    
    function handleGroupDialog(){
        setGroupOpen(true);
    }

     return(
        <Paper style={{marginBottom: 10}} >   
        <List >
          <ListItem style={{
            background: '#010A26',
            color: 'white'
          }}>
            <ListItemText primary="GROUPS" button onClick={handleExpandClick} style={{cursor:'pointer'}}/>
            <AddBox style={{cursor:'pointer'}} onClick={handleGroupDialog} />
            {open ? <ExpandLess button onClick={handleExpandClick} style={{cursor:'pointer'}}/> : <ExpandMore button onClick={handleExpandClick} style={{cursor:'pointer'}}/>}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
       
          <ListItem>
            <ListItemText primary='Group 1'/>
          </ListItem>
          
          </Collapse>

        </List>
        <GroupDialog 
        groupopen = {groupopen}
        setGroupOpen ={setGroupOpen}
         />
        </Paper>
     
     )
}
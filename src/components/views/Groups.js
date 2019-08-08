import React, {useState, useEffect} from 'react'
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
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function Groups({}){

    const [open, setOpen] = useState(false);
    const [groupopen, setGroupOpen] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [loader, setLoader] = useState(false);
    

    const token = localStorage.getItem('token');
    if(!token){
     window.location.href='/';
    }
   
    var decoded = jwtDecode(token);
    const current_user = decoded.userId;

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/groups?id=${current_user}`,
          }).then(function(response){
            setGroupList([...response.data])   
          })
       
    }, [groupList])

    const handleExpandClick = () => {
        setOpen(!open);
      }
    
    const handleGroupDialog = () =>{
        setGroupOpen(true);
    }

    const handleGroupName = e =>{
      setGroupName(e.target.value)      
    }

    const handleAddGroup = () => {
      setGroupOpen(false)
      setLoader(true)
      axios({
        method: 'post',
        url: `http://localhost:3001/api/groups`,
        data: {
          "name": groupName,
          "user_id": current_user
        }
      }).then(function(response){
        // setGroupList([...response.data])  
        // console.log(response) 
        setLoader(false)
        
      })

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
          {loader?<LinearProgress />:""}
          <Collapse in={open} timeout="auto" unmountOnExit>
          
          {groupList.map(list=>(
          <React.Fragment>
          <Divider />
          <ListItem >
            <ListItemText primary={list.name}/>
          </ListItem>
         </React.Fragment>
          ))}

          </Collapse>

        </List>
        <GroupDialog 
        groupopen = {groupopen}
        setGroupOpen ={setGroupOpen}
        handleGroupName={handleGroupName}
        handleAddGroup={handleAddGroup}
         />
        </Paper>
     
     )
}
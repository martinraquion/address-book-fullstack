import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import GroupDialog from '../dialogs/GroupAdd_Dialog'
import GroupDeleteDialog from '../dialogs/GroupDelete_Dialog'
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import GroupMembers from '../dialogs/GroupMembers'
import Button from '@material-ui/core/Button'

export default function Groups({current_user}){

    const [open, setOpen] = useState(true);
    const [groupopen, setGroupOpen] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [loader, setLoader] = useState(false);
    const [currentRow, setCurrentRow] = useState([]);
    const [deleteopen, setDeleteOpen] = useState(false);
    const [membersopen, setMembersOpen] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/groups?id=${current_user}`,
          }).then(function(response){
            setGroupList([...response.data])   
          })
       
    }, [groupList, currentRow, groupMembers, groupList])

    const handleExpandClick = () => {
        setOpen(!open);
      }
    
    const handleGroupDialog = () =>{
        setGroupOpen(true);
    }

    const handleGroupName = e =>{
      setGroupName(e.target.value)      
    }

    const handleDeleteClose = () => {
      setDeleteOpen(false)
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

    const handleDeleteGroup = () => {
      setLoader(true)
      setDeleteOpen(false)
      axios({
        method: 'delete',
        url: `http://localhost:3001/api/deleteGroup?id=${currentRow.id}`,
      }).then(()=>{
        setLoader(false)        
      })
    }

   

     return(
        <Paper style={{marginBottom: 10}} >   
        <List>
          <ListItem style={{
            background: '#010A26',
            color: 'white'
          }}>
            <ListItemText primary="GROUPS" button onClick={handleExpandClick} style={{cursor:'pointer'}}/>
            <AddBox style={{cursor: 'pointer',color: '#D98723'}} onClick={handleGroupDialog} />
            {open ? <ExpandLess button onClick={handleExpandClick} style={{cursor: 'pointer',color: '#D98723'}}/> : <ExpandMore button onClick={handleExpandClick} style={{cursor: 'pointer',color: '#D98723'}}/>}
          </ListItem>
          {loader?<LinearProgress />:""}
          <Collapse in={open} timeout="auto" unmountOnExit>
          
          {groupList.map(list=>(
          
          <React.Fragment key={list.id}>
          
          <Divider />
          <ListItem >
            <ListItemText primary={list.name}/>
            
            <DeleteOutlined 
             style={{color:'#D98723'}}
             onClick={()=>
            {
              setDeleteOpen(true)
              setCurrentRow(list)
              // console.log(currentRow)
              // console.log(groupMembers) 
            }
            }/>
            <Button style={{backgroundColor:'#D98723', color:'white', marginLeft: '20px'}}
            onClick={()=>{
           
           setCurrentRow(list)

           axios({
           method: 'get',
           url: `http://localhost:3001/api/groupMembers?id=${list.id}`,
            }).then(function(response){
              
           setGroupMembers([...response.data])  
          
            }).then(()=>{
             setMembersOpen(true);}
            )
            
           }}
            >VIEW</Button>
          </ListItem>
         </React.Fragment>
          ))}

          </Collapse>

        </List>
        
        <GroupMembers 
          membersopen={membersopen}
          setMembersOpen={setMembersOpen}
          currentRow={currentRow}
          groupMembers={groupMembers}
        />

        <GroupDialog 
        groupopen = {groupopen}
        setGroupOpen ={setGroupOpen}
        handleGroupName={handleGroupName}
        handleAddGroup={handleAddGroup}
         />

         <GroupDeleteDialog 
         deleteopen = {deleteopen}
         setDeleteOpen = {setDeleteOpen}
         handleDeleteClose = {handleDeleteClose}
         handleDeleteGroup = {handleDeleteGroup}
         currentRow = {currentRow}
         />

        </Paper>
     
     )
}
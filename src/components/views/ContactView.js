import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { toast } from 'react-toastify';

import MemberAdd from '../dialogs/MemberAddDialog'

export default function ContactView({
  currentRow, 
  setDeleteOpen,
  current_user,
  openDetails
}){

  const [memberopen, setMemberOpen] = useState(false)
  const [groupList, setGroupList] = useState([])
  const [groupselected, setSelected] = useState('')


  const handleSelectChange  = e =>{
    setSelected(e.target.value)
  } 
  const handleAddMember = () => {
    axios({
      method: 'post',
      url: `http://localhost:3001/api/addMember`,
      data: {
        "contact_id": currentRow.id,
        "group_id": groupselected
      }
    }).then(res=>{
      setMemberOpen(false)
      toast.info(`${currentRow.first_name} has been added to a group`)
    })
  }

     return(
        <Paper style={{
          marginBottom: 20
        }}  >   
        <List >
          <ListItem
          style={{
            background: '#010A26',
            color: 'white'
          }}
          >
            <ListItemText primary={openDetails? 'CONTACT DETAILS': 'SELECT A CONTACT'} />
            {openDetails?
            <React.Fragment>
            <Icon style={{cursor: 'pointer',color: '#D98723', marginRight: '10px'}}
            onClick={()=>{setMemberOpen(true)
               axios({
              method: 'get',
              url: `http://localhost:3001/api/selectGroups?id=${currentRow.id}&user_id=${current_user}`,
              }).then(function(response){
              setGroupList([...response.data])   
              })
            
            }}
            >group_add</Icon>
            <MemberAdd 
            // selectedContact={selectsedContact}
            memberopen={memberopen}
            setMemberOpen={setMemberOpen}
            currentRow={currentRow}
            groupList={groupList}
            handleSelectChange={handleSelectChange}
            handleAddMember={handleAddMember}
            // onClick={console.log(selectedContact)}
            />
            <DeleteOutlined style={{cursor: 'pointer',color: '#D98723'}}
            onClick={()=>{
              setDeleteOpen(true)
            }}
             /> 
             </React.Fragment>
            :''}
                 
          </ListItem>
        
        {openDetails? 
        <React.Fragment>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
              <Icon>account_circle</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${currentRow.first_name} ${currentRow.last_name}`}  />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>email</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={currentRow.email} />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>phone</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.mobile_phone}/>
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>home</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.home_phone} />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>work</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.work_phone} />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>location_on</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={`${currentRow.city} ${currentRow.state_or_province}, ${currentRow.country}, ${currentRow.postal_code}`}  />
          </ListItem>
          </React.Fragment>
          :''} 
        </List>
        </Paper>
     )
}
import React from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

export default function ContactView({
  currentRow, 
  setDeleteOpen,
  setOpenDetails
}){
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
            <ListItemText primary="CONTACT DETAILS" />
           
            <DeleteOutlined style={{cursor: 'pointer',color: '#D98723'}}
            onClick={()=>{
              setDeleteOpen(true)
            }}
             /> 
                 
          </ListItem>
       
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
        </List>
        </Paper>
     )
}
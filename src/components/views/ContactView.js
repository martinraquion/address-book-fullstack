import React from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlined from '@material-ui/icons/DeleteSweepOutlined';
import Close from '@material-ui/icons/Close';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

export default function contactView({
  currentRow, 
  setDeleteOpen,
  setOpenDetails
}){
     return(
        <Paper >   
        <List >
          <ListItem
          style={{
            background: '#010A26',
            color: 'white'
          }}
          >
            <ListItemText primary="CONTACT DETAILS" />
            <span 
            style={{
              width: '15%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
            > 
            <DeleteOutlined style={{
              cursor: 'pointer',
              borderRight: '1px solid white',
              paddingRight: '10px',
              color: '#D98723'
            }}
            onClick={()=>{
              setDeleteOpen(true)
            }}
             /> 
             <Close style={{
              paddingLeft: '8px',
              cursor: 'pointer',
              color: '#D98723'
            }}
             onClick={()=>{
              setOpenDetails(false)
            }} />
            </span>
             
            
          </ListItem>
          <Divider />
       
          <ListItem>
            <ListItemAvatar>
              <Avatar>
              <Icon>account_circle</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${currentRow.first_name} ${currentRow.last_name}`} secondary="Name" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>email</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={currentRow.email} secondary="Email" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>phone</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.mobile_phone} secondary="Mobile Number" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>home</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.home_phone} secondary="Home Number" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>work</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.work_phone} secondary="Work Number" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>star</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.postal_code} secondary="Postal Code" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>location_city</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.city} secondary="City" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>map</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.state_or_province} secondary="State or Province" />
          </ListItem>
          <Divider />
          <ListItem>
          <ListItemAvatar>
              <Avatar>
              <Icon>flag</Icon>
              </Avatar>
            </ListItemAvatar>
           <ListItemText primary={currentRow.country} secondary="Country" />
          </ListItem>
        </List>
        </Paper>
     )
}
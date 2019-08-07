import React from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

export default function contactView({currentRow}){
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
    
          </ListItem>
          <Divider />
       
          <ListItem>
            <ListItemText primary={`${currentRow.first_name} ${currentRow.last_name}`} secondary="Name" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={currentRow.email} secondary="Email" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.mobile_phone} secondary="Mobile Number" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.home_phone} secondary="Home Number" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.work_phone} secondary="Work Number" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.postal_code} secondary="Postal Code" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.city} secondary="City" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.state_or_province} secondary="State or Province" />
          </ListItem>
          <Divider />
          <ListItem>
           <ListItemText primary={currentRow.country} secondary="Country" />
          </ListItem>
        </List>
        </Paper>
     )
}
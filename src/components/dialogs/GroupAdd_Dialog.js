import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

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

export default function GroupDialog ({
  groupopen,
  setGroupOpen,
  handleGroupName,
  handleAddGroup
}){
    const classes = useStyles();
    return (
        <Dialog open={groupopen}
        //  onClose={handleEditClose} 
        aria-labelledby="form-dialog-title" className={classes.dialog}>
                  <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    ADD NEW GROUP
                  </DialogTitle>
                <DialogContent>
                      <TextField
                        required
                        id="groupName"
                        name="groupName"
                        label="Group Name"
                        fullWidth
                        onChange={handleGroupName}
                      />
                </DialogContent>
                <DialogActions>
                  <Button 
                  color="primary"
                  onClick={()=>setGroupOpen(false)}
                  >
                  CANCEL
                  </Button>
                  <Button
                  color="primary"
                  onClick={handleAddGroup}
                  >
                  ADD
                  </Button>
                </DialogActions>
              </Dialog>
    )
}

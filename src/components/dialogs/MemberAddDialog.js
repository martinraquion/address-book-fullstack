import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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

export default function MemberAdd ({
  memberopen,
  setMemberOpen,
  currentRow,
  groupList,
  handleSelectChange,
  handleAddMember
//   selectedContact
}){
    const classes = useStyles();
    return (
        <Dialog open={memberopen}
        aria-labelledby="form-dialog-title" className={classes.dialog}>
                  <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    Add {currentRow.first_name} to a Group
                  </DialogTitle>
                <DialogContent>
                <FormControl fullWidth>
                <InputLabel >Select a Group</InputLabel>
                <Select
                native
                fullWidth
                onChange={handleSelectChange}
                 >
                <option value="" />
                {groupList.map(res=>(
                    <option value={res.id} id={res.name} key={res.id}>{res.name}</option>
                ))}
                
               
              </Select>
            </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button 
                  color="primary"
                  onClick={()=>setMemberOpen(false)}
                  >
                  CANCEL
                  </Button>
                  <Button
                  color="primary"
                  onClick={handleAddMember}
                  >
                  ADD
                  </Button>
                </DialogActions>
              </Dialog>
    )
}

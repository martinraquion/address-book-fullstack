import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button'

export default function GroupDeleteDialog ({
  deleteopen,
  handleDeleteClose,
  handleDeleteGroup
}){
    return (
        <Dialog
        open={deleteopen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Remove  from your contacts?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You're about to delete from your contacts.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button  color="primary" autoFocus onClick={handleDeleteGroup}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
}

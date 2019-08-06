import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
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
  
}));

export default function AddDialog ({
    handleEditChange, 
    handleEditClose,
    editopen,
    editValues,
    handleEditContact
    // currentRow
}){
    const classes = useStyles();
    // const [open, setOpen] = useState(false);

    return (
        <Dialog open={editopen} onClose={handleEditClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
                  <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    EDIT CONTACT
                  </DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    
                  </DialogContentText> */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label="First name"
                        fullWidth
                        onChange={handleEditChange}
                        defaultValue={editValues.first_name}
                        // autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="last_name"
                        name="last_name"
                        label="Last name"
                        onChange={handleEditChange}
                        fullWidth
                        defaultValue={editValues.last_name}
                        // autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        onChange={handleEditChange}
                        defaultValue={editValues.email}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="mobile_phone"
                        name="mobile_phone"
                        label="Mobile Phone"
                        onChange={handleEditChange}
                        defaultValue={editValues.mobile_phone}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="home_phone"
                        name="home_phone"
                        label="Home Phone"
                        onChange={handleEditChange}
                        defaultValue={editValues.home_phone}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="work_phone"
                        name="work_phone"
                        label="Work Phone"
                        onChange={handleEditChange}
                        defaultValue={editValues.work_phone}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        onChange={handleEditChange}
                        defaultValue={editValues.city}
                        fullWidth
                        autoComplete="billing address-level2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                      id="state_or_province" 
                      name="state_or_province" 
                      label="State/Province/Region"
                      onChange={handleEditChange}
                      defaultValue={editValues.state_or_province}
                      fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="postal_code"
                        name="postal_code"
                        label="Zip / Postal code"
                        onChange={handleEditChange}
                        defaultValue={editValues.postal_code}
                        fullWidth
                        autoComplete="billing postal-code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        onChange={handleEditChange}
                        defaultValue={editValues.country}
                        fullWidth
                        autoComplete="billing country"
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button 
                  onClick={handleEditClose}
                  color="primary">
                    CANCEL
                  </Button>
                  <Button
                  onClick={handleEditContact}
              
                  
                  color="primary"
                  >
                   Edit
                  </Button>
                </DialogActions>
              </Dialog>
    )
}

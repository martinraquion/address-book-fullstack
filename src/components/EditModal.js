import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Create from '@material-ui/icons/CreateOutlined'
// import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



function getModalStyle(){
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 2, 2),
    outline: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  }
}));

export default function EditModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button type="button" >
        Open Modal
      </button> */}
      <Create onClick={handleOpen}/>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <span id="modal-title"
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0',  
            fontSize: 20,
          }}
          >EDIT CONTACT</span>
          {/* <hr /> */}
          <form className={classes.container}>
          <TextField
           id="standard-name"
           label="Last Name"
           className={classes.textField}
           margin="normal"
           />
           <TextField
           id="standard-name"
           label="First Name"
           className={classes.textField}
           margin="normal"
           />
             <TextField
           id="standard-name"
           label="Mobile Number"
           className={classes.textField}
           margin="normal"
           />
           <TextField
           id="standard-name"
           label="Home Number"
           className={classes.textField}
           margin="normal"
           />
            <TextField
           id="standard-name"
           label="Work Number"
           className={classes.textField}
           margin="normal"
           />
            <TextField
           id="standard-name"
           label="Email"
           className={classes.textField}
           margin="normal"
           />
            <TextField
           id="standard-name"
           label="City"
           className={classes.textField}
           margin="normal"
           />
            <TextField
           id="standard-name"
           label="State Or Province"
           className={classes.textField}
           margin="normal"
           />
            <TextField
           id="standard-name"
           label="Country"
           className={classes.textField}
           margin="normal"
           />
           <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            SAVE
          </Button>
           </form>
          
        </div>
      </Modal>
    </div>
  );
}
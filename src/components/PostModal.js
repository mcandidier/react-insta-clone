import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="bottom" ref={ref} {...props} />;
});

const useStyles = makeStyles( (theme) => ({
  btn_close: {
    position: 'absolute',
    top: '8px',
    right: '0'
  }
}));

export default function PostModal(props) {
  const {open, handleClickOpen, handleClose} = props;
  const classes = useStyles();
  const focusUsernameInputField = (input) => {
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  };

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Create Post"}
          <IconButton aria-label="close" onClick={handleClose} className={classes.btn_close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            <form>
            <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                inputRef={focusUsernameInputField}
            />
            </form>
        </DialogContent>
        <DialogActions>
          <Button fullWidth="true" variant="contained" onClick={handleClose} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
  );
}

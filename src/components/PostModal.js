import React from "react";
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

import PostForm from '../components/PostForm';
import API from '../api';

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

function PostModal(props) {
  const {open, handleClickOpen, handleClose, handlePostUpdate} = props;
  const classes = useStyles();
  const focusUsernameInputField = (input) => {
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  };

  const handleSubmit = (values) => {
    let formData = new FormData();
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    API.post('posts/', formData).then( resp => {
      handlePostUpdate(resp.data); // insert new object to posts array
      handleClose();
    });
  }

  
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
          <center>{"Create Post"}</center>
          <IconButton aria-label="close" onClick={handleClose} className={classes.btn_close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* insert post form here */}
          <PostForm onSubmit={handleSubmit}></PostForm>
        </DialogContent>
      </Dialog>
  );
}

export default PostModal;

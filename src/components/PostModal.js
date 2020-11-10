import React, {useEffect}from "react";
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
import { connect } from 'react-redux';

import PostForm from '../components/PostForm';

import {reset} from 'redux-form';


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

  const onClose = (dispatch) => {
    handleClose();
    props.resetForm();
  }

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
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
          <PostForm handleClose={onClose} handlePostUpdate={handlePostUpdate}></PostForm>
        </DialogContent>
      </Dialog>
  );
}



const mapDispatchToProps = dispatch => ({
  resetForm: () => {
      let image = document.getElementById('fileUpload');
      if(image.value) {
        image.value = null;
      }
      dispatch(reset('postForm'));

    }
 });

export default connect(null,mapDispatchToProps)(PostModal);
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Button, TextField, 
        Container, Avatar, Typography, Divider,
        List, ListItem, ListItemText 
}  from '@material-ui/core';
import { renderTextField, required } from '../common/form';
import { updateUserProfile, handleRemoveProfilePhoto } from '../redux/auth/actions';
import { SimpleDialog } from '../components';
import CONFIG from '../config';

import '../css/EditProfile.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(2, 4, 2, 4),
  },
  photo: {
    margin: theme.spacing(4, 0, 0, 4),
    display: "flex",
    alignItems: "center"
  },
  info: {
    marginLeft: "20px",
  },
  title: {
    marginLeft: "4px",
    fontWeight: "500"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
}));




function EditProfile(props) {
  const {handleSubmit, pristine, reset, user, submitting, updateUserProfile, handleRemoveProfilePhoto } = props;
  const classes = useStyles(); 
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const onSumbit = (values) => {
    updateUserProfile(values);
    reset();
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleRemovePhoto = () => {
    handleRemoveProfilePhoto();
  }

  const renderModalTemplate = () => {
    return <div>
      <Divider></Divider>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemText classes={classes.text} primary="Upload" />
          </ListItem>
          <ListItem button onClick={handleRemovePhoto}>
            <ListItemText classes={classes.text}  primary="Remove Photo" />
          </ListItem>
          <ListItem button onClick={()=> handleClose()}>
            <ListItemText classes={classes.text} secondary="Cancel"/>
          </ListItem>
        </List>
      </div>
    </div>
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Grid container spacing={1}>
          {typeof user.email =='undefined' ?
            <p>loading...</p>
          :
          <div className={classes.form}>
          <Grid item xs={12} className={classes.photo}>
            <Avatar src={CONFIG.apiHost + user.profile_photo} className={classes.large}>{user.username}</Avatar>
            <div>
            <Typography variant="h6" className={classes.title}>{user.username}</Typography>
            <div className="break"></div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Change profile photo</Button>
            </div>
          </Grid>
          <form onSubmit={handleSubmit(onSumbit)} className={classes.form} noValidate>
            <Grid item xs={12}>
              <Field
              name="email"
              component={renderTextField}
              label="Your email address"
              type="email"
              validate={[required]}
              fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
              name="username"
              component={renderTextField}
              label="Username"
              fullWidth
              validate={[required]}
              />
            </Grid>
            <Grid item sm={12}>
              <Field
              name="first_name"
              component={renderTextField}
              label="First Name"
              validate={[required]}
              fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
              name="last_name"
              component={renderTextField}
              label="Last Name"
              validate={[required]}
              fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
              name="bio"
              component={renderTextField}
              label="Bio"
              fullWidth
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pristine || submitting}>
                Submit
            </Button>
          </form>
          </div>
          }
      </Grid>
      </Container>
      <SimpleDialog title="Change profile photo" selectedValue={selectedValue} open={open} onClose={handleClose} template={renderModalTemplate} />
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {user} = state;
  const initialValues = (({ first_name, last_name, email, bio, username }) => ({ first_name, last_name, email, bio, username}))(state.user)
  return {user, initialValues}
}

EditProfile = reduxForm({
  form: 'editProfileForm',
  enableReinitialize : true // you need to add this property
})(EditProfile)

export default connect(
  mapStateToProps, {
    updateUserProfile,
    handleRemoveProfilePhoto
  }
)(EditProfile)
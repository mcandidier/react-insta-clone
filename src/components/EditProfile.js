import React, { useEffect, setState } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Button, TextField, Container }  from '@material-ui/core';
import { renderTextField, required } from '../common/form';

import { updateUserProfile } from '../redux/auth/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(6, 4),
  },
}));



function EditProfile(props) {
  const {handleSubmit, pristine, reset, user, submitting, updateUserProfile } = props;
  const classes = useStyles(); 
  
  const onSumbit = (values) => {
    updateUserProfile(values);
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        {typeof user.email =='undefined' ?
          <p>loading...</p>
        :
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
        }
    </Grid>
    </Container>
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
    updateUserProfile
  }
)(EditProfile)

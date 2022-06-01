import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { renderTextField,required } from '../common/form';
import { handleChangePassword } from '../redux/auth/actions';
import { map } from 'lodash/map';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    margin: theme.spacing(8, 4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function ChangePassword(props) {
  const classes = useStyles(); 
  const {handleSubmit, pristine, reset, user, submitting, handleChangePassword, token} = props;
  const [success, setSuccess] = useState(false)

  const onSubmit = values => {
    Object.assign(values, {'token': token});
    console.log(values);
    return handleChangePassword(values).then( resp => {
      reset();
      setSuccess(true);
    }, (err) => {
      throw new SubmissionError(err.response.data);
    });
  }

  return (
    <Grid contianer className={classes.root}>
        <div className={classes.paper}>
        {success && <Alert severity="success">Your password has been successfully change.</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field
                name="password"
                component={renderTextField}
                label="Password"
                validate={[required]}
                type="password"
              />
              <Field
                name="confirm_password"
                component={renderTextField}
                label="Confirm Password"
                validate={[required]}
                type="password"
              />
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Update
              </Button>
            </form>
        </div>
    </Grid>
  )
}

ChangePassword = reduxForm({
  form: 'changePassword',
})(ChangePassword)

export default connect(null, {
  handleChangePassword,
})(ChangePassword)
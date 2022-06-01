import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { renderTextField,required } from '../common/form';
import { resetPassword } from '../redux/auth/actions';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ForgotPassword(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, resetPassword} = props;  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const remoteError = (err) => {
    throw new SubmissionError(err)
  }

  const onSubmit = values => {
    return resetPassword(values).then( resp => {
      console.log('success')
      setIsSubmitted(true);
    }, (err) => {
      remoteError(err.response.data);
    });
  }

  return (
    <React.Fragment>
      <Nav></Nav>
      <Container maxWidth="xs">
      { isSubmitted &&
        <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Great, we shot you an email to make sure it's really you.
        </Alert>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
      <Field
          validate={[required]}
          label="Email Address"
          name="email"
          autoFocus
          component={renderTextField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset your password
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/login">
              Back to Login
            </Link>
          </Grid>
        </Grid>
        </form>
      </Container>
    </React.Fragment>
  )
}

ForgotPassword = reduxForm({
  form: 'forgotPassword',
})(ForgotPassword);

export default connect(null, {
  resetPassword,
})(ForgotPassword);

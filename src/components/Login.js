import React from 'react';
import { connect } from 'react-redux';

import { renderTextField, required } from '../common/form';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';


function Login(props) {
  const { handleSubmit, pristine, reset, submitting, classes} = props;
  const onSubmit = (values) => {
      console.log(values);
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="email"
        component={renderTextField}
        label="Your email address"
        type="email"
        validate={[required]}
      />
      <Field
        name="password"
        component={renderTextField}
        label="Your password"
        type="password"
        validate={[required]}
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm', // unique identifier
})(Login);


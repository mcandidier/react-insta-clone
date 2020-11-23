import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, required } from '../common/form';
import Button from '@material-ui/core/Button';


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    const {password, confirm_password} = values;
    if(confirm_password !== password) {
      throw { confirm_password: 'Password mismatch!' }
    }
  })
}


function Register(props) {
  const { handleSubmit, pristine, reset, submitting, classes} = props;
  const onSubmit = values => {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="email"
        component={renderTextField}
        type="email"
        validate={required}
        label="Your email address"
        />
        <Field
        name="password"
        component={renderTextField}
        type="password"
        validate={required}
        label="password"
        />
        <Field
        name="confirm_password"
        component={renderTextField}
        type="password"
        validate={required}
        label="confirm password"
        />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  )
}

Register  = connect(
  null, {
  }
)(Register)

export default reduxForm({
  form: 'registerForm', // a unique name for this form
  asyncValidate,
  asyncChangeFields: ['confirm_password']
})(Register);
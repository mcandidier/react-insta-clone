import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


function Register(props) {
  const { handleSubmit, pristine, reset, submitting, classes} = props;

  return (
    <div>
      <h1>Register Now</h1>
    </div>
  )
}


Register  = connect(
  null, {
  }
)(Register)

export default reduxForm({
  form: 'registerForm' // a unique name for this form
})(Register);
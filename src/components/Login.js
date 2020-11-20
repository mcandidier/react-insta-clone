import React, {useState} from 'react';
import { connect } from 'react-redux';

import { renderTextField, required } from '../common/form';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import { handleLogin } from '../redux/auth/actions';


function Login(props) {
  const { handleSubmit, pristine, reset, handleLogin} = props;
  const [ hasError, setHasError ] = useState(false);

  const onSubmit = (values) => {
      handleLogin(values);
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
      { hasError ? <p>Unable to log in with provided credentials.</p> : ''}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  )
}

Login = connect(
  null, {
    handleLogin,

  }
)(Login);

export default reduxForm({
  form: 'loginForm' // a unique name for this form
})(Login);
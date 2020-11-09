import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import API from '../api';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (

  <TextField label={label}
    helperText={touched && error}
    fullWidth
    {...input}
    {...custom}
  />
)

const validate = values => {
  const errors = {}
  const requiredFields = ['description', 'image']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  return errors
}

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      id="fileUpload"
      {...props.input}
      {...props}
    />
  );
};


function PostForm(props) {
  console.log(props)
  const { handleSubmit, pristine, reset, submitting, handleClose, handlePostUpdate} = props; 

  const onSubmit = (values) => {
    let formData = new FormData();
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    API.post('posts/', formData).then( resp => {
     handlePostUpdate(resp.data); // insert new object to posts array
     handleReset();
     handleClose();
    });
  }

  const handleReset = () => {
    reset();
    let image = document.getElementById('fileUpload')
    if(image.value) {
      image.value = null;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          name="description"
          component={renderTextField}
          label="Write caption"
        />
      </div>
      <div>
        <label>Upload image</label>
        <Field
          name="image"
          type="file"
          component={FileInput}
        />
      </div>
      <Button type="submit" fullWidth="true" variant="contained" color="primary" disabled={submitting}>Post</Button>
    </form>
  )
}


export default reduxForm({
    form: 'postForm', // unique identifier
    validate,
    asyncBlurFields: [ 'description', 'image'],
})(PostForm);
import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import API from '../api';
import { createPost } from '../actions';

import { renderTextField, required } from '../common/form';


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
  const [count, setCount] = useState(0);
  const { handleSubmit, pristine, reset, submitting, classes, handlePostUpdate, handleClose } = props;


  const onSubmit = async (values) => {

    let formData = new FormData();
    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    try {
      const res = await createPost(formData);
      handlePostUpdate(res.data); // insert new object to posts array
      handleClose();
    } catch (error) {
      console.log('error');
    }
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
          validate={[required]}
        />
      </div>
      <div>
        <label>Upload image</label>
        <Field
          name="image"
          type="file"
          component={FileInput}
          validate={[required]}
        />
      </div>
      <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
    </form>
  )
}


export default reduxForm({
  form: 'postForm', // unique identifier
})(PostForm);
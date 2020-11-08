import React from 'react';
import Button from "@material-ui/core/Button";

import { Field, reduxForm } from 'redux-form';


function fileField({input, type, meta}){
  
  const handleChange = (e, input) => {
    e.preventDefault()
    console.log('event changed');
    let imageFile = e.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }

  };

  return (
    <div>
      <input
        name={input.name}
        type={type}
        onChange={event => handleChange(event, input)}
      />
    </div> 
  )
};


function submit(values) {
  console.log(values);
}


function PostForm(props) {
  const { handleSubmit, pristine, reset, submitting } = props;
  
  return (
    <form onSubmit={handleSubmit}>
          <div>
            <label></label>
            <div>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder="Write caption"
              />
            </div>
            <div>
              <label>Upload image</label>
              <div>
                <Field
                  name="image"
                  component={fileField}
                  type="file"
                />
              </div>
            </div>
          </div>
          <Button fullWidth="true" variant="contained" color="primary" type="submit">Post</Button>
      </form>
  )
}

export default reduxForm({
    form: 'postForm',
})(PostForm);
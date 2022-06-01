import React, {usesState} from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, required } from '../common/form';
import Button from '@material-ui/core/Button';


const CommentForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, postId } = props;

  const handleOnSumbit = (e) => {
    e.preventDefault();
    handleSubmit();
    reset();
  }

  return (
    <div className="app__comment_form">
      <form onSubmit={handleOnSumbit}>
        <Field
          name="text"
          component={renderTextField}
          type="text"
          validate={[required]}
          placeholder="Add a comment"
          
        />
        <Button variant="contained" type="submit" disabled={pristine || submitting} color="primary">Post</Button>
      </form>
    </div>
  )
}




export default reduxForm({
  form: 'CommentForm',
  enableReinitialize : true // you need to add this property
})(CommentForm);
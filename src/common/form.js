import TextField from '@material-ui/core/TextField';

export const required = value => value ? undefined : 'Required'

export const renderTextField = ({
  label,
  input,
  type,
  meta: { touched, invalid, error },
  ...custom
  }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    type={type}
    {...input}
    {...custom}
  />
)

export const validate = values => {
  console.log(values, 'values')
  const errors = {}
  const requiredFields = [
    'description',
    'image'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

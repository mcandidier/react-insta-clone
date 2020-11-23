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

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

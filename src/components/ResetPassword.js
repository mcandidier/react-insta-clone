import React from 'react';
import Container from '@material-ui/core/Container';
import { ChangePassword, Nav } from '../components';


function ResetPassword(props) {
  return (
    <React.Fragment>
    <Nav></Nav>
    <Container maxWidth="xs">
      <ChangePassword></ChangePassword>
    </Container>
    </React.Fragment>
  )
}


export default ResetPassword;
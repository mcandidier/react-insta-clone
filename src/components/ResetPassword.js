import React from 'react';
import Container from '@material-ui/core/Container';
import { ChangePassword, Nav } from '../components';


function ResetPassword(props) {
  const {token} = props.match.params;
  console.log(token);
  return (
    <React.Fragment>
    <Nav></Nav>
    <Container maxWidth="xs">
      <ChangePassword token={token}></ChangePassword>
    </Container>
    </React.Fragment>
  )
}


export default ResetPassword;
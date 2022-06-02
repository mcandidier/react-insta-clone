import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { EditProfile, ChangePassword } from '../components';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '85vh',
    margin: theme.spacing(4, 2),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));


function Settings(props) {
  const location = props.location;
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [orientation, setOrientation] = useState('vertical');
  


  if(location.pathname === '/settings/') {
    history.push('/settings/profile/');
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    return <Tabs
      variant="fullWidth"
      orientation={orientation}
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      className={classes.tabs}
      initialSelectedIndex={0}>
      <Tab label="Edit Profile" component={Link} to="/settings/profile/" />
      <Tab label="Change Password" component={Link} to="/settings/change_password/" />
    </Tabs>
  }
  
  useEffect(() => {
    if(props.width === 'xs'){
      setOrientation('horizontal');
    } else {
      setOrientation('vertical');
    }
  }, [orientation, renderTabs]);


  return (
    <div>
    <Container maxWidth="md">
      <Grid className={classes.root}>
        {renderTabs()}
        <Switch>
          <Route path="/settings/profile/" component={EditProfile} />
          <Route path="/settings/change_password/" component={ChangePassword} />
        </Switch>
      </Grid> 
  </Container>
  </div>
  );
}

export default withWidth()(Settings)
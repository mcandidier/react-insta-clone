import React from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import SettingsIcon from '@material-ui/icons/Settings';
import { getUserCollections } from '../redux/posts/actions';

import { CollectionItem } from '../components';

import CONFIG from '../config';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // boxShadow: '0 0 black',
    color: theme.palette.text.secondary,
  },
  large: {
    width: '150px',
    height: '150px',
  }
}));

function Profile({user, collections}) {
  const username = user.username ? user.username: user.email;
  const fullname = `${user.first_name} ${user.last_name}`
  const classes = useStyles();
  const post = collections[0];


  const renderItems = () => {
    return collections.map( (item, index) => 

      <Grid item xs={4}>
        <CollectionItem key={index} post={item}></CollectionItem>
      </Grid>
    );    
  }

  return (
    <div className="app__profile">
      <Container maxWidth="md">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Avatar alt={user.username} 
                src={`${CONFIG.apiHost}${user.profile_photo}`} 
                className={classes.large}/>
            </Grid>
            <Grid item xs={9}>
              <div className="user-info">
                <h3>{username}</h3>
                <Button variant="outlined">Edit Profile <SettingsIcon/></Button>
                <ul>
                    <li><span>{collections.length}</span> posts</li>
                    <li><span>{user.followers}</span>{user.followers == 1? ' follower': ' followers'}</li>
                    <li><span>{user.following}</span> following</li>
                </ul>

                <div>
                  <h4>{fullname}</h4>
                  <br/>
                  <p>{user.bio}</p>
                </div>

              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {renderItems()}
          </Grid>
        </div>
      </Container>
    </div>
    )
}

const mapStateToProps = (state, ownProps) => {
  const {user, collections} = state;
  return {user, collections}
}

const mapDispatchToProps = (dispatch) => {
  dispatch(getUserCollections());
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
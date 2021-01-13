import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import SettingsIcon from '@material-ui/icons/Settings';
import { getUserCollections } from '../redux/posts/actions';
import { getUserProfile, followUser, unFollowUser } from '../redux/auth/actions';
import find from 'lodash/find';
import remove from 'lodash/remove';

import { CollectionItem } from '../components';

import CONFIG from '../config';
import { Redirect, useHistory } from 'react-router-dom';


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

function Profile(props) {
  const {collections, profile, user, followUser, unFollowUser } = props;
  const classes = useStyles();
  const history = useHistory();
  const {username} = props.match.params;
  const [isFollowing, setIsFollowing] = useState(false); 
  const {following} = user;

  useEffect(() => {
    let res = find(following, (n)=> {
      if(n == profile.id) {
        setIsFollowing(true);
        return true;
      } else {
        setIsFollowing(false);
      }
    });
  }, [profile]);
  

  const handleFollow = () => {
    followUser(username);
    setIsFollowing(true);
    profile.followers.splice(0, 0, user.id);
  }

  const handleUnFollow = () => {
    unFollowUser(profile.id)
    setIsFollowing(false);

    remove(profile.followers, (userId) => {
      return userId != profile.id;
    });
  }

  const renderProfile = () => {
    return <Container maxWidth="md" key={profile.username}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Avatar alt={profile.username} 
                src={`${CONFIG.apiHost}${profile.profile_photo}`} 
                className={classes.large}/>
            </Grid>
            <Grid item xs={9}>
              <div className="user-info">
                <h3>{profile.username}</h3>
                { profile.username == user.username ?
                  <Button variant="outlined" onClick={() => history.push('/settings/profile/') }>Edit Profile<SettingsIcon/></Button>
                : 
                <Button variant="contained" color="primary" onClick={isFollowing ? handleUnFollow : handleFollow}>{ isFollowing? 'Unfollow': 'Follow'}</Button>
                }
                <ul>
                    <li><span>{collections.length}</span> posts</li>
                    <li><span>{profile.followers?.length}</span>{profile.followers?.length == 1? ' follower': ' followers'}</li>
                    <li><span>{profile.following?.length}</span> following</li>
                </ul>
                <div>profile
                  <h4>{profile.first_name + ' ' + profile.last_name}</h4>
                  <br/>
                  <p>{profile.bio}</p>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {renderItems()}
          </Grid>
        </div>
      </Container>
  }

  const renderItems = () => {
    return collections.map( (item, index) => 
      <Grid item xs={4}>
        <CollectionItem key={index} post={item}></CollectionItem>
      </Grid>
    ); 
  }

  return (
    <div className="app__profile">
       { profile && renderProfile() }
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {profile, user, collections} = state;
  const { username } = ownProps.match.params;
  return { profile, collections, user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {username} = ownProps.match.params;
  dispatch(getUserProfile(username));
  dispatch(getUserCollections(username));
  return {
    followUser: username => dispatch(followUser(username)),
    unFollowUser: id => dispatch(unFollowUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
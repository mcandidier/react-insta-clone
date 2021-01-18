import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CONFIG from '../config';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { Divider } from '@material-ui/core';
import { likePost } from '../actions';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  }
}));

function SinglePost(props) {
  const classes = useStyles();
  const obj = props.post;
  const [post, setPost ] = useState(obj);
  const username = post.user.username ? post.user.username : post.user.email;
  const timestamp = moment(post.timestamp, "YYYYMMDD").fromNow();

  const handleLike = async () => {
    let action = post.is_like? 'unlike': 'like';
    const data = {'id': post.id, 'action': action}
    try {
      const res = await likePost(data);
      setPost({...obj, 'is_like': !post.is_like});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxWidth="md" className={`app__single_post ${classes.root}`}>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <div class="img-section">
              <img src={CONFIG.apiHost+post.image}/>
            </div>
        </Grid>
        <Grid item xs={4}>
          <section className="header">
            <Avatar alt={username} src={CONFIG.apiHost+post.user.profile_photo}>{username.slice(0, 1)}</Avatar>
            <h4>{username}</h4>
          </section>
          <Divider></Divider>
          <section className="comments">
            <ul>
              <li>Comment 3</li>
              <li>Comment 2</li>
              <li>Comment 1</li>
            </ul>
          </section>
          <Divider></Divider>
          <section className="actions">
            <ul>
              <li>
              <Icon fontSize="default" 
                onClick={handleLike}>{post.is_like ? 'favorite': 'favorite_outlined'}</Icon>
              </li>
              <li>
                <Icon fontSize="default">bookmark_border</Icon>
              </li>
            </ul>
            <span className="counter">{post.like_count} likes</span>
            <p className="timestamp">
            <small className="timestamp">
              {timestamp}
            </small>
            </p>
          </section>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SinglePost;
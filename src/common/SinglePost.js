import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import CONFIG from '../config';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';

import { likePost } from '../actions';
import moment from 'moment';
import CommentForm from '../components/CommentForm';

import { commentList, addComment} from '../redux/posts/actions';
import { Comment } from '../components';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    padding: theme.spacing(0),
    margin: theme.spacing(0)
  }
}));

function SinglePost(props) {
  const classes = useStyles();
  const obj = props.post;
  const user = props.user;
  const [post, setPost ] = useState(obj);
  const username = post.user.username ? post.user.username : post.user.email;
  const timestamp = moment(post.timestamp, "YYYYMMDD").fromNow();
  const [comments, setComments] = useState([]);
  const history = useHistory();

  console.log('user', user);

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

  const gotoPost = () => {
    history.push({
      pathname: `/p/${obj.id}/`,
    })
  }

  const handleSubmit = (values)=> {
    addComment(post.id, values, insertNewComment);
  }

  const insertNewComment = comment => {
    setComments(comments.concat(comment));
  }

  const deletePost = post => {
    alert('archived')
  }

  useEffect(() => {
    if(comments.length === 0) {
      commentList(post.id).then( resp => {
        setComments(resp.data);
      });
    }
  }, [user]);

  return (
    <Container maxWidth="md" className={`app__single_post ${classes.root}`}>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <div className="img-section">
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
            <List className={classes.list} subheader={<li />}>
              { comments.map((comment, index) => 
                <Comment key={index} comment={comment}/>
              )
              }
            </List>
          </section>
          <Divider></Divider>
          <section className="actions">
            <ul>
              <li>
              <Icon fontSize="default" 
                onClick={handleLike}>{post.is_like ? 'favorite': 'favorite_outlined'}</Icon>
              </li>
              {/* { post.user?.id === user.id &&
                <li>
                  <Icon fontSize="default" onClick={() => {deletePost(post)}}>delete_outlined</Icon>
                </li>
              } */}
            </ul>
            <span className="counter">{post.like_count ? `${post.like_count} likes` : 'Be the first one to like.' }</span>
            <p className="timestamp">
            <small className="timestamp">
              {timestamp}
            </small>
            </p>
          </section>
          <section className="form">
            <CommentForm postId={post.id} onSubmit={handleSubmit} />
          </section>
        </Grid>
      </Grid>
    </Container>
  )
}


const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {user}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

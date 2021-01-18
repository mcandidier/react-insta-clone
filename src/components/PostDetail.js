import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Post, SinglePost } from '../components';
import { getPostDetail } from '../redux/posts/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
  },
}));


function PostDetail(props) {
  const {postId} = props.match.params;
  const [post, setPost] = useState(null);
  const classes = useStyles();

  const callback = (data) => {
    setPost(data);
  }

  useEffect(() => {
    if(!post) {
      getPostDetail(postId, callback);
    }
  }, [post]);

  return (
    <div className={classes.root}>
      {post && <SinglePost post={post}></SinglePost>}
    </div> 
  )
}

const mapStateToProps = (state, ownProps) => {
  return { }
}

export default connect(mapStateToProps, {
  getPostDetail,
})(PostDetail);
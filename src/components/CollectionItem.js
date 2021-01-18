import React, { useState } from 'react';
import CONFIG from '../config';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Icon from '@material-ui/core/Icon';
import { SimpleDialog, Post } from '../components';

import ModeCommentIcon from '@material-ui/icons/ModeComment';
const item = btoa(Math.random()).substr(10, 5);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '293px',
    position: 'relative',
    cursor: 'pointer'
  },
  item: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  white: {
    color: '#fff'
  }
}));

function CollectionItem({post}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleModalPost = () => {
    setOpen(true);
  }
  
  const handleClose = (value) => {
    setOpen(false);
  };
  
  const renderModalTemplate = () => {
    return <Post obj={post} />
  }

  return (
    <div className={`${classes.root} gallery-item`} onClick={handleModalPost}>
      <img className={classes.item} src={CONFIG.apiHost+ post.image}/>
      <div class="gallery-item-info">
        <ul>
        <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span>
          <Icon className={classes.white} size="small">favorite</Icon>
        <span>{post.like_count}</span>
        </li>
        <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span>
        <Icon className={classes.white} size="small">chat</Icon>
        <span>1</span></li>
        </ul>
      </div>
      <SimpleDialog title={post.description} open={open} onClose={handleClose} template={renderModalTemplate} />
  </div>
  )
}

export default connect(null, {})(CollectionItem);
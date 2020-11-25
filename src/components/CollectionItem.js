import React from 'react';
import CONFIG from '../config';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

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
  }
}));

function CollectionItem({post}) {
  const classes = useStyles();
  return (
    <div className={`${classes.root} gallery-item`}>
       <img className={classes.item} src={CONFIG.apiHost+ post.image}/>
       <div className="gallery-item-info"></div>
    </div>
  )
}

export default connect(null, {})(CollectionItem);
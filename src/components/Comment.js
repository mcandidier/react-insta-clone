import React, { useState, useEffect }from 'react';
import {connect} from 'react-redux';
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';

import { getUserInfo } from '../redux/auth/actions';
import CONFIG from '../config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'hidden',
    maxHeight: 300,
    paddingLeft: 0,
    paddingRight: 0,

  },
  inline: {
    display: 'inline',
  },
}));


function Comment({comment}) {
  const classes = useStyles();

  return (
      <ListItem alignItems="flex-start" className={classes.root}>
        <ListItemAvatar>
          <Avatar alt={comment.user.username} 
          src={`${CONFIG.apiHost}${comment.user.profile_photo}`} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.user.username}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {comment.text}
            </React.Fragment>
          }
        />
      </ListItem>
  )
}


const mapStateToProps = (state) => {

  return {

  }
}

export default connect()(Comment);
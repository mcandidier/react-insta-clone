import React, { useState }from 'react';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    }
}));


function Nav({handleClickOpen}) {
    const classes = useStyles();
    return (
        <div className="app__header">
            <div className="left">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram logo"/>
            </div>
            <div className="nav-center">
                <form>
                    <input type="search" placeholder="search"></input>
                </form>

            </div>
            <div className="nav-right">
                <Icon className="material-icons-outlined" onClick={handleClickOpen}>add_circle_outline</Icon>
                <Icon className="material-icons-outlined">home</Icon>
                <Icon className="material-icons-outlined">favorite-border</Icon>
                <Avatar alt="user" className={classes.small}></Avatar>
            </div>
        </div>
    )
}

export default Nav;
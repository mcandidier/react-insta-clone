import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../redux/auth/actions';

import '../App.css';
import CONFIG from '../config';

import { makeStyles } from '@material-ui/core/styles';
import {  PostModal } from '../components';

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
    },
    paper: {
        marginTop: '40px',
        marginRight: '40px',
    },
    reset: {
      textDecoration: 'none',
      color: '#000',
    }
}));
 
function Nav({user, handleLogout}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const openMenu = Boolean(anchorEl);
    const [open, setOpen] = useState(false);
    const profileLink = `/${user.username}/`

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const onLogout = () => {
      handleLogout();
      history.push('/');
    }
    const gotoHome = () => {
      history.push('/');
    }

    const gotoProfile = () => {
      history.push(profileLink);
      handleMenuClose();
    }

    const gotoLikes = () => {
      history.push('/likes/');
    }

    const gotoSettings = () => {
      history.push('/settings/profile/');
      handleMenuClose();
    }

    const navTemplate = () => {
      if(user.loggedIn) {
        return <React.Fragment>
                <div className="nav-center">
                  <form>
                    <input type="search" placeholder="search"></input>
                  </form>

                </div>
                <div className="nav-right">
                  <Icon className="material-icons-outlined" onClick={handleClickOpen}>add_circle_outline</Icon>
                  <Icon className="material-icons-outlined" onClick={gotoHome}>home</Icon>
                  <Icon className="material-icons" onClick={gotoLikes}>favorite_border_outlined</Icon>
                  <Avatar
                    alt={user.email}
                    className={classes.small}
                    onClick={handleClick}
                    src={`${CONFIG.apiHost}${user.profile_photo}`}
                  />

                  <div>
                      <Menu
                          id="fade-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={openMenu}
                          onClose={handleMenuClose}
                          className={classes.menu}
                      >
                          <MenuItem>
                            <Link className={classes.reset} onClick={gotoProfile}>Profile</Link>
                          </MenuItem>
                          <MenuItem>
                            <Link className={classes.reset} to="settings/profile/" onClick={gotoSettings}>Settings</Link>
                          </MenuItem>
                          <Divider light />
                          <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
                      </Menu>
                  </div>
                </div>
                <PostModal open={open} handleClose={handleClose}></PostModal>
            </React.Fragment>
      }
    }
  
    return (
        <div className="app__header">
            <div className="left">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram logo" />
            </div>
            {navTemplate()}
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
  const {user} = state;
  return {user}
};

export default connect(mapStateToProps, {
  handleLogout,
})(Nav);
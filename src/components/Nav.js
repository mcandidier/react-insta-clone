import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import { handleLogout } from '../redux/auth/actions';

import '../App.css';

import CONFIG from '../config';

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
    },
    paper: {
        marginTop: '40px',
        marginRight: '40px',
    }
}));
 
function Nav(props) {
    const classes = useStyles();
    const { handleLogout, handleClickOpen, user } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(CONFIG.apiHost + user.profile_photo)
      
    return (
        <div className="app__header">
            <div className="left">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram logo" />
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
                        open={open}
                        onClose={handleClose}
                        className="menu"
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <Divider light />
                        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                    </Menu>
                </div>
                
            </div>
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
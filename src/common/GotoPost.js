import React, {useState} from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {IconButton, Menu, MenuItem} from '@material-ui/core';



function GotoPost({gotoPost}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="btn-dropdown">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          >
          <MoreHorizIcon />
        </IconButton>
      </div>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={gotoPost}>Go to post</MenuItem>
      </Menu>
  </div>
  ) 
}

export default GotoPost;
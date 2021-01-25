import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    paddingTop: 0,
    padding: theme.spacing(0),
    border: 0,
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}));

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, template, title, show_title } = props;
  const [scroll, setScroll] = React.useState('paper');

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <div className="app__modal">
      <Dialog 
        maxWidth="md"
        className={`${classes.root}`}
        onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        { show_title && <DialogTitle id="simple-dialog-title">{title}</DialogTitle> }
        <DialogContent className={classes.root}>
            {template()}
        </DialogContent>
      </Dialog>
    </div> 
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

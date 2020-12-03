import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    margin: theme.spacing(8, 4),
  }
}));


export default function ChangePassword() {
  const classes = useStyles(); 

  return (
    <Grid contianer className={classes.root}>
        <div className={classes.paper}>
            Change Password
        </div>
    </Grid>
  )
}
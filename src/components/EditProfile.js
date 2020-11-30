import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid}  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    margin: theme.spacing(8, 4),
  }
}));

export default function EditProfile() {

  const classes = useStyles(); 
  return (
    <Grid contianer className={classes.root}>
        <div className={classes.paper}>

        </div>
    </Grid>

  )
}
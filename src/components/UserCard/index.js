import React from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';

import { msToTime, timeToMs } from '../../services/dateHelper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

const UserCard = ({time, startTime, endTime, buttonText, handler, type}) => {
  const classes = useStyles();

  let pauseSum = '00:00';
  if(typeof time !== 'string') {
    pauseSum = time.reduce((acc, curr) => {
        return msToTime(timeToMs(acc)+timeToMs(curr));
    });
  }

   let isDisabled = true;
   if(type === 'startTime' && time === '--:--') isDisabled = false;
   else if(type === 'endTime' && time !== '--:--') isDisabled = true;
   else if(type === 'endTime' && startTime !=='--:--') isDisabled = false;
   else if(type === 'pause' && endTime !== '--:--') isDisabled = false;
   else if(type === 'dinner' && time === '--:--') isDisabled = false;
   else isDisabled = true;

    return (
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">{(pauseSum !== '00:00') ? pauseSum : time}</Typography>
          <Button disabled={isDisabled} variant="outlined" color="primary" onClick={handler}>{buttonText}</Button> 
        </Paper>
      </Grid>
    )
}

export default UserCard;
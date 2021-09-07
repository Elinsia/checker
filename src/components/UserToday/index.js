import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { userCame, userGone, userTodayInfo, userMeal, userContinue } from '../../redux/actions/user/userActions';

import { makeStyles } from '@material-ui/core/styles';
import UserCard from '../UserCard';

const useStyles = makeStyles((theme) => ({
  root : {
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

const UserToday = () => {
  const classes = useStyles();

  const todayInfo = useSelector(state => state.user.todayInfo);

  const dispatch = useDispatch();

  const handlerCame = () => {
    dispatch(userCame());
  }
  const handlerGone = () => {
    dispatch(userGone());
  }
  const handlerDinner = () => {
    dispatch(userMeal());
  }
  const handlerContinue = () => {
    dispatch(userContinue(todayInfo.endTime));
  }

  useEffect(()=> {
    dispatch(userTodayInfo());
  }, [dispatch]);

  const cards = [
        {
          time: todayInfo.startTime,
          buttonText: 'Я на работе 👨‍💻',
          handler: handlerCame,
          type: 'startTime'
        },
        {
          time: todayInfo.endTime,
          startTime: todayInfo.startTime,
          buttonText: 'Я домой 🏃',
          handler: handlerGone,
          type: 'endTime'
        },
        {
          time: todayInfo.dinner,
          startTime: todayInfo.startTime,
          buttonText: 'Работаю в обед 🥪',
          handler: handlerDinner,
          type: 'dinner'
        },
        {
          time: todayInfo.pause,
          endTime: todayInfo.endTime,
          buttonText: 'Продолжить работу 🦾',
          handler: handlerContinue,
          type: 'pause'
        },
    ];

    return (
        <>
          <Grid container spacing={2} className={classes.root}>
            { cards.map((card, id) =>  {
            return <UserCard 
                      key={id}
                      time={card.time}
                      startTime={card.startTime}
                      endTime={card.endTime}
                      buttonText={card.buttonText} 
                      handler={card.handler}
                      type={card.type ? card.type : null}
                    />
          })}
          </Grid>
        </>
    )
}

export default UserToday;
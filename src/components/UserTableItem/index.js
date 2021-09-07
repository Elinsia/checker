import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { toValidTime, msToTime, timeToMs } from '../../services/dateHelper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  red: {
    color: '#d32f2f'
  },
  green: {
    color: '#388e3c'
  },
}));

const UserTable = ({date, startTime, endTime, dinner = '00:00', pause = ['00:00']}) => {

    const classes = useStyles();
    const _workTime = 9*60*60000; // 9 рабочих часов в миллисекундах
    
    let pauseSum = pause.reduce((acc, curr) => {
        return msToTime(timeToMs(acc)+timeToMs(curr));
    });

    let diff = Math.abs(toValidTime(endTime) - toValidTime(startTime)),
        validDinner = timeToMs(dinner),
        validPause = timeToMs(pauseSum),
        total,
        overtime,
        result;

    if(isNaN(diff)) { 
        total = '--:--';
        overtime = 0;
        result  = '--:--';
    } else {
        total = msToTime(diff);
        overtime = ((diff - _workTime) + validDinner) - validPause;
        result =  msToTime(Math.abs(overtime));
    }

    let styledCell, withText;
    if(overtime > 0 && overtime !==0) { // Если овертайм негативный или равен нулю - то недоработал
       styledCell = classes.green;
       withText = 'Переработка';
    } else if (result === '--:--') {
        styledCell = classes.red;
        withText = 'Нет данных';
    } else {
        styledCell = classes.red;
        withText = 'Недоработка';
    }
  
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {date}
            </TableCell>
            <TableCell aria-label="Start time" align="left">{startTime}</TableCell>
            <TableCell aria-label="End time" align="left">{endTime}</TableCell>
            <TableCell className={styledCell} aria-label="Total" align="left">
                {total}
            {(validDinner > 0) ? ` + ${msToTime(validDinner)} 🥪` : ''}
            {(validPause > 0) ? ` - ${msToTime(validPause)} ⏸️` : ''}
            </TableCell>
            <TableCell className={styledCell} aria-label="Result" align="left">{withText} {result}</TableCell>
        </TableRow>
    )
}

export default UserTable;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import UserTableItem from '../UserTableItem';

import { userAllDates } from '../../redux/actions/user/userActions';

const UserTable = () => {

  let dates = useSelector(state => state.user.allDates);
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(userAllDates());
  }, [dispatch]);
  
    return (
        <>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell align="left">Пришел</TableCell>
                  <TableCell align="left">Ушел</TableCell>
                  <TableCell align="left">Всего часов</TableCell>
                  <TableCell align="left">Результат</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(dates) ?
                  dates.map((date, id) =>
                    (
                      <UserTableItem
                        key={date.date}
                        date={date.date}
                        startTime={date.time.startTime}
                        endTime={date.time.endTime}
                        dinner={date.time.dinner}
                        pause={date.time.pause}
                      />
                    ))
                :null}
                
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}

export default UserTable;
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import UserToday from '../UserToday';
import UserTable from '../UserTable';

import Header from '../Header';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const Main = () => {
  const classes = useStyles();
  
    return (
        <>
          <Header />
          <Container className={classes.root} maxWidth="lg">
            <Typography className={classes.title} variant="h5">
              Today: {new Date().toLocaleDateString()}
            </Typography>
            <UserToday />
            <UserTable />
          </Container>
        </>
    )
}

export default Main;
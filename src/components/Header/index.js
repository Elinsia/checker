import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth/authActions';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
    const classes = useStyles();

    const displayName = useSelector(state => state.firebase.profile.displayName)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Checker</Link>
                </Typography>

                <Typography variant="overline" display="block" >
                    { displayName }
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={logout}
                >
                    <AccountCircle className={classes.iconColor}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
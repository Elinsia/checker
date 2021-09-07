import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { registerUser } from '../../redux/actions/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';

import useMyForm from '../../hooks/useMyForm';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  field: {
      marginBottom: theme.spacing(3)
  }

}));


const Registration = () => {
  const classes = useStyles();
  const errors = useSelector(state => state.auth.errors);
  const dispatch = useDispatch();

	const register = () => {
    dispatch(registerUser(input));
	}

	const {input, handleSubmit, handleChange} = useMyForm({
		fname: '',
		email: '',
		password: ''
	}, register);
  
  return (
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography  variant="h4" align="center">Регистрация</Typography>
          <form onSubmit={handleSubmit}>
              <TextField variant="outlined" className={classes.field} value={input.fname} type="text" name="fname" label="Фамилия и имя" onChange={(e) => handleChange(e)} fullWidth/>
              <TextField variant="outlined" className={classes.field} value={input.email} type="email" name="email" label="Почта" onChange={(e) => handleChange(e)} fullWidth/>
              <TextField variant="outlined" className={classes.field} value={input.password} type="password" name="password" label="Пароль" onChange={(e) => handleChange(e)} fullWidth/>
              <Button className={classes.field} color="primary" variant="contained" type="submit" fullWidth>Регистрация</Button>
              <Link to="/login" variant="body2">
                {"Уже есть аккаунт? Войти"}
              </Link>
          </form>
        </Paper>
        {
          (errors) ?  <Alert severity="error"> {errors} </Alert> : null
        }
      </Container>
  )
}

export default Registration;
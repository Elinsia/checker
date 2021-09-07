import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import Registration from './components/Registration';
import Main from './components/Main';

import { useSelector } from 'react-redux';

const App = () => {
  const isLogin = useSelector(state => state.auth.isLogged);

  return (
    
    <div className="app">
      {
        (isLogin)
          ? (
            <Switch>
              <Route path = '/' exact component={Main}/>
              <Route path = '/logout' component={Logout} />
              <Redirect to='/'/>
            </Switch>
          ) :
          (
           <Switch>
              <Route path = '/login' component={Login}/>
              <Route path = '/registration' component={Registration} />
              <Redirect to='/login'/>
            </Switch>
          )        
      }
    </div>
  );
}

export default App;

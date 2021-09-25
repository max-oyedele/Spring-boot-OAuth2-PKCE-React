import {useEffect} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {
  useAuth
} from 'react-oauth2-pkce'

import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';

function Routes() {
  const { authService } = useAuth();
  const history = useHistory();

  useEffect(()=>{
    const isAuthenticated = authService.isAuthenticated()
    if(isAuthenticated){
      history.push('/home')    
    }
    else {
      history.push('/login')
    }
  })

  return (
    <Switch>
      {
        !authService.isAuthenticated() && <Route exact={true} path="/login"><Login /></Route>
      }
      {
        authService.isAuthenticated() && 
        <>
          <Route exact={true} path="/home"><Home /></Route>
          <Route exact={true} path="/profile"><Profile /></Route>
        </>
      }
    </Switch>
  )
}

export default Routes;

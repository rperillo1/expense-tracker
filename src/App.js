import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import userServices from './utils/userServices'
import { UserContext } from "./contexts/UserContext";
import './App.css';

function App() {
  const { userCtx, isloggedCtx } = useContext(UserContext);
  const [ user, setUser ] = userCtx;
  const [ isloggedIn, setIsLoggedIn ] = isloggedCtx;

  useEffect(() => {
    if (!isloggedIn) {
      setUser(getUser());
    }
  }, [])


  const getUser = async () => {
    let user = await userServices.getUser();
    setIsLoggedIn(true);
    return user;
  }


  const authenticateUser = res => {
    console.log('RES', res)
    userServices.AuthenticateGoogleUser(res)
      .then((result) => {
        sessionStorage.setItem('token', JSON.stringify(result.token));
        setUser(result.user);
        setIsLoggedIn(true);
      })
  };


  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>

        { !isloggedIn ?
          <Link to='/login'>Log in Page</Link>
          :
          <Link to="/logout">Log Out</Link>
        }

      </header>
      <main>
        <Switch>
            <Route exact path='/login' render={({ history }) =>
              <LoginPage history={history} authenticateUser={authenticateUser} />
            } />
            <Route exact path='/logout' render={({ history }) =>
              <LogoutPage history={history} />
            } />  
        </Switch>
      </main>
    </div>
  );
}

export default App;




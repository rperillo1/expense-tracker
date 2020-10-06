import React, { useContext, useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import userServices from './utils/userServices'
import { UserContext } from "./contexts/UserContext";
import './App.css';

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setUser(getUser());
    }
  }, [user])


  const getUser = async () => {
    let user = await userServices.getUser();
    return user;
  }


  const authenticateUser = res => {
    console.log('RES', res)
    userServices.AuthenticateGoogleUser(res)
      .then((result) => {
        sessionStorage.setItem('token', JSON.stringify(result.token));
        setUser(result.user);
      })
  };

  
  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>

        { Object.keys(user).length === 0 ?
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




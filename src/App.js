import React, { useContext, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import userServices from './utils/userServices'
import { UserContext } from "./contexts/UserContext";
import { UserProvider } from "./contexts/UserContext";
import './App.css';

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const authenticateUser = res => {
    console.log('RES', res)
    userServices.AuthenticateGoogleUser(res)
      .then((result) => {
        console.log(result)
        sessionStorage.setItem('token', JSON.stringify(result.token));
        setUser(result.user);
        setIsAuthenticated(true);
        setIsLoggedIn(true);
      })
  };

  return (
    <div className="App">
      {/* <UserProvider> */}
        <header>
          <p>Expense Tracker</p>
          <Link to="/logout">Log Out</Link>
          <br />
          <Link to='/loginPage'>Log in Page</Link>
        </header>
        <main>
          <Switch>
            <Route exact path='/loginPage' render={({ history }) =>
              <LoginPage history={history} authenticateUser={authenticateUser}/>
            } />
            <Route exact path='/logout' render={({ history }) =>
              <LogoutPage history={history} />
            } />
          </Switch>
        </main>
      {/* </UserProvider> */}
    </div>
  );
}

export default App;




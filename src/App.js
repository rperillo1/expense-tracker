import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  const authenticateUser = res => {
      console.log('RES', res)
      userServices.AuthenticateGoogleUser(res)
          .then((result) => {
              console.log(result)
              sessionStorage.setItem('token', JSON.stringify(result.token));
              setUser(result.user);
              setIsAuthenticated(true);
          })
  };


  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>
        <Link to="/logout">Log Out</Link>
        <br/>
        <Link to='/loginPage'>Log in Page</Link>
      </header>
      <main>
        <Switch>
          <Route exact path='/loginPage' render={({ history }) =>
            <LoginPage history={history} />
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




import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>
        {/* <Link to="/auth/google">Login with Google</Link>
        <br/> */}
        <Link to="/logout">Log Out</Link>
        <br/>
        <Link to='/login'>Log in Page</Link>
      </header>
      <main>
        <Switch>
          <Route exact path='/login' render={({ history }) =>
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




import React, { useContext, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import userServices from './utils/userServices'
import { UserContext } from "./contexts/UserContext";
import tokenServices from "./utils/tokenServices";
import mutation from './queries/SingupOrLoginMutation';
import { graphql } from 'react-apollo';
// import { useMutation } from 'react-apollo';
// import gql from 'graphql-tag';
import './App.css';



function App(props) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getUser();
    }
  }, [])


  const getUser = async () => {
    let user = await userServices.getUser();
    setUser(user);
  }


  const authenticateUser = res => {
    console.log('RES', res)
    props.mutate({
      variables: {
        name: res.profileObj.name,
        email: res.profileObj.email,
        googleId: res.googleId,
        imageUrl: res.profileObj.imageUrl,
        id_token: res.tokenObj.id_token
      }
    })
      .then((result) => {
        let data = result.data.LoginOrSignup
        tokenServices.setToken(result);
        // sessionStorage.setItem('token', JSON.stringify(result.token));
        let user = {email: data.email, name: data.name, googleId: data.googleId, imageUrl: data.imageUrl}
        setUser(user);
      })
  };


  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>

        {Object.keys(user).length === 0 ?
          // <Link to='/login'>Log in Page</Link>
          <LoginPage authenticateUser={authenticateUser} />
          :
          // <Link to="/logout">Log Out</Link>
          <LogoutPage />
        }

      </header>
      <main>
        <Switch>
          {/* <Route exact path='/login' render={({ history }) =>
            <LoginPage history={history} authenticateUser={authenticateUser} />
          } />
          <Route exact path='/logout' render={({ history }) =>
            <LogoutPage history={history} />
          } /> */}
        </Switch>
      </main>
    </div>
  );
}

export default graphql(mutation)(App);




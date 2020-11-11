import React, { useContext, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login'
import Logout from './components/Logout'
import Homepage from './pages/Homepage'
import AddAccountPage from './pages/AddAccountPage'
// import userServices from './utils/userServices'
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
    let user = await tokenServices.getUser();
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
        let user = {email: data.email, name: data.name, googleId: data.googleId, imageUrl: data.imageUrl}
        setUser(user);
      })
  };

  const createAccount = async accountToCreate => {
    // await mutation to add account to the user model;
    console.log(accountToCreate)
  }


  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>

        {Object.keys(user).length === 0 ?
          <Login authenticateUser={authenticateUser} />
          :
          <Logout />
        }

      </header>
      <main>
      {Object.keys(user).length === 0 ? 
      <div>Please Log In or Sign Up</div>
      : 
        <Homepage></Homepage>
      }
        <Switch>
          <Route exact path='/add-account' render={({ history }) =>
            <AddAccountPage history={history} createAccount={createAccount}/>
          } />

        </Switch>
      </main>
    </div>
  );
}

export default graphql(mutation)(App);




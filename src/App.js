import React, { useContext, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login'
import Logout from './components/Logout'
import Homepage from './pages/Homepage'
import AddAccountPage from './pages/AddAccountPage'
import { UserContext } from "./contexts/UserContext";
import tokenServices from "./utils/tokenServices";
import LoginMutation from './queries/LoginMutation';
import AddAccountMutation from './queries/AddAccountMutation';
import { useMutation } from 'react-apollo';
import './App.css';



function App(props) {
  const { user, setUser } = useContext(UserContext);
  const [LoginOrSignup] = useMutation(LoginMutation);
  const [AddAccount] = useMutation(AddAccountMutation)

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
    LoginOrSignup({
      variables: { name: res.profileObj.name, email: res.profileObj.email, googleId: res.googleId, imageUrl: res.profileObj.imageUrl, id_token: res.tokenObj.id_token }
    })
      .then((result) => {
        let data = result.data.LoginOrSignup
        tokenServices.setToken(data);
        let user = { email: data.email, name: data.name, googleId: data.googleId, imageUrl: data.imageUrl }
        setUser(user);
      })
  };

  const createAccount = accountToCreate => {
    // await mutation to add account to the user model;
    AddAccount({
      variables: { googleId: user.googleId, name: accountToCreate.name, balance: parseInt(accountToCreate.balance) }
    })
    .then((result) => {
      console.log('result', result)
    });
  };


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
            <AddAccountPage history={history} createAccount={createAccount} />
          } />

        </Switch>
      </main>
    </div>
  );
}

export default App;
// export default graphql(mutation)(App);





import React, { useContext, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login'
import Logout from './components/Logout'
import Homepage from './pages/Homepage'
import AddAccountPage from './pages/AddAccountPage'
import { UserContext } from './contexts/UserContext';
import { IsLoggedInContext } from './contexts/IsLoggedInContext';
// import useToggle from './hooks/useToggleState';
import tokenServices from './utils/tokenServices';
import LoginMutation from './queries/LoginMutation';
import AddAccountMutation from './queries/AddAccountMutation';
import userQuery from './queries/getCurrentUserQuery';
import { useMutation } from 'react-apollo';
import { useLazyQuery } from 'react-apollo';
import './App.css';



function App(props) {
  const { isLoggedIn, toggleIsLoggedIn } = useContext(IsLoggedInContext);
  const { user, setUser } = useContext(UserContext);
  const [LoginOrSignup] = useMutation(LoginMutation);
  const [AddAccount] = useMutation(AddAccountMutation);
  const [getUserQuery, { loading, data }] = useLazyQuery(userQuery, {
    onCompleted: () => {
      setUser(data.getUser)
      toggleIsLoggedIn(true)
    }
  })

  useEffect(() => {
    getUser();
  }, [])


  const getUser = async () => {
    let user = await tokenServices.getUser();

    if (Object.keys(user).length !== 0) {
      getUserQuery({ 
        variables: 
        { googleId: user.googleId } })
    } else {
      toggleIsLoggedIn(false)
    }
  }


  const authenticateUser = res => {
    LoginOrSignup({
      variables: 
      { name: res.profileObj.name, email: res.profileObj.email, googleId: res.googleId, imageUrl: res.profileObj.imageUrl, id_token: res.tokenObj.id_token }
    })
      .then((result) => {
        let userData = result.data.LoginOrSignup
        tokenServices.setToken(userData);
        setUser(userData)
        toggleIsLoggedIn(true)
      })
  };

  const createAccount = accountToCreate => {
    AddAccount({
      variables: { googleId: user.googleId, accounts: user.accounts, name: accountToCreate.name, balance: parseInt(accountToCreate.balance) }
    })
      .then((result) => {
        let _accounts = result.data.AddAccount.accounts
        let updatedUser = { ...user, accounts: _accounts }
        setUser(updatedUser)
      });
  };


  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>

        {isLoggedIn ?
          <Logout toggleIsLoggedIn={toggleIsLoggedIn} />
          :
          <Login authenticateUser={authenticateUser} />
        }
        {loading ?
          <div>loading</div>
          :
          <h1>finished</h1>
        }

      </header>
      <main>
        <Switch>
          <Route exact path='/accounts' render={({ history }) =>
            <AddAccountPage history={history} createAccount={createAccount} />
          } />
          <Route path='/' render={({ history }) =>
            <Homepage history={history} />
          } />
        </Switch>
      </main>
    </div>
  );
}

export default App;
// export default graphql(mutation)(App);





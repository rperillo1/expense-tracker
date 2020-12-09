import React, { useContext, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login'
import Logout from './components/Logout'
import Homepage from './pages/Homepage'
import AddAccountPage from './pages/AddAccountPage'
import { UserContext } from './contexts/UserContext';
import { IsLoggedInContext } from './contexts/IsLoggedInContext';
import { AccountContext } from './contexts/AccountContext';
// import useToggle from './hooks/useToggleState';
import tokenServices from './utils/tokenServices';
import LoginMutation from './queries/LoginMutation';
import AddAccountMutation from './queries/AddAccountMutation';
import DeleteAccountMutation from './queries/DeleteAccountMutation';
import getAccounts from './queries/getAccounts';
import userQuery from './queries/getCurrentUserQuery';
import { useMutation, useQuery } from 'react-apollo';
import { useLazyQuery } from 'react-apollo';
import './App.css';



function App(props) {
  const { isLoggedIn, toggleIsLoggedIn } = useContext(IsLoggedInContext);
  const { accounts, setAccounts } = useContext(AccountContext);

  const { user, setUser } = useContext(UserContext);
  const [LoginOrSignup] = useMutation(LoginMutation);
  const [AddAccount] = useMutation(AddAccountMutation);
  const [DeleteAccount] = useMutation(DeleteAccountMutation);
  const [getAccountsQuery, { loadingAccounts, accountData }] = useLazyQuery(getAccounts, {
    onCompleted: (data) => {
      let accts = data.getAccounts.accounts
      setAccounts(accts)
    }
  })
  const [getUserQuery, { loading, data }] = useLazyQuery(userQuery, {
    onCompleted: () => {
      setUser(data.getUser)
      toggleIsLoggedIn(true)
      getAllAccounts(data.getUser.accounts);
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
          { googleId: user.googleId }
      })
    } else {
      toggleIsLoggedIn(false)
    }
  }


  const authenticateUser = res => {
    LoginOrSignup({
      variables:
        { name: res.profileObj.name, email: res.profileObj.email, googleId: res.googleId, imageUrl: res.profileObj.imageUrl, id_token: res.tokenObj.id_token }
    })
      .then((res) => {
        let userData = res.data.LoginOrSignup
        tokenServices.setToken(userData);
        setUser(userData)
        toggleIsLoggedIn(true)
        getAllAccounts(userData.accounts)
      })
  };

  const createAccount = accountToCreate => {
    if (isLoggedIn) {
      AddAccount({
        variables: { googleId: user.googleId, accounts: user.accounts, name: accountToCreate.name, balance: parseInt(accountToCreate.balance) }
      })
        .then((res) => {
          let _accounts = res.data.AddAccount.accounts;
          let updatedUser = { ...user, accounts: _accounts };
          setUser(updatedUser);
          getAllAccounts(_accounts);
        })
    } else {
      alert('Please log in or sign up to create an account.');
    }
  };

  const getAllAccounts = (accountsArray) => {
    console.log('acctarray', accountsArray)
    getAccountsQuery({
      variables:
        { _id: accountsArray }
    })
  }

  const deleteOneAccount = (accountId) => {
    DeleteAccount({
      variables:
        { _id: accountId, googleId: user.googleId }
    })
      .then((res) => {
        let updatedAccounts = user.accounts.filter(acct => acct !== res.data.DeleteAccount._id)
        // let updatedUser = { ...user, accounts: updatedAccounts }
        setUser({...user, accounts: updatedAccounts})
      })
  }


  return (
    <div className="App">
      <header>
        <p>Expense Tracker</p>

        {isLoggedIn ?
          <Logout toggleIsLoggedIn={toggleIsLoggedIn} />
          :
          <Login authenticateUser={authenticateUser} />
        }
        {loadingAccounts ?
          <div>loading</div>
          :
          <h1>finished</h1>
        }

      </header>
      <main>
        <Switch>
          <Route exact path='/accounts' render={({ history }) =>
            <AddAccountPage history={history}
              createAccount={createAccount}
              getAllAccounts={getAllAccounts}
              deleteOneAccount={deleteOneAccount}
            />
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






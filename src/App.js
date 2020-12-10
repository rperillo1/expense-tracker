import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import AccountPage from './pages/AccountPage';
import AccountDetailPage from './pages/AccountDetailPage';
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
import getAccountQuery from './queries/getOneAccountQuery';
import { useMutation, useQuery } from 'react-apollo';
import { useLazyQuery } from 'react-apollo';
import './App.css';



function App(props) {
  //Contexts
  const { isLoggedIn, toggleIsLoggedIn } = useContext(IsLoggedInContext);
  const { accounts, setAccounts } = useContext(AccountContext);
  const { user, setUser } = useContext(UserContext);
  //Graphql mutations
  const [LoginOrSignup] = useMutation(LoginMutation);
  const [AddAccount] = useMutation(AddAccountMutation);
  const [DeleteAccount] = useMutation(DeleteAccountMutation);
  //Graphql queries
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
  const [getOneAccountQuery, { loadingAcct, acctData }] = useLazyQuery(getAccountQuery, {
    onCompleted: (data) => {
      console.log("completed GetOne Account", data)
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
        let updatedAccounts = res.data.DeleteAccount.accounts;
        setUser({ ...user, accounts: updatedAccounts });
        getAllAccounts(updatedAccounts);
      })
  }

  const getOneAccount = (accountId) => {
    getOneAccountQuery({
      variables: { _id: accountId }
    })
  }


  return (
    <div className="App">
      <header>
        <Navbar authenticateUser={authenticateUser}></Navbar>
      </header>
      <main>
        <Switch>
          <Route exact path='/accounts' render={({ history }) =>
            <AccountPage history={history}
              createAccount={createAccount}
              deleteOneAccount={deleteOneAccount}
              getOneAccount={getOneAccount}
            />
          } />
          <Route exact path='/account/detail' render={({ history, location }) => 
            <AccountDetailPage history={history} location={location}
            />
          }/>
          <Route path='/' render={({ history }) =>
            <Homepage history={history} />
          } />
        </Switch>
      </main>
    </div>
  );
}

export default App;






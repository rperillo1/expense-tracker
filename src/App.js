import React, { useContext, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import userServices from './utils/userServices'
import { UserContext } from "./contexts/UserContext";
import query from './queries/CurrentUser';
import { graphql } from 'react-apollo';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';



function App(props) {
  const { user, setUser } = useContext(UserContext);
  console.log(props.data)



  const authGQL = (userInput) => gql`
    mutation LoginOrSignup($name: ${user.profileObj.name}, $email: ${user.profileObj.email}, $googleId: ${user.googleId}, $imageUrl: ${user.profileObj.imageUrl}, $id_token: ${user.tokenObj.id_token}) {
          LoginOrSignup(name: $name, email: $email, googleId: $googleId, imageUrl: $imageUrl, id_token: $id_token) {
      name
      email
      googleId
      imageUrl
    }
  }
`;


  // LoginOrSignup(name: "bob", email: "bob@email.com", googleId: "1234", imageUrl: "www.yodododod.com/image", id_token: "123") {
  //   email
  // }



  // const AddChannelWithMutation = graphql(
  //     addChannelMutation
  //   )(AddChannel); 
  // export default AddChannelWithMutation;


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
    // let userInput =
    // {
    //   "input": {
    //     "name": res.profileObj.name,
    //     "email": res.profileObj.email,
    //     "googleId": res.googleId,
    //     "imageUrl": res.profileObj.imageUrl,
    //     "id_token": res.tokenObj.id_token
    //   }
    // }

    
    gql`

    mutation LoginOrSignup($name: String="${res.profileObj.name}", $email: String="${res.profileObj.email}", $googleId: String="${res.googleId}", $imageUrl: String="${res.profileObj.imageUrl}", $id_token: String="${res.tokenObj.id_token}") {
          LoginOrSignup(name: $name, email: $email, googleId: $googleId, imageUrl: $imageUrl, tokenId: $tokenId) {
      name
      email
      googleId
      imageUrl
    }
  }
`
    // authGQL(userInput);

    // userServices.AuthenticateGoogleUser(res)
    //   .then((result) => {
    //     sessionStorage.setItem('token', JSON.stringify(result.token));
    //     setUser(result.user);
    //   })
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

export default graphql(query)(App);




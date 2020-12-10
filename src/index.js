import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from "./contexts/UserContext";
import { AccountProvider } from "./contexts/AccountContext";
import { IsLoggedInProvider } from "./contexts/IsLoggedInContext";
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { CurrentAccountProvider } from './contexts/CurrentAccountContext';


const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.StrictMode>
        <IsLoggedInProvider>
        <UserProvider>
        <AccountProvider>
        <CurrentAccountProvider>
            <App />
        </CurrentAccountProvider>
        </AccountProvider>
        </UserProvider>
        </IsLoggedInProvider>
      </React.StrictMode>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();

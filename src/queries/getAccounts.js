import gql from 'graphql-tag';


const getAccounts = gql`
query getAccounts($_id: String!) {
    getAccounts(_id: $_id) {
      accounts
  }
}
`;


export default getAccounts;
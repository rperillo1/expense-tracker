import gql from 'graphql-tag';


const getAccounts = gql`
query getAccounts($_id: String! ) {
    getAccounts(_id: $_id) {
      name
      balance
  }
}
`;


export default getAccounts;
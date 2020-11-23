import gql from 'graphql-tag';


const AddAccountMutation = gql` 
mutation AddAccount($googleId: String!, $name: String!, $balance: Int!, $accounts: [String!]){
  AddAccount(googleId: $googleId, name: $name, balance: $balance, accounts: $accounts) {
    googleId
    accounts
  }
}
`


export default AddAccountMutation;
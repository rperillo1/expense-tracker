import gql from 'graphql-tag';


const AddAccountMutation = gql` 
mutation AddAccount($googleId: String!, $name: String!, $balance: Int!){
  AddAccount(googleId: $googleId, name: $name, balance: $balance) {
    name
    balance
  }
}
`


export default AddAccountMutation;
import gql from 'graphql-tag';


const AddAccountMutation = gql` 
mutation AddAccount($name: String!, $balance: Int!){
  AddAccount(name: $name, balance: $balance) {
    name
    balance
  }
}
`


export default AddAccountMutation;
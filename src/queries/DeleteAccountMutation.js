import gql from 'graphql-tag';


const DeleteAccountMutation = gql` 
mutation DeleteAccount($_id: String!, $googleId: String!){
  DeleteAccount(_id: $_id, googleId: $googleId) {
    accounts
  }
}
`


export default DeleteAccountMutation;
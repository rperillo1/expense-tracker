import gql from 'graphql-tag';


const LoginMutation = gql` 
mutation LoginOrSignup($name: String!, $email: String!, $googleId: String!, $imageUrl: String!, $id_token: String!, $accounts: List){
  LoginOrSignup(name: $name, email: $email, googleId: $googleId, imageUrl: $imageUrl, id_token: $id_token, accounts: $accounts) {
    email
    name
    googleId
    imageUrl
  }
}
`


export default LoginMutation;
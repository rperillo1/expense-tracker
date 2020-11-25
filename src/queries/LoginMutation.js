import gql from 'graphql-tag';


const LoginMutation = gql` 
mutation LoginOrSignup($name: String!, $email: String!, $googleId: String!, $imageUrl: String!, $id_token: String!){
  LoginOrSignup(name: $name, email: $email, googleId: $googleId, imageUrl: $imageUrl, id_token: $id_token) {
    email
    name
    googleId
    imageUrl
    _id
    accounts
  }
}
`


export default LoginMutation;
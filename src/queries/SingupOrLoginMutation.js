import gql from 'graphql-tag';


const mutation = gql` 
mutation LoginOrSignup($name: String!, $email: String!, $googleId: String!, $imageUrl: String!){
  LoginOrSignup(name: $name, email: $email, googleId: $googleId, imageUrl: $imageUrl) {
    email
  }
}
`

// export default gql`
//     {
//         user(googleId: "115017414006295624552" ) {
//             name
//             _id
//           }
//     }
// `;


export default mutation;
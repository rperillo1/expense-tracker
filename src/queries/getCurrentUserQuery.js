import gql from 'graphql-tag';


const getUserQuery = gql`
query getUser($googleId: String! ) {
    getUser(googleId: $googleId) {
      _id
      name
      googleId
      email
      imageUrl
      accounts
  }
}
`;


export default getUserQuery;
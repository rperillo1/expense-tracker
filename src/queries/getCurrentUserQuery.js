import gql from 'graphql-tag';


const getUserQuery = gql`
query getUser($googleId: String! ) {
    getUser(googleId: $googleId) {
      name
      email
      _id
  }
}
`;


export default getUserQuery;
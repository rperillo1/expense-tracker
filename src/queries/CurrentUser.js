import gql from 'graphql-tag'

export default gql`
    {
        user(googleId: "115017414006295624552" ) {
            name
            _id
          }
    }
`;

import gql from 'graphql-tag';
import userServices from '../utils/userServices'

// const user = userServices.getUser()


    let user = userServices.getUser()

export default gql`
    {
        user(googleId: ${user.googleId} ) {
            name
            _id
          }
    }
`;


// export default query;

// export default gql`
//     {
//         user(googleId: "115017414006295624552" ) {
//             name
//             _id
//           }
//     }
// `;

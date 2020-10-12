// mutations allows for delete/update to database
// const axios = require('axios')
// const graphql = require('graphql');

// const {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLInt,
//     GraphQLNonNull,
//     GraphQLSchema
// } = graphql;


// const mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addUser: {
//             type: UserType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 email: { type: new GraphQLNonNull(GraphQLString) },
//                 googleId: { type: new GraphQLNonNull(GraphQLString) },
//                 imageUrl: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parentValue, { name, email, googleId, imageUrl }) {
//                 return axios.post('http://localhost:3000/users', { name, email, googleId, imageUrl })
//                 .then(res => res.data);
//             }
//         },
//         deleteUser: {
//             type: UserType
//         }
//     }
// });

// module.exports = mutation;

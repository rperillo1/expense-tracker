const axios = require('axios')
const graphql = require('graphql');
const Users = require('../mongo-connector');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        googleId: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        //accounts - graphQL Object??!?!?
        // accounts: {
        // type: new GraphQLList(AccountType)
        // resolve(parentValue, args) {
        // axios.get(companies/{parentValue.id}/accounts) <-- example
        // }
        // }
    })
});

const AccountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        // _id: { type: GraphQLString },
        // name: { type: GraphQLString },
        // email: { type: GraphQLString },
        // googleId: { type: GraphQLString },
        // imageUrl: { type: GraphQLString },
        //accounts - graphQL Object??!?!?
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { googleId: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/graphql/users/${args.googleId}`)
                    .then(response => console.log(response))
                    .then(response => response.data[0])
            }
        },
        // accounts: {
        //     type: AccountType,
        //     args: { id: { type: GraphQLString } },
        //     resolve(parentValue, args) {
        //         return axios.get(`http://localhost:3001/api/accounts/${args.id}`)
        //             .then(response => response.data[0])
        //     }
        // }
    }
});


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
//         }
//     }
// });


module.exports = RootQuery;

// module.exports = new GraphQLSchema({
//     RootQuery: RootQuery,
//     mutation
// });

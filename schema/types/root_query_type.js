const axios = require('axios')
const graphql = require('graphql');
const UserType = require('./user_type');
// const connectMongo = require('../mongo-connector');
// const mongo = connectMongo();



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList
} = graphql;


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
            resolve(parentValue, args, context, request) {
                return context.mongo.Users.findOne({googleId: args.googleId})
                    .then(response => response)
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


module.exports = RootQuery;



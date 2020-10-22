// mutations allows for delete/update to database
const axios = require('axios')
const graphql = require('graphql');
const UserType = require('./types/user_type');
const AuthService = require('../config/auth');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = graphql;


// console.log('passed to mutation', name, email)
// console.log('request in mutation', request)
// return context.mongo.Users.findOne({ googleId: args.googleId })
//     .then(response => response)
// logout: {
//     type: UserType,
// rip out token from localStorage
// return user name or something?
// }
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        LoginOrSignup: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                googleId: { type: new GraphQLNonNull(GraphQLString) },
                imageUrl: { type: new GraphQLNonNull(GraphQLString) },
                id_token: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { name, email, googleId, imageUrl }, request) {
                console.log('passed to mutation', name, email)
                console.log('request in mutation', request)
                return AuthService.loginUser({ name, email, googleId, imageUrl, req: request })
            }
        }
    }
});

module.exports = mutation;

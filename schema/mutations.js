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
                id_token: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { name, email, googleId, imageUrl, id_token }, request) {
                return AuthService.verifyUser({ name, email, googleId, imageUrl, id_token, req: request })
            }
        }
    }
});

module.exports = mutation;

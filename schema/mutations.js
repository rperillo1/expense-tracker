const graphql = require('graphql');
const UserType = require('./types/user_type');
const AuthService = require('../config/auth');
const AccountType = require('./types/account_type');
const user = require('../models/user');
const accounts = require('../models/accounts');
const requiresAuth = require('../config/permissions');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = graphql;



// return context.mongo.Users.findOne({ googleId: args.googleId })
//     .then(response => response)

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
                accounts: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parentValue, { name, email, googleId, imageUrl, id_token, accounts }, request) {
                return AuthService.verifyUser({ name, email, googleId, imageUrl, id_token, req: request })
            }
        },
        AddAccount: {
            type: UserType,
            args: {
                accounts: { type: new GraphQLList(GraphQLString) },
                googleId: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                balance: { type: new GraphQLNonNull(GraphQLInt) },
            },
            async resolve(parentValue, { googleId, accounts, name, balance }, request) {
                let account = await request.mongo.Accounts.insertOne({ name: name, balance: balance })
                let updatedUser = await request.mongo.Users.findOneAndUpdate({ googleId: googleId }, { $push: { "accounts": account.insertedId } }, { new: true, upsert: true, returnOriginal: false })
                // let updatedUser = await request.mongo.Users.findOneAndUpdate({ googleId: googleId }, { $set: { "accounts": updatedAccounts } }, { new: true, upsert: true, returnOriginal: false })
                let data = updatedUser.value
                return { googleId: data.googleId, accounts: data.accounts };
                
            }
        }
    }
});


module.exports = mutation;

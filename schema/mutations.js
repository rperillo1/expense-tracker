// mutations allows for delete/update to database
const graphql = require('graphql');
const UserType = require('./types/user_type');
const AuthService = require('../config/auth');
const AccountType = require('./types/account_type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
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
            },
            resolve(parentValue, { name, email, googleId, imageUrl, id_token }, request) {
                return AuthService.verifyUser({ name, email, googleId, imageUrl, id_token, req: request })
            }
        },
        AddAccount: {
            type: AccountType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                balance: { type: new GraphQLNonNull(GraphQLInt)},
            },
            async resolve(parentValue, { name, balance }, request ) {
                // console.log(name, balance, '!!!')
                let account;
                account = await request.mongo.Accounts.insertOne({ name: name, balance: balance })
                return account;
                // return request.mongo.Users.findOne({ googleId: '115017414006295624552' })
                // console.log('name', name, 'balance', balance)
            }
        }
    }
});

module.exports = mutation;

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
                googleId: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                balance: { type: new GraphQLNonNull(GraphQLInt) },
            },
            async resolve(parentValue, { googleId, name, balance }, request ) {
                let account = await request.mongo.Accounts.insertOne({ name: name, balance: balance })
                let accountId = account.insertedId
                let user = await request.mongo.Users.findOne({ googleId: googleId})
                let newAccts = user.accounts.push(accountId)
                console.log('newAccts', newAccts)
                await request.mongo.Users.findOneAndUpdate({ googleId: googleId}, {accounts: newAccts}, { new: true, upsert: true})

                return account.ops;
                // return request.mongo.Users.findOne({ googleId: '115017414006295624552' })
                // console.log('name', name, 'balance', balance)
            }
        }
    }
});

module.exports = mutation;

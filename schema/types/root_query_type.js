const graphql = require('graphql');
const UserType = require('./user_type');
const AccountType = require('./account_type');
const ObjectId = require('mongodb').ObjectID;


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUser: {
            type: UserType,
            args: { googleId: { type: GraphQLString } },
            resolve(parentValue, args, context) {
                return context.mongo.Users.findOne({ googleId: args.googleId })
                    .then(response => response)
            }
        },
        getAccounts: {
            type: AccountType,
            args: { _id: { type: GraphQLString } },
            resolve(parentValue, args, context) {
                let objectId = ObjectId(args._id)
                return context.mongo.Accounts.findOne({ _id: objectId})
                    .then(response => response)
            }
        }
    }
});


module.exports = RootQuery;



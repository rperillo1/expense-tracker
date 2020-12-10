const graphql = require('graphql');
const UserType = require('./user_type');
const AccountType = require('./account_type');
const AccountsType = require('./accounts_type');
const ObjectId = require('mongodb').ObjectID;


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
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
            type: AccountsType,
            args: { _id: { type: GraphQLList(GraphQLString) } },
            resolve: async (parentValue, args, context) => {
                try {
                    let acctObjIds = [];
                    args._id.forEach(id => {
                        acctObjIds.push(ObjectId(id))
                    })
                    let accts = await context.mongo.Accounts.find({ _id: { $in: acctObjIds } }).toArray()
                    return { accounts: accts }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        getOneAccount: {
            type: AccountType,
            args: { _id: {type: GraphQLString }},
            resolve(parentValue, args, context) {
                console.log("hitting that bitch", args)
                return; 
            }
        }
    }
});


module.exports = RootQuery;



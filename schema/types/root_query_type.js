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
                    console.log('args', args)
                    let acctObjIds = [];
                    args._id.forEach(id => {
                        acctObjIds.push(ObjectId(id))
                    })
                    let accts = await context.mongo.Accounts.find({ _id: { $in: acctObjIds } })
                    .toArray()
                    console.log('accts',accts)
                    return { accounts: accts}
                } catch (err) {
                    console.log(err)
                }
                // let acctObjIds = [];
                // args._id.forEach(id => {
                //     acctObjIds.push(ObjectId(id))
                // })
                // return context.mongo.Accounts.find({ _id: { $in: acctObjIds } })
                //     .toArray()
                //     .then(items => {
                //         { accounts: items }
                //     })
                // .then(items => items)
            }
        },
        // getAccounts: {
        //     type: AccountType,
        //     args: { _id: { type: GraphQLString } },
        //     async resolve(parentValue, args, context) {
        //         let objectId = await ObjectId(args._id)
        //         return context.mongo.Accounts.findOne({ _id: objectId})
        //             .then(response => response)
        //     }
        // }
    }
});


module.exports = RootQuery;



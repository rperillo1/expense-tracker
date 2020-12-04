const graphql = require('graphql');
const AccountType = require('./account_type');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    // GraphQLSchema,
    GraphQLList
} = graphql;


const AccountsType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        // _id: { type: GraphQLString },
        accounts: { type: GraphQLList(AccountType) }
    })
});


module.exports = AccountsType;
const graphql = require('graphql');
const AccountType = require('./account_type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        googleId: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        // accounts: {
        // type: GraphQLList(AccountType)
        // }
    })
});

module.exports = UserType;
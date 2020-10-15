const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        googleId: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        //accounts - graphQL Object??!?!?
        // accounts: {
        // type: new GraphQLList(AccountType)
        // resolve(parentValue, args) {
        // axios.get(companies/{parentValue.id}/accounts) <-- example
        // }
        // }
    })
});

module.exports = UserType;
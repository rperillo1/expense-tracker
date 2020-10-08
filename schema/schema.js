const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    {
        id: '23', name: "bob", email: "bob@bob.com", googleId: 2323, imageUrl: 'www.imageurl.com/bobimage'
    },
    {
        id: '27', name: "bert", email: "bert@bert.com", googleId: 1010, imageUrl: 'www.imageurl.com/imagebert'
    }
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        googleId: { type: GraphQLInt },
        imageUrl: { type: GraphQLString },
        //accounts - graphQL Object??!?!?
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id });
                //instead of a return can do a fetch or axios.get to hit the DB/back-end server
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
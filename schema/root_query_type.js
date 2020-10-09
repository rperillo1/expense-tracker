const axios = require('axios')
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        googleId: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        //accounts - graphQL Object??!?!?
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { googleId: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/api/users/${args.googleId}`)
                // .then(response => console.log(response.data))
                .then(response => response.data[0])
            }
        }
    }
});

module.exports = RootQuery;
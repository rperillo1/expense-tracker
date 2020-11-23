const graphql = require('graphql');
const UserType = require('./user_type');



const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUser: {
            type: UserType,
            args: { googleId: { type: GraphQLString } },
            resolve(parentValue, args, context) {
                return context.mongo.Users.findOne({ googleId: args.googleId })
                    // .then(response => console.log(response))
                    .then(response => response)
            }
        },
        // accounts: {
        //     type: AccountType,
        //     args: { id: { type: GraphQLString } },
        //     resolve(parentValue, args) {
        //         return axios.get(`http://localhost:3001/api/accounts/${args.id}`)
        //             .then(response => response.data[0])
        //     }
        // }
    }
});


module.exports = RootQuery;



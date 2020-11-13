const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    // GraphQLNonNull,
    // GraphQLSchema,
    GraphQLList
} = graphql;


const AccountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        name: { type: GraphQLString },
        balance: { type: GraphQLInt },
        // income: { type: GraphQLObjectType },
        // expenses: {
        //     type: ExpensesType
        // }
    })
});

const ExpensesType = new GraphQLObjectType({
    name: 'Expenses',
    fields: () => ({
        bills: { type: GraphQLList },
        mortgage: { type: GraphQLList },
        rent: { type: GraphQLList },
        hoa: { type: GraphQLList },
        gas: { type: GraphQLList },
        restaurants: { type: GraphQLList },
        pets: { type: GraphQLList },
        homeImprovement: { type: GraphQLList },
        automobile: { type: GraphQLList },
        medical: { type: GraphQLList },
        groceries: { type: GraphQLList },
        transportation: { type: GraphQLList },
        shopping: { type: GraphQLList },
        entertainment: { type: GraphQLList },
        personal: { type: GraphQLList },
        other: { type: GraphQLList }
    })
});


module.exports = AccountType;
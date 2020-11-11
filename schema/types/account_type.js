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
        balance: GraphQLInt,
        income: GraphQLObjectType,
        expenses: {
            type: ExpensesType
        }
    })
});

const ExpensesType = new GraphQLObjectType({
    name: 'Expenses',
    fields: () => ({
        bills: GraphQLList,
        mortgage: GraphQLList,
        rent: GraphQLList,
        hoa: GraphQLList,
        gas: GraphQLList,
        restaurants: GraphQLList,
        pets: GraphQLList ,
        homeImprovement: GraphQLList,
        automobile: GraphQLList,
        medical: GraphQLList,
        groceries: GraphQLList,
        transportation: GraphQLList,
        shopping: GraphQLList,
        entertainment: GraphQLList,
        personal: GraphQLList,
        other: GraphQLList 
    })
});


module.exports = AccountType;
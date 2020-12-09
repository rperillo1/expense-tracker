import gql from 'graphql-tag';


const getOneAccountQuery = gql`
query getOneAccount($_id: String!) {
    getOneAccount(_id: $_id) {
      name
      balance
      _id
  }
}
`;


export default getOneAccountQuery;
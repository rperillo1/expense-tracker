import React, { useContext, useEffect } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';


function UserList(props) {
    return (
        <div>
            User:
            { !props.data.loading ? props.data.user.name : 'loading' }
        </div>
    )
}

const query = gql`
    {
        user(googleId: "115017414006295624552" ) {
            name
            _id
          }
    }
`;

export default graphql(query)(UserList);
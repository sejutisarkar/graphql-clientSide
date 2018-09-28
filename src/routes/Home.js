import React from 'react';
import gql from 'graphql-tag';
import {Query, graphql} from 'react-apollo';

const allUsersQuery = gql`{
  allUsers {
    id
    email
  }
}`;
const Home = () => (
  <Query query={allUsersQuery}>
    {( {data: {allUsers=[]}, loading }) => {
      if(loading || !allUsers){
        return <div> Loading... </div>
      }
      return (
        allUsers.map((u) => <h1 key={u.id}>{u.email}</h1>)
      );
    }}
  </Query>
);


// export default graphql(allUsersQuery)(Home);
export default Home;

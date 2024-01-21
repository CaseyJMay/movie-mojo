// client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://10.0.0.169:4000/graphql', // Replace with your GraphQL server's URL
  cache: new InMemoryCache(),
});

export default client;
import { ApolloClient, InMemoryCache } from '@apollo/client';
export const client = new ApolloClient({
  uri: 'https://graphql-user-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

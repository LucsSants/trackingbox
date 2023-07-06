import { ApolloClient, InMemoryCache } from '@apollo/client'

import { HYGRAPH_URL } from '@env'

const client = new ApolloClient({
  uri: HYGRAPH_URL,
  cache: new InMemoryCache(),
});

export default client;


import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create an HTTP link to your GraphQL server
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_ENDPOINT, // Replace with your GraphQL endpoint
});

// Create an auth link (without the token for now)
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// Combine links
const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

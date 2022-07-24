import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Clients, Navbar } from "./components";

// remove console warning after caching
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Clients />
    </ApolloProvider>
  );
}

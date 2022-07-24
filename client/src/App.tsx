import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Clients, Navbar } from "./components";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Clients />
    </ApolloProvider>
  );
}

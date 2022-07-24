import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Navbar } from "./components";

const client = new ApolloClient({
  uri: "http://localhost/graphql",
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
    </ApolloProvider>
  );
}

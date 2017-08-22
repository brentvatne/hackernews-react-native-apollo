import React from 'react';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo';

import HackerNews from './components/HackerNews';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6nypgtb224m0143b2gstire',
});

const client = new ApolloClient({
  networkInterface,
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <HackerNews />
      </ApolloProvider>
    );
  }
}
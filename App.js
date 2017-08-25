import React from 'react';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo';
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';
import { AppLoading } from 'expo';
import { getUser, loadUserAsync } from 'react-native-authentication-helpers';

import HackerNews from './components/HackerNews';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6nypgtb224m0143b2gstire',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const user = getUser();
      req.options.headers.authorization = user ? `Bearer ${user.token}` : null;
      next();
    },
  },
]);

const wsClient = new SubscriptionClient(
  'wss://subscriptions.us-west-2.graph.cool/v1/cj6nypgtb224m0143b2gstire',
  {
    reconnect: true,
    connectionParams: {
      authToken: getUser() && getUser().token,
    },
  }
);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  componentDidMount() {
    this._loadAppDataAsync();
  }

  _loadAppDataAsync = async () => {
    try {
      await loadUserAsync();
    } catch (e) {
      console.warn('Unable to load user data from disk');
    } finally {
      this.setState({ appIsReady: true });
    }
  };

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        <HackerNews />
      </ApolloProvider>
    );
  }
}

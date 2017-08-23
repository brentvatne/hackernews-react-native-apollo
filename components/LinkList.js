import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { graphql, gql } from 'react-apollo';

import HeaderActions from './HeaderActions';
import Link from './Link';

class LinkList extends Component {
  static navigationOptions = props => {
    return {
      title: 'Hacker News',
      headerRight: <HeaderActions.Right navigation={props.navigation} />,
    };
  };

  state = {
    refreshing: false,
  };

  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading links...</Text>
        </View>
      );
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return (
        <View style={styles.container}>
          <Text>Error</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.allLinksQuery.allLinks}
        keyExtractor={link => link.id}
        onRefresh={this._handleRefresh}
        refreshing={this.state.refreshing}
        renderItem={({ item }) => <Link link={item} />}
        style={styles.container}
      />
    );
  }

  _handleRefresh = async () => {
    try {
      this.setState({ refreshing: true });
      await this.props.allLinksQuery.refetch();
    } finally {
      this.setState({ refreshing: false });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  loadingText: {
    marginTop: 5,
    color: '#888',
  },
});

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);

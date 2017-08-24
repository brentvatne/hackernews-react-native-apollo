import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { graphql, gql } from 'react-apollo';

import Colors from '../constants/Colors';
import HeaderActions from './HeaderActions';
import Link from './Link';

class LinkList extends Component {
  static navigationOptions = props => {
    return {
      title: 'Hacker News',
      headerRight: <HeaderActions.Right navigation={props.navigation} />,
      ...Platform.select({
        ios: {
          headerLeft: <HeaderActions.Left navigation={props.navigation} />,
        },
      }),
    };
  };

  state = {
    refreshing: false,
  };

  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Platform.OS === 'android' ? Colors.orange : '#ccc'}
          />
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
        renderItem={({ item, index }) =>
          <Link
            updateStoreAfterVote={this._updateCacheAfterVote}
            index={index}
            link={item}
          />}
        style={styles.container}
        contentContainerStyle={styles.content}
      />
    );
  }

  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: ALL_LINKS_QUERY });

    const votedLink = data.allLinks.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  };

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
    backgroundColor: '#e4e4e4',
  },
  content: {
    paddingBottom: 10,
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

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);

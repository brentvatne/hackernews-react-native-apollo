import React, { Component } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { graphql, gql } from 'react-apollo';
import Link from './Link';

class LinkList extends Component {
  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
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

    const linksToRender = this.props.allLinksQuery.allLinks;
    return (
      <ScrollView style={styles.container}>
        {linksToRender.map(link => <Link key={link.id} link={link} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

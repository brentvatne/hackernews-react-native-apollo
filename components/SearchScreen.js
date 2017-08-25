import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import SearchLayout from 'react-navigation-addon-search-layout';
import { gql, withApollo } from 'react-apollo';

import Colors from '../constants/Colors';
import LinkList from './LinkList';

class SearchScreen extends React.Component {
  state = {
    links: [],
    searchText: '',
    loading: false,
  };

  render() {
    return (
      <SearchLayout
        headerBackgroundColor={Colors.orange}
        headerTintColor="#fff"
        onChangeQuery={this._handleQueryChange}
        onSubmit={this._executeSearch}
        searchInputUnderlineColorAndroid="#f8f8f8">
        <LinkList
          hideNumbers={true}
          loading={this.state.loading}
          links={this.state.links}
          error={this.state.error}
          onRefresh={this._executeSearch}
          onVote={() => {
            /* we will fill this in later! */
          }}
        />
      </SearchLayout>
    );
  }

  _handleQueryChange = searchText => {
    this.setState({ searchText });
  };

  _executeSearch = async () => {
    try {
      this.setState({ loading: true });
      const { searchText } = this.state;
      const result = await this.props.client.query({
        query: ALL_LINKS_SEARCH_QUERY,
        variables: { searchText },
      });
      const links = result.data.allLinks;
      this.setState({ links });
    } finally {
      this.setState({ loading: false });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(
      filter: {
        OR: [
          { url_contains: $searchText }
          { description_contains: $searchText }
        ]
      }
    ) {
      id
      url
      description
      createdAt
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

export default withApollo(SearchScreen);

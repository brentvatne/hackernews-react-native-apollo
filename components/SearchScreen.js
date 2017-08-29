import React from 'react';
import { Platform } from 'react-native';
import SearchLayout from 'react-navigation-addon-search-layout';
import { gql, withApollo } from 'react-apollo';

import Colors from '../constants/Colors';
import LinkList from './LinkList';
import Link from './Link';

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
        searchInputSelectionColor="#fff"
        searchInputTextColor={Platform.OS === 'android' ? "#fff" : 'black'}
        searchInputPlaceholderTextColor={
          Platform.OS === 'ios' ? '#898989' : '#fafafa'
        }>
        <LinkList
          hideNumbers={true}
          loading={this.state.loading}
          links={this.state.links}
          error={this.state.error}
          onVote={this._updateCacheAfterVote}
        />
      </SearchLayout>
    );
  }

  _handleQueryChange = searchText => {
    this.setState({ searchText });
  };

  _updateCacheAfterVote = (store, createVote, linkId) => {
    const votedLinkId = this.state.links.findIndex(link => link.id === linkId);
    const votedLink = this.state.links[votedLinkId];
    let links = [...this.state.links];
    links[votedLinkId] = {
      ...votedLink,
      votes: createVote.link.votes,
    };

    this.setState({
      links,
    });
  };

  _executeSearch = async () => {
    const { searchText } = this.state;
    if (!searchText) {
      this.setState({ links: [] });
      return;
    }

    try {
      this.setState({ loading: true });
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
      ...LinkFragment
    }
  }
  ${Link.fragments.link}
`;

export default withApollo(SearchScreen);

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { graphql, gql } from 'react-apollo';

import LinkList from './LinkList';

const LINKS_PER_PAGE = 10;

class NewLinksList extends Component {
  componentDidMount() {
    this._subscribeToNewVotes();
  }

  render() {
    const allLinksQuery = this.props.allLinksQuery || {};

    return (
      <LinkList
        error={allLinksQuery.error}
        loading={allLinksQuery.loading}
        links={allLinksQuery.allLinks}
        canLoadMore={
          allLinksQuery.allLinks &&
          allLinksQuery._allLinksMeta.count > allLinksQuery.allLinks.length
        }
        onLoadMore={this._handleLoadMore}
        onRefresh={this._handleRefresh}
        onVote={this._updateCacheAfterVote}
      />
    );
  }

  _subscribeToNewVotes = () => {
    this.props.allLinksQuery.subscribeToMore({
      document: gql`
        subscription {
          Vote(filter: { mutation_in: [CREATED] }) {
            node {
              id
              link {
                id
                url
                description
                createdAt
                score
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
              user {
                id
              }
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const votedLinkIndex = previous.allLinks.findIndex(
          link => link.id === subscriptionData.data.Vote.node.link.id
        );
        const link = subscriptionData.data.Vote.node.link;
        const newAllLinks = previous.allLinks.slice();
        newAllLinks[votedLinkIndex] = link;
        const result = {
          ...previous,
          allLinks: newAllLinks,
        };
        return result;
      },
    });
  };

  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({
      query: ALL_LINKS_QUERY,
      variables: this.props.allLinksQuery.variables,
    });
    const votedLink = data.allLinks.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  };

  _handleRefresh = () => {
    return this.props.allLinksQuery.refetch();
  };

  _handleLoadMore = () => {
    this.props.loadMoreLinks();
  };
}

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int) {
    allLinks(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      createdAt
      url
      description
      score
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
    _allLinksMeta {
      count
    }
  }
`;

export default graphql(ALL_LINKS_QUERY, {
  name: 'allLinksQuery',
  options: props => ({
    variables: {
      first: LINKS_PER_PAGE,
      skip: 0,
    },
    fetchPolicy: 'network-only',
  }),
  props: ({ allLinksQuery }, ownProps) => {
    let skip = 0;
    if (allLinksQuery.allLinks) {
      skip = allLinksQuery.allLinks.length;
    }

    return {
      allLinksQuery,
      ...ownProps,
      loadMoreLinks: () => {
        return allLinksQuery.fetchMore({
          variables: {
            first: LINKS_PER_PAGE,
            skip,
          },
          updateQuery: (previous, { fetchMoreResult }) => {
            if (!fetchMoreResult.allLinks) {
              return previous;
            }
            return Object.assign({}, previous, {
              allLinks: [...previous.allLinks, ...fetchMoreResult.allLinks],
              _allLinksMeta: fetchMoreResult._allLinksMeta,
            });
          },
        });
      },
    };
  },
})(NewLinksList);

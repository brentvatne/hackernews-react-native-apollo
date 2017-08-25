import React, { Component } from 'react';
import { Platform } from 'react-native';
import { graphql, gql } from 'react-apollo';

import HeaderActions from './HeaderActions';
import LinkList from './LinkList';

class LinksScreen extends Component {
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

  componentDidMount() {
    this._subscribeToNewLinks();
    this._subscribeToNewVotes();
  }

  render() {
    const { allLinksQuery } = this.props;

    return (
      <LinkList
        error={allLinksQuery && allLinksQuery.error}
        loading={allLinksQuery && allLinksQuery.loading}
        links={allLinksQuery && allLinksQuery.allLinks}
        onRefresh={this._handleRefresh}
        onVote={this._updateCacheAfterVote}
      />
    );
  }

  _subscribeToNewLinks = () => {
    this.props.allLinksQuery.subscribeToMore({
      document: gql`
        subscription {
          Link(filter: { mutation_in: [CREATED] }) {
            node {
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
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const linkExists = previous.allLinks.find(
          link => link.id === subscriptionData.data.Link.node.id
        );

        if (linkExists) {
          return previous;
        }

        const newAllLinks = [
          subscriptionData.data.Link.node,
          ...previous.allLinks,
        ];
        const result = {
          ...previous,
          allLinks: newAllLinks,
        };
        return result;
      },
    });
  };

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
    const data = store.readQuery({ query: ALL_LINKS_QUERY });

    const votedLink = data.allLinks.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  };

  _handleRefresh = () => {
    return this.props.allLinksQuery.refetch();
  };
}

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks(orderBy: createdAt_DESC) {
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

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinksScreen);

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

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinksScreen);

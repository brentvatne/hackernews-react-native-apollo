import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { gql, graphql } from 'react-apollo';
import Touchable from 'react-native-platform-touchable';
import { WebBrowser } from 'expo';
import { withUser } from 'react-native-authentication-helpers';

import timeDifferenceForDate from '../utils/timeDifferenceForDate';

class Link extends Component {
  render() {
    const { postedBy } = this.props.link;
    const postedByName = postedBy || 'Unknown';

    return (
      <Touchable style={styles.button} onPress={this._openBrowser}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.number}>
              {this.props.index + 1}.
            </Text>
            <View>
              <Text style={styles.description}>
                {this.props.link.description}
              </Text>
              <Text style={styles.url} numberOfLines={1}>
                {this.props.link.url}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Touchable
              onPress={this.props.user && this._voteForLink}
              style={styles.col}>
              <Text style={styles.meta} numberOfLines={1}>
                {this.props.user && '▲'} {this.props.link.votes.length} votes
              </Text>
            </Touchable>
            <View style={[styles.col, styles.centerCol]}>
              <Text style={styles.meta} numberOfLines={1}>
                by {postedByName}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.meta} numberOfLines={1}>
                {timeDifferenceForDate(this.props.link.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }

  _openBrowser = () => {
    let url = this.props.link.url;
    if (!url.includes('http')) {
      alert('Unable to open invalid url');
    } else {
      WebBrowser.openBrowserAsync(this.props.link.url);
    }
  };

  _voteForLink = async () => {
    const userId = this.props.user.id;
    const voterIds = this.props.link.votes.map(vote => vote.user.id);
    if (voterIds.includes(userId)) {
      console.log(`User (${userId}) already voted for this link.`);
      return;
    }

    const linkId = this.props.link.id;
    await this.props.createVoteMutation({
      variables: {
        userId,
        linkId,
      },
      update: (store, { data: { createVote } }) => {
        this.props.updateStoreAfterVote(store, createVote, linkId);
      },
    });
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '500',
    paddingRight: 5,
  },
  number: {
    fontSize: 17,
    lineHeight: 25,
    color: '#a6a6a6',
    fontWeight: '500',
    marginLeft: 10,
    marginRight: 5,
  },
  upvoteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  centerCol: {
    paddingHorizontal: 5,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  meta: {
    fontSize: 12,
    color: '#a6a6a6',
  },
  url: {
    fontSize: 13,
    color: '#888',
  },
});

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
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
`;

const LinkWithUser = withUser(Link);
export default graphql(CREATE_VOTE_MUTATION, {
  name: 'createVoteMutation',
})(LinkWithUser);

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { gql, graphql } from 'react-apollo';
import Touchable from 'react-native-platform-touchable';
import { WebBrowser } from 'expo';
import { withUser } from 'react-native-authentication-helpers';

import Colors from '../constants/Colors';
import { maybeAddProtocol, getHostname } from '../utils/url';
import timeDifferenceForDate from '../utils/timeDifferenceForDate';

class Link extends PureComponent {
  render() {
    const { postedBy } = this.props.link;
    const postedByName = (postedBy && postedBy.name) || 'Unknown';
    const showNumbers = !this.props.hideNumbers;

    return (
      <View style={styles.container}>
        <Touchable
          delayPressIn={130}
          style={styles.button}
          onPress={this._openBrowser}>
          <View style={styles.header}>
            {showNumbers &&
              <Text style={styles.number}>
                {this.props.index + 1}.
              </Text>}
            <View style={styles.content}>
              <Text style={styles.description} numberOfLines={1}>
                {this.props.link.description}
              </Text>
              <Text style={styles.url} numberOfLines={1}>
                {getHostname(this.props.link.url)}
              </Text>
            </View>
          </View>
        </Touchable>

        <View style={styles.footer}>
          <Touchable
            onPress={this.props.user && this._voteForLink}
            style={styles.col}>
            <Text
              style={[
                styles.meta,
                this._userVotedForLink() && styles.metaHighlight,
              ]}
              numberOfLines={1}>
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
    );
  }

  _openBrowser = () => {
    let url = maybeAddProtocol(this.props.link.url);
    WebBrowser.openBrowserAsync(url);
  };

  _userVotedForLink = () => {
    if (!this.props.user) {
      return false;
    }

    return !!this.props.link.votes.find(
      vote => vote.user.id === this.props.user.id
    );
  };

  _voteForLink = async () => {
    const userId = this.props.user.id;
    if (this._userVotedForLink()) {
      console.log(`User already voted for this link.`);
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
  container: {
    backgroundColor: '#f9f9f9',
    marginTop: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    justifyContent: 'flex-start',
  },
  button: {
    paddingLeft: 15,
  },
  content: {
    flex: 1,
    paddingLeft: 5,
  },
  header: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    paddingRight: 5,
  },
  number: {
    fontSize: 17,
    lineHeight: 25,
    color: '#a6a6a6',
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  upvoteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
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
    borderColor: '#dcdcdc',
  },
  meta: {
    fontSize: 12,
    color: '#a6a6a6',
    paddingHorizontal: 10,
  },
  metaHighlight: {
    color: Colors.orange,
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

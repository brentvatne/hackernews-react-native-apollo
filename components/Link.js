import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Touchable from 'react-native-platform-touchable';

class Link extends Component {
  render() {
    return (
      <Touchable>
        <Text>
          {this.props.link.description} ({this.props.link.url})
        </Text>
      </Touchable>
    );
  }

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
  };
}

export default Link;

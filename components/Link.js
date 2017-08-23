import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

class Link extends Component {
  render() {
    return (
      <Touchable style={styles.container}>
        <View>
          <Text style={styles.description}>
            {this.props.link.description}
          </Text>
          <Text>
            {this.props.link.url}
          </Text>
        </View>
      </Touchable>
    );
  }

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginVertical: 3,
    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  description: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default Link;

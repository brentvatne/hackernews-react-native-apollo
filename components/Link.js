import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { WebBrowser } from 'expo';

class Link extends Component {
  render() {
    return (
      <Touchable style={styles.container} onPress={this._openBrowser}>
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

  _openBrowser = () => {
    let url = this.props.link.url;
    if (!url.includes('http')) {
      alert('Unable to open invalid url');
    } else {
      WebBrowser.openBrowserAsync(this.props.link.url);
    }
  };

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginVertical: 3,
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  description: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default Link;

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import LinkList from './LinkList';
import CreateLink from './CreateLink';

export default class HackerNews extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <LinkList /> */}
        <CreateLink />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

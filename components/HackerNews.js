import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import LinkList from './LinkList';

export default class HackerNews extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinkList />
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

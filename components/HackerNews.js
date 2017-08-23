import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import RootStackNavigator from './RootStackNavigator';

export default class HackerNews extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStackNavigator />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: Platform.OS === 'android' ? Colors.darkOrange : '#fff',
  },
});

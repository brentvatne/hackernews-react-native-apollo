import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { withUser, clearUser } from 'react-native-authentication-helpers';
import Button from 'react-native-platform-button';

import HeaderIconButton from './HeaderIconButton';
const isSmallDevice = Dimensions.get('window').width < 375;

class HeaderActionsRight extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {this.props.user &&
          <HeaderIconButton
            name="create"
            onPress={() => navigate('CreateLink')}
          />}

        <HeaderIconButton name="search" onPress={() => navigate('Search')} />

        {Platform.OS === 'android' &&
          !this.props.user &&
          <HeaderIconButton
            name="authenticate"
            onPress={() => navigate('Authentication')}
          />}
      </View>
    );
  }
}

class HeaderActionsLeft extends Component {
  render() {
    if (Platform.OS === 'android') {
      return null;
    }

    return (
      <View style={styles.container}>
        {this.props.user
          ? <Button
              fontSize={isSmallDevice ? 15 : 17}
              title="Sign Out"
              color="#fff"
              onPress={clearUser}
            />
          : <Button
              fontSize={isSmallDevice ? 15 : 17}
              title="Sign In"
              color="#fff"
              onPress={() => this.props.navigation.navigate('Authentication')}
            />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 5 : 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default {
  Right: withUser(HeaderActionsRight),
  Left: withUser(HeaderActionsLeft),
};

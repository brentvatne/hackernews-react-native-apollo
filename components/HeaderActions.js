import React, { Component } from 'react';
import { Alert, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { withUser, clearUser } from 'react-native-authentication-helpers';
import Button from 'react-native-platform-button';

import HeaderIconButton from './HeaderIconButton';
import getNavigationParam from '../utils/getNavigationParam';
const isSmallDevice = Dimensions.get('window').width < 375;

function promptSignOut() {
  Alert.alert(
    'Confirm',
    'Are you sure you want to sign out?',
    [
      { text: 'Sign out', onPress: clearUser },
      { text: 'Cancel', style: 'cancel' },
    ],
    { cancelable: true }
  );
}

class HeaderActionsRight extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { onCreateLink } = this.props;

    return (
      <View style={styles.container}>
        {this.props.user && (
          <HeaderIconButton
            name="ios-create"
            onPress={() => navigate('CreateLink', { onCreateLink })}
          />
        )}

        {!this.props.user &&
          Platform.OS === 'android' && (
            <HeaderIconButton
              name="authenticate"
              onPress={() => navigate('Authentication')}
            />
          )}

        {this.props.user &&
          Platform.OS === 'android' && (
            <HeaderIconButton name="user" onPress={promptSignOut} />
          )}

        <HeaderIconButton name="search" onPress={() => navigate('Search')} />
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
        {this.props.user ? (
          <Button
            fontSize={isSmallDevice ? 15 : 17}
            title="Sign Out"
            color="#fff"
            onPress={clearUser}
          />
        ) : (
          <Button
            fontSize={isSmallDevice ? 15 : 17}
            title="Sign In"
            color="#fff"
            onPress={() => this.props.navigation.navigate('Authentication')}
          />
        )}
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

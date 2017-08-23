import React, { Component } from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';

import HeaderIconButton from './HeaderIconButton';

class HeaderActionsRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderIconButton
          name="create"
          onPress={() => this.props.navigation.navigate('CreateLink')}
        />

        {Platform.OS === 'android' &&
          <HeaderIconButton
            name="authenticate"
            onPress={() => this.props.navigation.navigate('Authentication')}
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
        <Button
          title="Sign In"
          color="#fff"
          onPress={() => this.props.navigation.navigate('Authentication')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default {
  Right: HeaderActionsRight,
  Left: HeaderActionsLeft,
};

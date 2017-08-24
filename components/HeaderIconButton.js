import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import Touchable from 'react-native-platform-touchable';

export default class HeaderIconButton extends Component {
  render() {
    let presetIconName = IconNames[this.props.name];

    return (
      <Touchable
        hitSlop={{
          top: 15,
          bottom: 15,
          left: 10,
          right: 10,
        }}
        background={Touchable.Ripple('#fff', true)}
        style={styles.button}
        onPress={this.props.onPress}>
        <Icon.Ionicons
          name={presetIconName || this.props.name}
          style={{ color: '#fff' }}
          size={25}
        />
      </Touchable>
    );
  }
}

const IconNames = {
  ...Platform.select({
    ios: {
      create: 'ios-create-outline',
      search: 'ios-search-outline',
    },
    android: {
      create: 'md-create',
      search: 'md-search',
    },
  }),
  authenticate: 'md-key',
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginLeft: Platform.OS === 'ios' ? 12 : 15,
  },
});

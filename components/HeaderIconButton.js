import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Icon } from 'expo';

export default class HeaderIconButton extends Component {
  render() {
    let presetIconName = IconNames[this.props.name];

    return (
      <Touchable
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 5,
          right: 5,
        }}
        background={Touchable.Ripple('#555', true)}
        style={styles.button}
        onPress={this.props.onPress}>
        <Icon.Ionicons
          name={presetIconName || this.props.name}
          style={{ color: '#fff' }}
          size={28}
        />
      </Touchable>
    );
  }
}

const IconNames = {
  ...Platform.select({
    ios: {
      create: 'ios-create-outline',
    },
    android: {
      create: 'md-create',
    },
  }),
  authenticate: 'md-key',
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginLeft: 10,
  },
});

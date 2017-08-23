import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Icon } from 'expo';
import Touchable from 'react-native-platform-touchable';

const ButtonHitSlop = {
  top: 10,
  bottom: 10,
  left: 5,
  right: 5,
};

const IconNames = {
  ...Platform.select({
    ios: {
      create: 'ios-create-outline',
    },
    android: {
      create: 'md-create',
    },
  }),
};

class HeaderActionsRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Touchable
          hitSlop={ButtonHitSlop}
          background={Touchable.Ripple('#555', true)}
          style={styles.button}
          onPress={() => this.props.navigation.navigate('CreateLink')}>
          <Icon.Ionicons
            name={IconNames.create}
            style={{ color: '#fff' }}
            size={28}
          />
        </Touchable>
      </View>
    );
  }
}

export default {
  Right: HeaderActionsRight,
  Left: () => null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
});

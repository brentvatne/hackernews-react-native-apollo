import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'expo';
import Touchable from 'react-native-platform-touchable';

const ButtonHitSlop = {
  top: 10,
  bottom: 10,
  left: 5,
  right: 5,
}

export default class LinkListHeaderRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Touchable
          hitSlop={ButtonHitSlop}
          onPress={() => this.props.navigation.navigate('CreateLink')}>
          <Icon.Ionicons
            name="ios-create-outline"
            style={{ color: '#fff' }}
            size={28}
          />
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
    paddingHorizontal: 10,
  },
});

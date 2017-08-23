import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

import Colors from '../constants/Colors';

export default class StyledTextInput extends React.Component {
  render() {
    let { lastStyledTextInputInGroup, ...props } = this.props;

    return (
      <TextInput
        underlineColorAndroid="#888"
        selectionColor={Colors.orange}
        autoCorrect={false}
        {...props}
        style={[
          styles.input,
          lastStyledTextInputInGroup && styles.lastInGroup,
          this.props.style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        padding: 15,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        borderBottomWidth: 0,
      },
      android: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5,
      },
    }),
  },
  lastInGroup: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

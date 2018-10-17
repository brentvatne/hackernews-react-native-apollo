import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

import Colors from '../constants/Colors';

export default class StyledTextInput extends React.Component {
  render() {
    let { lastStyledTextInputInGroup, ...props } = this.props;

    return (
      <TextInput
        autoCorrect={false}
        ref={view => { this._input = view; }}
        selectionColor={Colors.orange}
        underlineColorAndroid="#888"
        {...props}
        style={[
          styles.input,
          lastStyledTextInputInGroup && styles.lastInGroup,
          this.props.style,
        ]}
      />
    );
  }

  focus() {
    this._input.focus();
  }
}

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        padding: 15,
        backgroundColor: Colors.white,
        borderColor: Colors.lightGrey,
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
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    marginBottom: 10,
  },
});

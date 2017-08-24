import { Constants } from 'expo';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import SearchScreen from './search/SearchScreen';

export default class Search extends React.Component {
  state = {
    text: '',
  };

  _renderResults = query => {
    return (
      <View>
        <Text>
          {query}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <SearchScreen
        headerBackgroundColor={Colors.orange}
        headerTintColor="#fff"
        searchInputUnderlineColorAndroid="#f8f8f8"
        onChangeQuery={q => this.setState({ text: q })}
        debounce={500}
        renderResults={this._renderResults}
      />
    );
  }
}

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    height: 70,
    paddingTop: Constants.statusBarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(46, 59, 76, 0.10)',

    // this should be configurable
    backgroundColor: Colors.orange,
  },
});

import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import SearchScreen from 'react-navigation-addon-search-screen';

import Colors from '../constants/Colors';

export default class Search extends React.Component {
  render() {
    return (
      <SearchScreen
        headerBackgroundColor={Colors.orange}
        headerTintColor="#fff"
        searchInputUnderlineColorAndroid="#f8f8f8"
        renderResults={this._renderResults}
        debounce={500}
      />
    );
  }

  _renderResults = query => {
    return (
      <View>
        <Text>
          {query}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

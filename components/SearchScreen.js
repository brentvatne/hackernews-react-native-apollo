import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import SearchLayout from 'react-navigation-addon-search-screen';

import Colors from '../constants/Colors';


class SearchScreen extends React.Component {
  state = {
    links: [],
  }

  render() {
    return (
      <SearchLayout
        headerBackgroundColor={Colors.orange}
        headerTintColor="#fff"
        searchInputUnderlineColorAndroid="#f8f8f8"
        renderResults={this._renderResults}
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

export default SearchScreen;
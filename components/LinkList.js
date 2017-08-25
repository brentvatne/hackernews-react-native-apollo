import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import Link from './Link';

export default class LinkList extends Component {
  render() {
    if (this.props.loading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator
            size="large"
            color={Platform.OS === 'android' ? Colors.orange : '#ccc'}
          />
          <Text style={styles.loadingText}>Loading links...</Text>
        </View>
      );
    }

    if (this.props.error) {
      return (
        <View style={styles.container}>
          <Text>Error</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.links}
        keyExtractor={link => link.id}
        onRefresh={this.props.onRefresh}
        refreshing={!!this.props.refreshing}
        renderItem={({ item, index }) =>
          <Link
            hideNumbers={this.props.hideNumbers}
            updateStoreAfterVote={this.props.onVote}
            index={index}
            link={item}
          />}
        style={styles.container}
        contentContainerStyle={styles.content}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  content: {
    paddingBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  loadingText: {
    marginTop: 5,
    color: '#888',
  },
});

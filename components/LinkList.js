import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';

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
        ListFooterComponent={this._renderFooter}
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

  _renderFooter = () => {
    if (!this.props.canLoadMore || !this.props.onLoadMore) {
      return null;
    }

    return (
      <Touchable style={styles.loadMoreButton} onPress={this.props.onLoadMore}>
        <Text style={styles.loadMoreText}>Load more</Text>
      </Touchable>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  content: {
    paddingBottom: 5,
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
  loadMoreButton: {
    marginTop: 5,
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
    borderColor: '#eee',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    color: '#888',
  },
});

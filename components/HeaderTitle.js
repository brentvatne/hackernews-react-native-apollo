import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

export default class HeaderTitle extends PureComponent {
  render() {
    let { selectedList } = this.props;
    let listName = selectedList[0].toUpperCase() + selectedList.slice(1);

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={this.props.onPress}>
        {Platform.OS === 'ios'
          ? this._renderTitleIOS(listName)
          : this._renderTitleAndroid(listName)}
      </TouchableOpacity>
    );
  }

  _renderTitleIOS(listName) {
    return (
      <View style={{ justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Hacker News</Text>
          <Text style={styles.arrow}>▼</Text>
        </View>
        <Text style={styles.subtitle}>{listName} Links</Text>
      </View>
    );
  }

  _renderTitleAndroid(listName) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{listName} Links</Text>
        <Text style={styles.arrow}>▼</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: Platform.OS === 'ios' ? 0 : 20,
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '500',
      },
      android: {
        fontSize: 20,
      },
    }),
  },
  arrow: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    marginLeft: Platform.OS === 'ios' ? 3 : 5,
    alignSelf: 'center',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.lightGrey,
    marginTop: -1,
    textAlign: 'center',
  },
});

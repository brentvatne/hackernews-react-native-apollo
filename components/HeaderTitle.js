import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class HeaderTitle extends PureComponent {
  render() {
    let { selectedList } = this.props;
    let listName = selectedList[0].toUpperCase() + selectedList.slice(1);

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={this.props.onPress}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Hacker News</Text>
          <Text style={styles.arrow}>▼</Text>
        </View>
        <Text style={styles.subtitle}>
          {listName} Links
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        alignItems: 'center',
      },
      android: {
        paddingLeft: 15,
      },
    }),
  },
  title: {
    color: '#fff',
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
    fontSize: Platform.OS === 'ios' ? 10 : 15,
    alignSelf: 'center',
    marginLeft: Platform.OS === 'ios' ? 3 : 5,
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#eee',
    marginTop: -1,
  },
});

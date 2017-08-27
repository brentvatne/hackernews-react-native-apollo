import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <Text style={styles.subtitle}>{listName} Links</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 10,
    alignSelf: 'center',
    marginLeft: 3,
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#eee',
    marginTop: -1,
  },
});

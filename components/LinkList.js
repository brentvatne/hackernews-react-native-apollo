import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Link from './Link';

class LinkList extends Component {
  render() {
    const linksToRender = [
      {
        id: '1',
        description: 'The Coolest GraphQL Backend 😎',
        url: 'https://www.graph.cool',
      },
      {
        id: '2',
        description: 'The Best GraphQL Client',
        url: 'http://dev.apollodata.com/',
      },
    ];

    return (
      <ScrollView style={styles.container}>
        {linksToRender.map(link => <Link key={link.id} link={link} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LinkList;

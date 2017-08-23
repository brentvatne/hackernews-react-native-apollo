import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Authentication from './Authentication';
import Colors from '../constants/Colors';
import CreateLink from './CreateLink';
import LinkList from './LinkList';

export default StackNavigator(
  {
    Links: {
      screen: LinkList,
    },
    CreateLink: {
      screen: CreateLink,
    },
    Authentication: {
      screen: Authentication,
    },
  },
  {
    initialRouteName: 'Links',
    cardStyle: {
      backgroundColor: '#fafafa',
    },
    navigationOptions: () => ({
      headerBackTitle: 'Back',
      headerStyle: {
        backgroundColor: Colors.orange,
      },
      headerTintColor: '#fff',
    }),
  }
);

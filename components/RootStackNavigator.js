import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LinkList from './LinkList';
import CreateLink from './CreateLink';

export default StackNavigator(
  {
    Links: {
      screen: LinkList,
    },
    CreateLink: {
      screen: CreateLink,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#fafafa',
    },
    navigationOptions: () => ({
      headerBackTitle: 'Back',
      headerStyle: {
        backgroundColor: '#ff5722',
      },
      headerTintColor: '#fff',
    }),
  }
);
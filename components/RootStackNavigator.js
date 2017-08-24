import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Authentication from './Authentication';
import Colors from '../constants/Colors';
import CreateLink from './CreateLink';
import LinkList from './LinkList';
import Search from './Search';

const MainStack = StackNavigator(
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
      headerPressColorAndroid: '#fff',
      headerStyle: {
        backgroundColor: Colors.orange,
      },
      headerTintColor: '#fff',
    }),
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Search: {
      screen: Search,
    },
  },
  {
    initialRouteName: 'Main',
    cardStyle: {
      backgroundColor: '#fafafa',
    },
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
      },
    }),
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);

export default RootStack;

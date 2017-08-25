import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthenticationScreen from './AuthenticationScreen';
import Colors from '../constants/Colors';
import CreateLinkScreen from './CreateLinkScreen';
import LinksScreen from './LinksScreen';
import SearchScreen from './SearchScreen';

const MainStack = StackNavigator(
  {
    Links: {
      screen: LinksScreen,
    },
    CreateLink: {
      screen: CreateLinkScreen,
    },
    Authentication: {
      screen: AuthenticationScreen,
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

export default StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Search: {
      screen: SearchScreen,
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
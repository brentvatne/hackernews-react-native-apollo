import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AuthenticationScreen from './AuthenticationScreen';
import Colors from '../constants/Colors';
import CreateLinkScreen from './CreateLinkScreen';
import LinksScreen from './LinksScreen';
import SearchScreen from './SearchScreen';

const MainStack = createStackNavigator(
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
      backgroundColor: Colors.almostWhite,
    },
    defaultNavigationOptions: () => ({
      headerBackTitle: 'Back',
      headerPressColorAndroid: Colors.white,
      headerStyle: {
        backgroundColor: Colors.orange,
      },
      headerTintColor: Colors.white,
    }),
  }
);

export default createAppContainer(
  createStackNavigator(
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
        backgroundColor: Colors.almostWhite,
      },
      headerMode: 'none',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: Animated.timing,
        },
      }),
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    }
  )
);

import React, { Component } from 'react';
import {
  Animated,
  BackAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { graphql, gql } from 'react-apollo';
import Touchable from 'react-native-platform-touchable';

import Colors from '../constants/Colors';
import HeaderTitle from './HeaderTitle';
import HeaderActions from './HeaderActions';
import LinkListContainer from './LinkListContainer';
import getNavigationParam from '../utils/getNavigationParam';

const DEFAULT_LIST = 'top';

export default class LinksScreen extends Component {
  static navigationOptions = props => {
    let onPressTitle = getNavigationParam(props.navigation, 'onPressTitle');
    let selectedList = getNavigationParam(
      props.navigation,
      'selectedList',
      DEFAULT_LIST
    );

    return {
      headerTitle: (
        <HeaderTitle onPress={onPressTitle} selectedList={selectedList} />
      ),
      headerRight: <HeaderActions.Right navigation={props.navigation} />,
      ...Platform.select({
        ios: {
          headerLeft: <HeaderActions.Left navigation={props.navigation} />,
        },
      }),
    };
  };

  state = {
    menuIsVisible: false,
    menuAnimatedValue: new Animated.Value(0),
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onPressTitle: this._handlePressTitle,
    });
  }

  render() {
    let selectedList = getNavigationParam(
      this.props.navigation,
      'selectedList',
      DEFAULT_LIST
    );

    let overlayOpacity = this.state.menuAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    });

    let menuTranslateY = this.state.menuAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ flex: 1 }}>
        <LinkListContainer listType={selectedList} />

        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.menuIsVisible ? 'auto' : 'none'}>
          <TouchableWithoutFeedback onPress={this._toggleMenu}>
            <Animated.View
              style={[styles.overlay, { opacity: overlayOpacity }]}
            />
          </TouchableWithoutFeedback>
        </View>
        <Animated.View
          style={[
            styles.menu,
            { transform: [{ translateY: menuTranslateY }] },
          ]}>
          <Touchable
            onPress={() => this._selectList('top')}
            style={[
              styles.menuOption,
              selectedList === 'top' && styles.selectedMenuOption,
            ]}>
            <Text
              style={[
                styles.menuText,
                selectedList === 'top' && styles.selectedMenuText,
              ]}>
              Top
            </Text>
          </Touchable>
          <Touchable
            onPress={() => this._selectList('new')}
            style={[
              styles.menuOption,
              selectedList === 'new' && styles.selectedMenuOption,
            ]}>
            <Text
              style={[
                styles.menuText,
                selectedList === 'new' && styles.selectedMenuText,
              ]}>
              New
            </Text>
          </Touchable>
        </Animated.View>
      </View>
    );
  }

  _handlePressTitle = () => {
    this._toggleMenu();
  };

  _toggleMenu = () => {
    this.setState(
      state => ({
        menuIsVisible: !state.menuIsVisible,
      }),
      () => {
        Animated.spring(this.state.menuAnimatedValue, {
          toValue: this.state.menuIsVisible ? 1 : 0,
          speed: 40,
          bounciness: 0,
          useNativeDriver: true,
        }).start();
      }
    );
  };
  _selectList = list => {
    this._toggleMenu();
    this.props.navigation.setParams({ selectedList: list });
  };
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  menuOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  selectedMenuOption: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  menuText: {
    fontSize: 16,
  },
  selectedMenuText: {
    color: Colors.orange,
  },
});

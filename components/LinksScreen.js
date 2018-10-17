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
const LIST_AFTER_CREATE = 'new';

export default class LinksScreen extends Component {
  static navigationOptions = props => {
    const onPressTitle = getNavigationParam(props.navigation, 'onPressTitle');
    const selectedList = getNavigationParam(
      props.navigation,
      'selectedList',
      DEFAULT_LIST
    );

    const handleCreateLink = () => {
      const selectList = getNavigationParam(
        props.navigation,
        'selectList',
        () => {}
      );
      selectList(LIST_AFTER_CREATE);
    };

    return {
      headerTitle: (
        <HeaderTitle onPress={onPressTitle} selectedList={selectedList} />
      ),
      headerRight: (
        <HeaderActions.Right
          navigation={props.navigation}
          onCreateLink={handleCreateLink}
        />
      ),
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
      selectList: this._selectList,
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

  _hideMenu = () => {
    if (this.state.menuIsVisible) {
      this._toggleMenu();
    }
  };

  _selectList = list => {
    this._hideMenu();
    this.props.navigation.setParams({ selectedList: list });
  };
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Colors.black,
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
  },
  menuOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  selectedMenuOption: {
    backgroundColor: Colors.almostWhite,
  },
  menuText: {
    fontSize: 16,
  },
  selectedMenuText: {
    color: Colors.orange,
  },
});

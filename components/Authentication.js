import React, { Component } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import StyledTextInput from './StyledTextInput';

function inSignUpState(navigationState) {
  return !!(navigationState.params && navigationState.params.signUp);
}

class Authentication extends Component {
  static navigationOptions = ({ navigation }) => {
    // navigationOptions is a static property, so we grab a reference to the
    // _create function on the component through the route params
    const { params } = navigation.state;
    let onSubmitPress = params ? params.onSubmitPress : () => {};

    return {
      title: inSignUpState(navigation.state) ? 'Sign Up' : 'Sign In',
      headerRight:
        Platform.OS === 'ios' &&
        <Button color="#fff" title="Submit" onPress={onSubmitPress} />,
    };
  };

  state = {
    email: '',
    password: '',
    name: '',
  };

  componentWillMount() {
    this.props.navigation.setParams({
      onSubmitPress: this._confirm,
    });
  }

  render() {
    let showSignUpForm = inSignUpState(this.props.navigation.state);

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View style={styles.formInputGroup}>
          {showSignUpForm &&
            <StyledTextInput
              autoFocus={true}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              type="text"
              placeholder="Your name"
            />}
          <StyledTextInput
            autoFocus={true}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            type="text"
            placeholder="Your email address"
          />
          <StyledTextInput
            lastStyledTextInputInGroup={true}
            onChangeText={password => this.setState({ password })}
            type="password"
            placeholder="Choose a safe password"
            value={this.state.password}
          />
        </View>

        <View style={styles.buttonGroup}>
          {Platform.OS === 'android' &&
            <Button
              color="#000"
              onPress={this._confirm}
              title={showSignUpForm ? 'Create account' : 'Login'}
            />}
          <View style={styles.buttonSeparator} />
          <Button
            color={Platform.OS === 'android' ? '#000' : Colors.orange}
            onPress={() =>
              this.props.navigation.setParams({ signUp: !showSignUpForm })}
            title={
              showSignUpForm
                ? 'Already have an account?'
                : 'Need to create an account?'
            }
          />
        </View>
      </ScrollView>
    );
  }

  _confirm = async () => {
    // ... you'll implement this in a bit
  };

  _saveUserData = (id, token) => {
    // localStorage.setItem(GC_USER_ID, id);
    // localStorage.setItem(GC_AUTH_TOKEN, token);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formInputGroup: {
    marginBottom: 5,
    marginTop: 10,
  },
  buttonGroup: {
    marginHorizontal: 10,
  },
  buttonSeparator: {
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
});

export default Authentication;

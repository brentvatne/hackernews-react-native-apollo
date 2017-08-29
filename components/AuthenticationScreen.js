import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-platform-button';
import { setUser } from 'react-native-authentication-helpers';
import { gql, graphql, compose } from 'react-apollo';

import Colors from '../constants/Colors';
import StyledTextInput from './StyledTextInput';

function inSignUpState(navigationState) {
  return !!(navigationState.params && navigationState.params.signUp);
}

class AuthenticationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let onSubmitPress = params ? params.onSubmitPress : () => {};

    return {
      title: inSignUpState(navigation.state) ? 'Sign Up' : 'Sign In',
      headerRight:
        Platform.OS === 'ios' &&
        <Button
          fontSize={17}
          color="#fff"
          title="Submit"
          onPress={onSubmitPress}
        />,
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
              blurOnSubmit={false}
              onChangeText={name => this.setState({ name })}
              onSubmitEditing={() => this._emailInput.focus()}
              type="text"
              placeholder="Your name"
              value={this.state.name}
            />}
          <StyledTextInput
            autoCapitalize="none"
            autoFocus={true}
            blurOnSubmit={false}
            ref={view => {
              this._emailInput = view;
            }}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onSubmitEditing={() => this._passwordInput.focus()}
            type="text"
            placeholder="Your email address"
          />
          <StyledTextInput
            lastStyledTextInputInGroup={true}
            returnKeyType="go"
            ref={view => {
              this._passwordInput = view;
            }}
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={this._confirm}
            blurOnSubmit={true}
            secureTextEntry={true}
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
    const signUp = inSignUpState(this.props.navigation.state);
    const { name, email, password } = this.state;
    if (!email || !password || (signUp && !name)) {
      alert('Please fill in all fields.')
      return;
    }

    try {
      if (signUp) {
        const result = await this.props.createUserMutation({
          variables: {
            name,
            email,
            password,
          },
        });
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        this._saveUserData(id, token);
      } else {
        const result = await this.props.signinUserMutation({
          variables: {
            email,
            password,
          },
        });
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        this._saveUserData(id, token);
      }

      this.props.navigation.goBack();
    } catch (e) {
      alert(e.message);
    }
  };

  _saveUserData = (id, token) => {
    setUser({ id, token });
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

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(AuthenticationScreen);

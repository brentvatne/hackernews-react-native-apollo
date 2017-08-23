import React, { Component } from 'react';
import { Button, Platform, StyleSheet, TextInput, View } from 'react-native';
import { graphql, gql } from 'react-apollo';

import StyledTextInput from './StyledTextInput';

class CreateLink extends Component {
  static navigationOptions = ({ navigation }) => {
    // navigationOptions is a static property, so we grab a reference to the
    // _createLink function on the component through the route params
    const { params } = navigation.state;
    let onDonePress = params ? params.onDonePress : () => {};

    return {
      title: 'New Link',
      headerRight:
        Platform.OS === 'ios' &&
        <Button color="#fff" title="Done" onPress={onDonePress} />,
    };
  };

  state = {
    description: '',
    url: '',
  };

  componentWillMount() {
    this.props.navigation.setParams({
      onDonePress: this._createLink,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StyledTextInput
          autoFocus={true}
          onChangeText={description => this.setState({ description })}
          onSubmitEditing={() => this._urlInput.focus()}
          placeholder="A description for the link"
          returnKeyType="next"
          value={this.state.description}
        />
        <StyledTextInput
          lastStyledTextInputInGroup={true}
          autoCapitalize="none"
          keyboardType="url"
          onChangeText={url => this.setState({ url })}
          onSubmitEditing={this._createLink}
          placeholder="The URL for the link"
          ref={ref => {
            this._urlInput = ref;
          }}
          returnKeyType="done"
          value={this.state.url}
        />

        {Platform.OS === 'android' &&
          <View style={styles.buttonContainer}>
            <Button color="#000" title="Submit" onPress={this._createLink} />
          </View>}
      </View>
    );
  }

  _createLink = async () => {
    const { description, url } = this.state;
    await this.props.createLinkMutation({
      variables: {
        description,
        url,
      },
    });

    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(
  CreateLink
);

import React, { Component } from 'react';
import { Button, Platform, StyleSheet, TextInput, View } from 'react-native';
import { graphql, gql } from 'react-apollo';

import Colors from '../constants/Colors';

class CreateLink extends Component {
  static navigationOptions = (props) => {
    const { params } = props.navigation.state;
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
        <TextInput
          autoCorrect={false}
          autoFocus={true}
          onChangeText={description => this.setState({ description })}
          onSubmitEditing={() => this._urlInput.focus()}
          placeholder="A description for the link"
          returnKeyType="next"
          style={styles.inputField}
          underlineColorAndroid="#888"
          selectionColor={Colors.orange}
          value={this.state.description}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          onChangeText={url => this.setState({ url })}
          onSubmitEditing={this._createLink}
          placeholder="The URL for the link"
          ref={ref => {
            this._urlInput = ref;
          }}
          returnKeyType="done"
          style={[styles.inputField, styles.lastInputField]}
          underlineColorAndroid="#888"
          selectionColor={Colors.orange}
          value={this.state.url}
        />

        {this._maybeRenderButton()}
      </View>
    );
  }

  _maybeRenderButton() {
    if (Platform.OS === 'ios') {
      return;
    }

    return <Button color="#000" title="Submit" onPress={this._createLink} />;
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
  inputField: {
    ...Platform.select({
      ios: {
        padding: 15,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
      },
      android: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5,
      },
    }),
  },
  lastInputField: {
    borderTopWidth: 0,
    marginBottom: 10,
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

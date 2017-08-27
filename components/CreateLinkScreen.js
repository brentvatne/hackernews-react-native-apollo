import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import Button from 'react-native-platform-button';
import { graphql, gql } from 'react-apollo';
import { getUser } from 'react-native-authentication-helpers';

import StyledTextInput from './StyledTextInput';
import { ALL_LINKS_QUERY } from './NewLinksList';

class CreateLinkScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let onDonePress = params ? params.onDonePress : () => {};

    return {
      title: 'New Link',
      headerRight:
        Platform.OS === 'ios' &&
        <Button
          fontSize={17}
          color="#fff"
          title="Done"
          onPress={onDonePress}
        />,
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
          autoCapitalize="none"
          keyboardType="url"
          lastStyledTextInputInGroup={true}
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
    let user = getUser();
    if (!user) {
      console.error('No user logged in');
      return;
    }

    const { description, url } = this.state;
    await this.props.createLinkMutation({
      variables: {
        description,
        url,
        postedById: user.id,
      },
      update: (store, { data: { createLink } }) => {
        try {
          const data = store.readQuery({
            query: ALL_LINKS_QUERY,
            variables: { skip: 0, first: 10 },
          });
          data.allLinks.splice(0, 0, createLink);
          store.writeQuery({
            query: ALL_LINKS_QUERY,
            variables: { skip: 0, first: 10 },
            data,
          });
        } catch (e) {
          console.log(
            "New links query has not been loaded, can't add newly created link to cache"
          );
        }
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
  mutation CreateLinkMutation(
    $description: String!
    $url: String!
    $postedById: ID!
  ) {
    createLink(
      description: $description
      url: $url
      score: 0
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      score
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(
  CreateLinkScreen
);

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          onChangeText={description => this.setState({ description })}
          onSubmitEditing={() => this._urlInput.focus()}
          placeholder="A description for the link"
          returnKeyType="next"
          style={styles.inputField}
          value={this.state.description}
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="url"
          onChangeText={url => this.setState({ url })}
          onSubmitEditing={this._createLink}
          placeholder="The URL for the link"
          ref={ref => {
            this._urlInput = ref;
          }}
          returnKeyType="done"
          style={styles.inputField}
          value={this.state.url}
        />
        <Button title="Submit" onPress={this._createLink} />
      </View>
    );
  }

  _createLink = async () => {
    // ... you'll implement this in a bit
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 5,
  },
  inputField: {
    marginBottom: 5,
    padding: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
});

export default CreateLink;

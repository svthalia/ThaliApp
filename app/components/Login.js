import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedIn, login } = this.props;
    console.log(loggedIn);

    return (
      <View>
      <TextInput 
        placeholder="Username" 
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry={true}
      />
      <Button title="Log in" onPress={login}/>
      <Text>{loggedIn ? 'MEMES' : 'MMS'}</Text>
      </View>
    );
  }
}

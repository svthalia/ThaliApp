import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/login';

const loginResult = (status) => {
  switch (status) {
    case 'progress':
      return 'Logging in';
    case 'failure':
      return 'Login failed';
    case 'logout':
      return 'Logout successful';
    default:
      return '';
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { loginState, login } = this.props;
    return (
      <View style={{backgroundColor:'#FF00FF'}}>
        <View  style={{flex:1,
          alignItems: 'flex-start'}}>
          <View style={{marginLeft:10}}>
            <TextInput
              style={styles.input}
              placeholder="Gebruikersnaam"
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              style={styles.input}
              placeholder="Wachtwoord"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
          </View>
      </View>
        <View style={{ justifyContent:'flex-start', alignItems: 'center', marginTop: 50}}>
            <Button color='#362b2b' style={styles.blackbutton} title="Inloggen" onPress={() => login(this.state.username, this.state.password)}/>
        </View>
        <View style={{ justifyContent:'flex-start', alignItems: 'center'}}>
          <Text style={styles.notlogintext}>
            Wachtwoord vergeten?
          </Text>
          <Text style={styles.notlogintext}>
            Ik heb geen account
          </Text>
        </View>
        <Text>{loginResult(loginState)}</Text>
      </View>
    );
  }
}

Login.propTypes = {
  loginState: React.PropTypes.string.isRequired,
  login: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => state.session;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  blackbutton: {
    flex:0.2,
    width:300,
  },
  input: {
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  notlogintext: {
    color: '#362b2b',
    marginTop: 10,
  }
});

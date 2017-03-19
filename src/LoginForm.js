import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native'
import firebase from 'firebase'
import Wrapper from './Wrapper'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  _onPress = () => {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail)
      })
  }

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Failed!',
      loading: false
    })
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  renderButton = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />
    }

    return (
      <TouchableOpacity 
        style={styles.btn}
        onPress={this._onPress}
      >
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Wrapper style={styles.wrapper}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={false}
            placeholder='Email@email.com'
            placeholderTextColor='#fff'
            label='Email'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor='#fff'
            placeholder='Password'
            label='Password'
            returnKeyType='go'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        { this.renderButton() }
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    paddingBottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    color: '#fff',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
  },
  btn: {
    marginHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ff0000',
    fontWeight: '700',
    padding: 5,
    backgroundColor: 'transparent',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
})

export default LoginForm

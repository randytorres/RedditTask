import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import LoginForm from './LoginForm'
import SwipeableView from './SwipeableView.js'

class App extends Component {
  state = { loggedIn: null }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD0jmj3LO1FjwfZowvlzO98Oe8VZEFzkoc",
      authDomain: "test-task-22ad5.firebaseapp.com",
      databaseURL: "https://test-task-22ad5.firebaseio.com",
      storageBucket: "test-task-22ad5.appspot.com",
      messagingSenderId: "26645304148",
    })

    firebase.auth().onAuthStateChanged(user => {
      user ? this.setState({ loggedIn: true, user: user.email })
           : this.setState({ loggedIn: false })
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <SwipeableView
            user={this.state.user}
            logOut={() => firebase.auth().signOut()}
          />
        )
      case false:
        return <LoginForm />
      default:
        return (
          <View style={styles.spinner}>
            <ActivityIndicator size='large' />
          </View>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default App

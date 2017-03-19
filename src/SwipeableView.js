import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import Interactions from './Interactions'
import Wrapper from './Wrapper'

const REDDIT_URL = 'https://www.reddit.com/r/aww.json'

class SwipeableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
       cards: [],
       alteredData: [],
       modalVisibile: false,
    }
  }

  componentDidMount() { 
    fetch(REDDIT_URL)
      .then(response => response.json())
      .then(responseJson => this._remapData(responseJson))
      .catch(error => console.error(error))
  }

  _remapData = response => {
    let newData = []
    response.data.children.forEach(item => {
      if (item.data.thumbnail) {
        let remapped = { 
          image: item.data.thumbnail,
          title: item.data.title,
          interactions: { approved: 0, denied: 0 },
        }
        newData.push(remapped)
      }
    })

    this.setState({ cards: newData })
  }

  _handleYup = card => {
    let data = this.state.alteredData
    card.interactions.approved += 1
    data.push(card)
    this.setState({ alteredData: data })
  }

  _handleNope = card => {
    let data = this.state.alteredData
    card.interactions.denied += 1
    data.push(card)
    this.setState({ alteredData: data })
  }

  _toggleModal = isVisible => {
    this.setState({ modalVisibile: isVisible })
  }

  _renderModal = () => (
    <Modal
      animationType={"fade"}
      visible={this.state.modalVisibile}
    >
      <Interactions 
        alteredData={this.state.alteredData}
        toggleModal={this._toggleModal}
      />
    </Modal>
  )

  _renderCard = data => (
    <View style={styles.card}>
      <Image 
        source={{ uri: data.image }}
        style={styles.image}
      />
      <View style={styles.title}>
        <Text>{data.title}</Text>
      </View>
    </View>
  )

  _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => this.props.logOut()}
        >
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.userName}>Logged in as: {this.props.user}</Text>
      </View>
      <Text style={styles.headerText}>/r/Aww subreddit</Text>
    </View>
  )

  render() {
    return (
      <Wrapper>
        { this._renderHeader() }
        <View style={styles.container}>
          <SwipeCards
            cards={this.state.cards}
            renderCard={this._renderCard}
            handleYup={this._handleYup}
            handleNope={this._handleNope}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._toggleModal(true)}
        >
          <Text style={styles.buttonText}>View Interactions</Text>
          { this._renderModal() }
        </TouchableOpacity>
      </Wrapper> 
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    backgroundColor: 'transparent',
    color: '#fff',
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingLeft: 10,

  },
  container: {
    height: 450,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 1,
    overflow: 'hidden',
    height: 300,
    width: 320,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  title: {
    padding: 30,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  signOutBtn: {
    backgroundColor: '#ff0000',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  signOut: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginLeft: 20,
  },
})

export default SwipeableView

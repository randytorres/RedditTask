import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions } from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import Card from './Card'
import bgImage from './assets/Background.png'
import Interactions from './Interactions'

const { height, width } = Dimensions.get('window')

class SwipeableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
       images: [],
       alteredData: [],
       isModalVisibile: false,
    }
  }

  handleYup = card => {
    let data = this.state.alteredData
    card.interactions.approved += 1
    data.push(card)
    this.setState({
     ...this.state,
     updatedData: data, 
    })
  }

  handleNope = card => {
    let data = this.state.alteredData
    card.interactions.denied += 1
    data.push(card)
    this.setState({
     ...this.state,
     updatedData: data, 
    })
  } 

  handleDataRemap = response => {
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

    this.setState({ images: newData })
  }

  componentDidMount() { 
    fetch('https://www.reddit.com/r/aww.json')
      .then(response => response.json())
      .then(responseJson => this.handleDataRemap(responseJson))
      .catch(error => {
        console.error(error);
      });
  }

  handleVisibility = isVisible => {
    this.setState({ 
      ...this.state,
      isModalVisibile: isVisible
    })
  }

  render() {
    return (
      <Image source={bgImage} style={styles.background}> 
        <View style={styles.header}>
          <Text style={styles.headerText}>/r/Aww subreddit</Text>
        </View>
        <View style={styles.container}>
          <SwipeCards
            cards={this.state.images}
            renderCard={cardData => <Card {...cardData} />}
            handleYup={card => this.handleYup(card)}
            handleNope={card => this.handleNope(card)} />
        </View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => this.handleVisibility(true) }>
          <Text style={styles.btnText}>View Interactions</Text>

          {/*** Used a Modal To avoid adding any Navigation ***/}
          <Modal
            animationType={"fade"}
            visible={this.state.isModalVisibile}>
            <Interactions 
              alteredData={this.state.alteredData}
              _onPress={this.handleVisibility} />
          </Modal>
        </TouchableOpacity>
      </Image> 
    )
  }
}

const styles = StyleSheet.create({
  background: {
    height,
    width,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  container: {
    height: 500,
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})

export default SwipeableView

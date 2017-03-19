import React from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'
import bgImage from './assets/Background.png'

const { height, width } = Dimensions.get('window')

const Wrapper = props => (
  <Image style={[styles.background, props.style]} source={bgImage}>
    {props.children}
  </Image>
)

const styles = StyleSheet.create({
  background: {
    height,
    width,
  },
})

export default Wrapper

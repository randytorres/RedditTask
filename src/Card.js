import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const Card = props => (
  <View style={styles.card}>
    <Image 
      source={{ uri: props.image }}
      style={styles.image}
    />
    <View style={styles.title}>
      <Text>{props.title}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
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
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
})

export default Card

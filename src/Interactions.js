import React, { Component } from 'react'
import { 
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Wrapper from './Wrapper'

const ARROW = '\u2039'

class Interactions extends Component {
  constructor(props) {
    super(props) 
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.props.alteredData),
    };
  }

  _renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => this.props.toggleModal(false)}>
        <Text style={styles.backArrow}>{ARROW}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Interactions</Text>
    </View>
  )

  _renderListItem = data => (
    <View style={styles.listItem}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.section}>
        <Image style={styles.thumbnail} source={{ uri: data.image }} />
        <Text style={styles.content}>Approved: {data.interactions.approved}</Text>
        <Text style={styles.content}>Denied: {data.interactions.denied}</Text>
      </View>
    </View>
  )
  
  render() {
    return (
      <Wrapper>
        { this._renderHeader() }
        <ListView
          contentContainerStyle={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderListItem}
          enableEmptySections
        />	
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 3,
    marginLeft: 105, 
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  backArrow: {
    fontSize: 40,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  thumbnail: {
    height: 60,
    width: 60,
    borderRadius: 5,
  },
  listItem: {
    padding: 20,
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  section: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 60,
    paddingTop: 20,
  },
  listView: {
    paddingBottom: 90,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    backgroundColor: 'transparent',
  },
})

export default Interactions

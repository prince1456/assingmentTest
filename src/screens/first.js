import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image, Dimensions
} from 'react-native'
import axios from 'axios'
import {CachedImage} from "react-native-img-cache"
import _ from 'lodash'


const {width} = Dimensions.get('window')
export default class First extends Component<{}> {
  state ={
    data: []
  }
   componentWillMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => {
        // take 10 photo just
        this.setState({data:_.drop(res.data, 4990)})
    })
  }
  _keyExtractor = (item, index) => item.id;

  _renderItem =({item}) => {
    console.log(item.url)
    const image = _.replace(item.url, 'http', 'https');
    return (
      <View style={styles.card}>
        <CachedImage style={{ borderRadius: 10, position: 'absolute', width: '100%',height: '100%'}} source={{ uri: image }}/>
        <View style={styles.titleBar}>
            <Text style={{backgroundColor: 'transparent', color: 'white'}}>{item.title}</Text>
        </View>
      </View>
    )
  }
  
  makeRandom =() => {
    const {data} = this.state
    const recursiveShuffle = (datas) => {
      if (datas.length === 1) return datas;
      
      const randomNum = datas.splice(Math.floor(Math.random() * datas.length), 1)[0];
      
      return [randomNum, ...recursiveShuffle(datas)]
    }
     this.setState({data: recursiveShuffle(data)})
    
  }
  makeRandomTwo =() => {
    const {data} = this.state
    const shuffleData = data => data.sort(() => Math.random() - 0.5)
    this.setState({data: shuffleData(data)})
  }
  goToSecondPage = () => {
      const {data} = this.state
    this.props.navigation.navigate("second", {data})
  }
  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>
          <FlatList
            horizontal
            style={{width: '100%', height: 500}}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
          <Button 
          title={'make it random recurisvly '}
            onPress={this.makeRandom}
          />
          <Button 
          title={'make it random with ES6 syntax'}
            onPress={this.makeRandomTwo}
          />
          <Button 
          title={'got to second page'}
            onPress={() => this.goToSecondPage()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, card: {
     margin: 25,
     height: 400, 
     flexDirection: 'row', 
     position: 'relative', 
     width: width / 5 * 4, 
     borderRadius: 10,
     borderWidth:  2,
     borderColor: 'darkgrey',
     shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 5,
          width: 1
        }
  },
  titleBar: {
    flex: 1,
    position: 'absolute',
    width: '55%',
    left:10,
    borderRadius:4,
    top: '76%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

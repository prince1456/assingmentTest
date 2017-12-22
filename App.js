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
export default class App extends Component<{}> {
  state ={
    data: []
  }
   componentWillMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => {
        this.setState({data:_.drop(res.data, 4300)})
    })
  }
  _keyExtractor = (item, index) => item.id;

  _renderItem =({item}) => {
    console.log(item.url)
    const image = _.replace(item.url, 'http', 'https');
    return (
      <View style={styles.card}>
        <CachedImage style={{ borderRadius: 10, position: 'absolute', width: '100%',height: '100%'}} source={{ uri: image }}/>
        <View style={{flex: 1, position: 'absolute', width: '100%'}}>
            <Text style={{backgroundColor: 'transparent'}}>{item.title}</Text>
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
    // newData.push(() => this.recursiveShuffle(data))
    // this.setState({data: newData})
    
  }
  makeRandomTwo =() => {
    console.log(this.state.data)


  }
  render() {
    console.log(this.state.data)
    return (
      <View style={styles.container}>
      <FlatList
        horizontal
      style={{width: '100%'}}
        data={this.state.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
      <Button 
      title={'make it random'}
        onPress={this.makeRandom}
      />
       <Button 
      title={'make it random 2'}
        onPress={this.makeRandomTwo}
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
     height: 200, 
     flexDirection: 'row', 
     position: 'relative', 
     width: width / 5 * 4, 
     borderRadius: 10,
     borderWidth:  2,
     borderColor: 'darkgrey',
     shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 1
        }
  }
});

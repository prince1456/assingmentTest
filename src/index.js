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
import Tabs from './Routes'




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
       
        return (  
                <Tabs/>
        )
    }
}
 
export default App;
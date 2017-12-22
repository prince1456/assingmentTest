import React, { Component } from 'react';
import {View, Text, Button} from 'react-native'
import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel'

class Second extends Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.navigation.state.params.data }
    }
    render() { 
        return (
            <View>
                <SwipeableParallaxCarousel
                    data={this.state.data}
                    navigationType={'bars'}
                    parallax
                    navigation
                    height={500}
                />
                <Button title="go back" onPress={() => this.props.navigation.goBack()} />
            
            </View>
          )
    }
}
 
export default Second;
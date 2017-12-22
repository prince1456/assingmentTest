import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation'
import First from './screens/first'
import Second from './screens/second'


const Tabs = StackNavigator({
    first: {screen: First},
    second: {screen: Second}
},
{
    headerMode: 'none',
}
)

export default Tabs
import React from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native'
import {primaryColor} from '../colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles'
const Component2 = () =>  {
    const {height} = Dimensions.get('window')

    return (
        <View style = {{flex: 1}}>
            <Text>Hello</Text>
        </View>
        
    )
}
export {Component2};
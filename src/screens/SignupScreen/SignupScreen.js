import React from 'react'
import { View, Text } from 'react-native'
import {Component1} from '../../components/GettingStarted'
const SignupScreen = ({navigation}) => {
    return (
        <View style = {{flex: 1}}>
            <Component1 navigation = {navigation}/>
        </View>
    )
}

export default SignupScreen

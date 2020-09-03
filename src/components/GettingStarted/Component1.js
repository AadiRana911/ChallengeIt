import React, {useState} from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native'
import {primaryColor} from '../colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Component1 = ({navigation}) =>  {
    const [canIMove, setCanIMove] = useState(false);
    const {height} = Dimensions.get('window')

    return (
        <KeyboardAwareScrollView style = {{flex: 1, backgroundColor: 'red'}} contentContainerStyle = {{flexGrow: 1, backgroundColor: 'green'}}>
            <View style = {styles.container}>
            <View style = {{flex:0.25, justifyContent: 'space-between', marginBottom: 40 }}>
                <View style = {{marginBottom: 20}}>
                    <Text style = {{fontSize: 25,  color: primaryColor, fontWeight: 'bold'}}>Sign up</Text>
                    <Text style = {{fontSize: 15}}>Enter your email address to create account</Text>
                </View>
                <View>
                    <TextInput style = {styles.textInputStyle} placeholder = 'johndoe@gmail.com'/>
                </View>
            </View>
                <TouchableOpacity style = {styles.nextButtonStyle} onPress = {() => navigation.navigate('C2')}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold', color: primaryColor}}>Next</Text>
                </TouchableOpacity>
            <View style = {{flex: 0.25,marginTop: height/15}}>
                <View style = {{flex: 1}}>
                <Text>Already have an account?</Text>
                <TouchableOpacity>
                    <Text style = {{fontSize: 16, fontWeight: 'bold', color: primaryColor}}>Sign in</Text>
                </TouchableOpacity>
            </View>
                
                <View style = {styles.bottomContainer}>
                <TouchableOpacity style = {styles.socialIconsStyle}>
                    <EvilIcons name = 'sc-facebook' style = {{fontSize: 40, color: '#80aaff'}}/>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.socialIconsStyle}>
                    <Image source = {require('../../assets/images/google.png')} style = {{height: 30, width: 30}}/>
                </TouchableOpacity>
                </View>
            </View>
            
        </View>
        </KeyboardAwareScrollView>
        
    )
}
export {Component1};
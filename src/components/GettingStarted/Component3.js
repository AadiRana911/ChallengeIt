import React, {useState} from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native'
import {primaryColor} from '../colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Component3 = ({navigation}) =>  {
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
                    <TextInput style = {styles.textInputStyle} placeholder = 'First Name'/>
                    <TextInput style = {styles.textInputStyle} placeholder = 'Last Name'/>
                    <View>
                        <TextInput style = {[styles.textInputStyle,{marginBottom: 5}]} placeholder = 'User Name'/>
                        <Text style = {{color: primaryColor}}>This username is taken try another</Text>
                        <View style = {{flexDirection: 'row', width: '50%', justifyContent: 'space-between', marginTop: 10}}>
                            <Text>try</Text>
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {styles.suggestions}>ali031</Text>
                                <Text style = {styles.suggestions}>ali169</Text>
                                <Text style = {styles.suggestions}>ali003</Text>
                            </View>
                            
                       </View>
                    </View>
                </View>
            </View>
            <View style = {{alignSelf: 'center', width: '30%', height: 20, justifyContent: 'space-around', flexDirection: 'row'}}>
                <View style = {[styles.paginationView]}></View>
                <View style = {styles.paginationView}></View>
                <View style = {[styles.paginationView, {backgroundColor: primaryColor, borderColor: primaryColor}]}></View>
                <View style = {styles.paginationView}></View>
                <View style = {styles.paginationView}></View>
            </View>
                <TouchableOpacity style = {styles.nextButtonStyle} onPress = {() => navigation.navigate('Home')}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold', color: primaryColor}}>Next</Text>
                </TouchableOpacity>
            
            </View>
        </KeyboardAwareScrollView>
        
    )
}
export {Component3};
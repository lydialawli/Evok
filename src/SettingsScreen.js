import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Button, ScrollView, Text, Alert, ImageBackground, Modal } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'

export default class SettingsScreen extends React.Component {

    /*static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerStyle: {
                backgroundColor: 'grey',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },
            headerRight: <Ionicons
                name="md-home"
                size={30}
                color="white"
                style={{paddingRight:20}}
                onPress={() => navigation.navigate('Home')}
            ></Ionicons>
        }
    }*/

    render() {
        const { navigate } = this.props.navigation

        console.log("Settings mode")
        return (
            <View>
                <View >
                    <Text>Settings Screen</Text>
                </View>
               
            </View >
        )
    }
}
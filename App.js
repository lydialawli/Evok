
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Icon, Dimensions, ImageBackground, Alert, ScrollView, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../Evok/src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../Evok/src/evokStyles.js'
import GalleryScreen from '../Evok/src/GalleryScreen.js'
import evokFileSystem from '../Evok/src/evokFilesystem.js'
import ElementScreen from '../Evok/src/ElementScreen.js'
import { FileSystem } from 'expo'
import Card from '../Evok/src/Card.js'
import HomeScreen from '../Evok/src/HomeScreen.js'


const NavigationApp = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Camera: { screen: CameraScreen },
        Gallery: { screen: GalleryScreen },
        Element: { screen: ElementScreen }
    },

    {
        initialRouteName: 'Home',
    },

    {
        navigationOptions: {
            headerMode: 'null',
        },

        navigationOptions: ({ navigation }) => ({ header: false })
    }
)


export default class App extends React.Component {
    render() {
        return <NavigationApp />
    }
}

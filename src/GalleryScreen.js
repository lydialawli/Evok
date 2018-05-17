import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/EvokCamera.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'

export default class GalleryScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Gallery',
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")
        return (
            <View style={evokStyles.galleryView} >
                <Text> ALOHA! </Text>
                <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                    
                    <Ionicons name="ios-home-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

}


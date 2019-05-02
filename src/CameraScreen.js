import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, Button, Icon, Slider } from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'
import { StackNavigator } from 'react-navigation'
import GalleryScreen from '../src/GalleryScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import EvokCamera from '../src/EvokCamera.js'
import newEvokFileSystem from '../src/newEvokFileSystem.js'


export default class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Camera',
    }

    async componentWillMount() {
        this.onOpenCamera(this.props.navigation.state.params.elementID)
    }

    onOpenCamera = (ID) => {
        this.setState({
            elementID: ID,
            imageHistory: newEvokFileSystem.getElementObj(ID).imageHistory,
        })
    }

    getLastImage = () => {
        if (this.state.imageHistory.length > 0) {
            console.log('>>>', this.state.imageHistory[5].uri)
            return this.state.imageHistory[this.state.imageHistory.length - 1].uri
        }
    }

    navigateToHome = () => {
        //console.log('home pressed')
        this.props.navigation.navigate('Home')
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Camera mode")
        let lastImageUri = this.getLastImage()

        return (
            <View style={evokStyles.camScreenView}>
                <EvokCamera elementID={this.state.elementID} lastImageUri={lastImageUri} ></EvokCamera>
            </View>
        )
    }
}

/*
<View style={evokStyles.bottomBar}>
<TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
    <Ionicons name="ios-home-outline" size={40} color="white" />
</TouchableOpacity>
<TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Gallery')}>
    <Ionicons name="md-images" size={40} color="white" />
</TouchableOpacity>
</View>
*/


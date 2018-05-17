
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Icon, Dimensions } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../Evok/src/EvokCamera.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../Evok/src/evokStyles.js'

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Home',
    }
    render() {
        const { navigate } = this.props.navigation;
        console.log("homescreen mode")
        return (
            <View style={evokStyles.container} >
                <Text style={evokStyles.evokText} >
                    Evok
        </Text>
                <Button
                    color='#ffcc00'
                    title="Go take a Pic"
                    onPress={() => navigate('Camera')}
                />
            </View>
        )
    }
}

class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Camera',
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Camera mode")
        return (
            <View style={evokStyles.camScreenView}>
                <EvokCamera />
                <View style={evokStyles.bottomBar}>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-home-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Gallery')}>
                        <Ionicons name="md-images" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class GalleryScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Gallery',
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")
        return (
            <View style={evokStyles.galleryView} >
                <Text> ALOHA!! </Text>
                <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                    <Ionicons name="ios-home-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

}





const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Camera: { screen: CameraScreen },
    Gallery: { screen: GalleryScreen }
}, {
        navigationOptions: {
            headerMode: 'null',
        },
        navigationOptions: ({ navigation }) => ({ header: false }),
    })

export default class App extends React.Component {
    render() {
        return <NavigationApp />
    }
}
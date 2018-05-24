
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Icon, Dimensions } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../Evok/src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../Evok/src/evokStyles.js'
import GalleryScreen from '../Evok/src/GalleryScreen.js'


export class HomeScreen extends React.Component {
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
                <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Camera')}>
                    <Ionicons name="ios-camera-outline" size={60} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={evokStyles.projectFolderButton} onPress={() => navigate('Gallery')}>
                    <Text style={evokStyles.ProjectFolderText} >Project Folder</Text>
                    <Ionicons name="ios-apps-outline" size={60} color="white" />
                </TouchableOpacity>
            </View>
        )
    }
}


const NavigationApp = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Camera: { screen: CameraScreen },
        Gallery: { screen: GalleryScreen }
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
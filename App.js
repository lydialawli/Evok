
import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'
import HomeScreen from '../Evok/src/HomeScreen.js'
import ElementScreen from '../Evok/src/ElementScreen.js'
import GalleryScreen from '../Evok/src/GalleryScreen.js'
import CameraScreen from '../Evok/src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'

const TabNavigation = TabNavigator({
    Element: { screen: ElementScreen },
    Gallery: {
        screen: GalleryScreen,
        navigationOptions: {
            tabBarIcon: < Ionicons size={20} name={'md-images'} />
        }
    },
})

const NavigationApp = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Tab: { screen: TabNavigation },
        //Camera: { screen: CameraScreen },
        //Gallery: { screen: GalleryScreen },
        //Element: { screen: ElementScreen }
    },

    {
        initialRouteName: 'Home',
    },

    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#999966',

            },
            headerTintColor: 'blue',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },

            navigationOptions: ({ navigation }) => ({ header: true })
        }
    }
)


export default class App extends React.Component {
    render() {
        return <NavigationApp />
    }
}


/*const NavigationApp = StackNavigator(
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
            headerStyle: {
                backgroundColor: '#999966',

            },
            headerTintColor: 'blue',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },

            navigationOptions: ({ navigation }) => ({ header: true })
        }
    }
)*/
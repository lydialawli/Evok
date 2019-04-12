
import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'
import HomeScreen from '../src/HomeScreen.js'
import ElementScreen from '../src/ElementScreen.js'
import GalleryScreen from '../src/GalleryScreen.js'
import SettingsScreen from '../src/SettingsScreen.js'
import CameraScreen from '../src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'

export const Tabs = TabNavigator(
  {
    Element: {
      screen: ElementScreen,
      navigationOptions: {
        title: 'Timeline',
        tabBarIcon: <Ionicons name="md-settings" size={10} color="white"></Ionicons>
      },

    },
    Gallery: {
      screen: GalleryScreen,
      navigationOptions: {
        title: 'Gallery',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#666699',
      inactiveBackgroundColor: 'yellow',
      //showLabel: false

    },
  },
  {
    headerMode: 'screen'
  }
)

export const HomeStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Tab: { screen: Tabs, navigationOptions: { title: 'Header title' } },
    Camera: { screen: CameraScreen },
    // Gallery: { screen: GalleryScreen },
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

export const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
})

export const GalleryStack = StackNavigator(
  {
    Settings: {
      screen: GalleryScreen,
      navigationOptions: {
        title: 'Gallery',
      },
    }
  },
  {
    initialRouteName: 'Gallery',
  }

)

export const Root = StackNavigator({
  Home: {
    screen: HomeStack
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      title: 'Header title', headerStyle: {
        backgroundColor: '#999966',
      }
    }
  },
  Settings: {
    screen: SettingsStack
  },
  Gallery: {
    screen: GalleryStack
  },
},
  {
    headerMode: 'none',
  },

)




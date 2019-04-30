
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
      }
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
      inactiveTintColor: 'black',
      activeBackgroundColor: '#666699',
      inactiveBackgroundColor: 'yellow',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'grey',
      },
      showIcon: 'true'
      //showLabel: false
    },
  },
  {
    headerMode: 'screen'
  }
)



export const Root = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home Screen',
      headerStyle: {
        backgroundColor: 'grey',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
      },
      headerRight: <Ionicons name="md-settings" size={30} color="white"></Ionicons>,
    }
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      title: 'Element name',
      headerStyle: {
        backgroundColor: 'grey',
        elevation: 0,
        height: 50,

      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
      },

      //tabBarIcon: <Ionicons name="md-settings" size={10} color="white"></Ionicons>,
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Setting Screen',
      headerStyle: {
        backgroundColor: 'grey',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
      },
      headerRight: <Ionicons name="md-settings" size={30} color="white"></Ionicons>,
    }
  },

  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      title: 'Camera Screen',
    }
  },
},
  {
    headerMode: 'float',
  },

)





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
        tabBarIcon: <Ionicons name="md-settings" size={20} color="white"></Ionicons>
      },

    },

    Gallery: {
      screen: GalleryScreen,
      navigationOptions: {
        title: 'Gallery',
      },
      navigationOptions: {
        title: 'Gallery',
        tabBarIcon: <Ionicons name="md-settings" size={20} color="white"></Ionicons>
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
        fontSize: 15,
      },
      style: {
        backgroundColor: 'grey',
      },

      //showLabel: false
    },
  },
  {
    headerMode: 'screen'
  }
)


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
      title: 'Element Screen',
      headerStyle: {
        backgroundColor: 'grey', 
        elevation: 0,
    

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

},
  {
    headerMode: 'float',
  },

)




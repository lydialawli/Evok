
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
      }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName;
        if (routeName === 'Timeline') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;

        } else if (routeName === 'Gallery') {
          iconName = "md-images"
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
    },
    tabBarColor: 'gray'
  }
)

export const HomeStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Tab: { screen: Tabs },
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
  }},
  {
    initialRouteName: 'Gallery',
  }
  
)

export const Root = StackNavigator({
  Home: {
    screen: HomeStack
  },
  Tabs: {
    screen: Tabs
  },
  Settings: {
    screen: SettingsStack
  },
  Gallery: {
    screen: GalleryStack
  },
}, {
    headerMode: 'none',
  },

)




import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import ElementScreen from '../Evok/src/ElementScreen.js'



class GalleryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Timeline: ElementScreen,
  Images: GalleryScreen,
});

export default createAppContainer(TabNavigator)


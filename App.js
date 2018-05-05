
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Camera from '../Evok/src/Camera.js'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
  }
  render() {
    const { navigate } = this.props.navigation;
    console.log("homescreen mode")
    return (
      <View style = {styles.container}>
        <Button
          title="Navigate to Profile"
          onPress= { ()=> navigate('Profile') }
        />
      </View>
    )
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Profile',
  }

  render() {
    const { navigate } = this.props.navigation
    console.log("Profile mode")
    return (
      <View style = {styles.container}>
          <Camera/>
          <Text onPress= { ()=> navigate('Home') }>
             Navigate to Home
          </Text>
      </View>
    )
  }
}


const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen},
  Profile: { screen: ProfileScreen },
  }, {
  navigationOptions: {
    headerMode: 'null',
  },
  navigationOptions: ({navigation}) => ({ header: false }),
})

export default class App extends React.Component{
  render(){
    return <NavigationApp />
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
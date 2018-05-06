
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
          color= '#ffcc00'
          title="Go take a Pic"
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
          <Button 
            color= '#ffcc00'
            title="Go back home"
            onPress= { ()=> navigate('Home') }>
            
          </Button>
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
    backgroundColor: '#ff6666',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
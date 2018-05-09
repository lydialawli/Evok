
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Icon } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../Evok/src/EvokCamera.js'
import { Ionicons } from '@expo/vector-icons'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
  }
  render() {
    const { navigate } = this.props.navigation;
    console.log("homescreen mode")
    return (
      <View style = {styles.container} >
        <Text style={styles.evokText} >
          Evok
        </Text>
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
          <EvokCamera/>
          <Button 
            color= '#ffcc00' 
            title="Go back home"
            onPress= { ()=> navigate('Home') }>
          </Button>
          <TouchableOpacity   style = {styles.homeButton} onPress= { ()=> navigate('Home') }>
            <Text style={styles.iconText}>Go back</Text>
            <Ionicons name="md-checkmark-circle" size={32} color="white" />
          </TouchableOpacity>  
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
    justifyContent: 'space-evenly',
  },

  evokText:{
    flex: 0.5,
    color: '#009999',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'flex-start' 
  },

  iconText:{
    flex: 0.5,
    color: '#ffcc00',
    fontSize: 20,
  },

  homeButton:{
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#ffcc00',
    
  }
})
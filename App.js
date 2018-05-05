
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Camera, Permissions } from 'expo'
import { StackNavigator } from 'react-navigation'; 

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Login',
  };
  render() {
    const { navigate } = this.props.navigation;
    console.log("homescreen mode")
    return (
      <View style = {styles.container}>
        <Text onPress= { ()=> navigate('Profile') }>
          Navigate to profile
        </Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Login',
  };



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Button
          title="Navigate to Home"
          onPress= { ()=> navigate('Home') }
        />
      </View>
    );
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
});

export default class App extends React.Component{
  render(){
    return <NavigationApp />;
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
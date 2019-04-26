import React from 'react'
import { Image, StyleSheet, View, Switch,  TouchableOpacity, Button, ScrollView, Text, Alert, ImageBackground, Modal } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'

export default class SettingsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerStyle: {
                backgroundColor: 'grey',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            }
        }
    }
    state = {
        switchValue : false 
    }

    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
        console.log('Switch is: ' + value)
    }



    render() {
        const { navigate } = this.props.navigation

        console.log("Settings mode")
        return (
            <View style={settingStyles.screenContainer}>
                <View style={settingStyles.switchContainer}>
                    <Text>Onion Skin </Text>
                    <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />
                </View>

            </View >
        )
    }
}

settingStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    switchContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      
    },
})
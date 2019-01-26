import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'

let lineXhour =
    <View style={{ borderColor: 'transparent', borderBottomColor: 'green', borderWidth: 2, width: 20, height: 2 }}>
    </View>


export default class TimeLine extends React.Component {
    state = {
        imageHistory: this.props.data,
    }

    componentWillMount() {
        console.log('data in timeline is: ' + JSON.stringify(this.state.imageHistory,null,2))
    }

    render() {
        return (
            <View >
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true}>
                    <Text> {JSON.stringify(this.state.imageHistory)} </Text>
                </ScrollView>
            </View>
        )
    }


}
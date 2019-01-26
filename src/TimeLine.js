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
        currentTimestamp: 0
    }

    componentWillMount() {
        this.setLengthOfTimeline()
        console.log('data in timeline is: ' + JSON.stringify(this.state.imageHistory, null, 2))
    }


    setLengthOfTimeline = () => {
        this.setState(
            {
                durationLengthInHours: Math.round(this.getFullDurationInHours(this.state.imageHistory))
            }
        )
    }

    MilisecIntoHours(milisecs) {
        h = milisecs / (60 * 60 * 1000)
        return h.toFixed(5)
    }

    getFullDurationInHours = (array) => {
        if (array.length === 0)
            return 0

        let arrayLastItem = array.length - 1
        return this.MilisecIntoHours(array[arrayLastItem].timestamp - array[0].timestamp)
    }

    hoursToPixels = (h) => {
        return h * 10
    }

    getScrollLine = () => {
        let newWidth = 0
        if (this.state.durationLengthInHours === 0) { newWidth = 20 }
        else { newWidth = this.hoursToPixels(this.state.durationLengthInHours) + 300 }
        console.log('new width is ' + newWidth)

        let textLine = this.state.imageHistory.map(
            (imageObj) => {
                <View style={{ margin: 1022.5 }} >
                    <Ionicons name="ios-git-commit" size={20} color="black" containerStyle={flex = 1} />
                </View>
            }
        )

        let text = this.text(newWidth)
        return (
            <View>
                <View style={{
                    backgroundColor: 'yellow', width: newWidth,
                    height: 20, justifyContent: 'center', alignSelf: 'center'
                }}>

                    {text}

                </View>
            </View>
        )
    }


    text = (newWidth) => {
        return (
            <View style={{ height: 20, margin: 1022.5 }} >
                <Ionicons name="ios-git-commit" size={20} color="black" containerStyle={flex = 1} />
            </View>
        )
    }

    handleScroll = (event) => {
        console.log(event.nativeEvent.contentOffset.x)
    }


    render() {

        let lineXhour = this.getScrollLine()
        return (
            <View >
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true} onScroll={this.handleScroll} >
                    {lineXhour}
                </ScrollView>
                <Text> {JSON.stringify(this.state.durationLengthInHours)} </Text>
            </View>
        )
    }


}
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
        currentTimestamp: 0,
        scrollPosition: 0,
        currentMoment: this.props.timestamp,
        timelineWidth: 0,
        currentPosition: 0,
    }

    componentWillMount() {
        this.setLengthOfTimeline()
        console.log('data in timeline is: ' + JSON.stringify(this.state.imageHistory, null, 2))
    }


    setLengthOfTimeline = () => {
        this.setState(
            {
                durationLengthInHours: Math.round(this.getFullDurationInHours(this.state.imageHistory)),
                timelineWidth: this.props.width,
                durationInPx: this.getFullDurationInPixels(this.state.imageHistory),
                currentPosition: this.milisecIntoPixels(this.state.currentMoment) + (this.state.timelineWidth*0.5)
            }
        )
    }

    milisecIntoPixels = (timestamp) => {
       return this.hoursToPixels(this.MilisecIntoHours(timestamp))
    }

    MilisecIntoHours(milisecs) {
        h = milisecs / (60 * 60 * 1000)
        return h.toFixed(5)
    }

    getFullDurationInPixels= (array) => {
        if (array.length === 0)
            return 0

        let arrayLastItem = array.length - 1
        return this.milisecIntoPixels(array[arrayLastItem].timestamp - array[0].timestamp)
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

    getTimelineBarWidth = () => {
        let newWidth = 0
        if (this.state.durationInPx === 0) { newWidth = 20 }
        else { newWidth = this.state.durationInPx + this.state.timelineWidth }
        //console.log('new width is ' + newWidth)

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

    getScrollLine = () => {
        let newWidth = 0
        if (this.state.durationLengthInHours === 0) { newWidth = 20 }
        else { newWidth = this.hoursToPixels(this.state.durationLengthInHours) + 300 }
        //console.log('new width is ' + newWidth)

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
        //console.log(event.nativeEvent.contentOffset.x)
        this.setState(
            {
                scrollPosition:event.nativeEvent.contentOffset.x
            }
        )
    }


    render() {
        let lineXhour = this.getScrollLine()
        let barWidth= this.getTimelineBarWidth()
        return (
            <View >
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true} onScroll={this.handleScroll} >
                    {lineXhour}
                </ScrollView>
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true} onScroll={this.handleScroll} >
                    {barWidth}
                </ScrollView>
                <Text> {JSON.stringify(this.state.scrollPosition)} </Text>
                <Text> {JSON.stringify(this.state.currentPosition)} </Text>
            </View>
        )
    }


}
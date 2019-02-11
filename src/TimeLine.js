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
                currentPosition: this.milisecIntoPixels(this.state.currentMoment) + (this.state.timelineWidth * 0.5),
                genesisTimestamp: this.state.imageHistory[0].timestamp
            }
        )
    }

    milisecIntoPixels = (timestamp) => {
        return this.hoursToPixels(this.MilisecIntoHours(timestamp))
    }

    MilisecIntoHours(milisecs) {
        h = milisecs / (60 * 60 * 1000)
        return h
        //return h.toFixed(5)
    }

    getFullDurationInPixels = (array) => {
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

    getMsSinceGenesisTimestamp = (x) => {
        return x.timestamp - this.state.genesisTimestamp
    }



    getTimelineBarWidth = () => {

        let timelineBarWidth = this.state.durationInPx + this.state.timelineWidth
        //console.log('timeline bar width = '+ timelineBarWidth)
        let mapOfEventsPosition = this.getMapOfEvents(this.state.imageHistory)
        let instance = this.get1InstancePX(this.state.imageHistory[2])
        let instance2 = this.get1InstancePX(this.state.imageHistory[4])
        return (
            <View>
                <View style={{
                    backgroundColor: 'yellow', width: timelineBarWidth, 
                    height: 20, flexDirection: 'row', 
                }}>
                    {instance2}
                </View>
            </View>
        )

    }

    get1InstancePX = (imageObj) => {
        let x = this.getMsSinceGenesisTimestamp(imageObj)
        let instanceInPx = this.milisecIntoPixels(x)

        //console.log('instance px: '+instanceInPx)
        return (
            <View style={{ height: 20, left: instanceInPx, position: 'relative' }} >
                <Ionicons name="ios-git-commit" size={20} color="black" containerStyle={flex = 1} />
            </View>
        )
    }


    getInstanceInPx = (imageObj) => {
        let x = this.getMsSinceGenesisTimestamp(imageObj)
        //console.log('x is: ' + x)
        return instanceInPx = this.milisecIntoPixels(x)
    }

    getMapOfEvents = (array) => {
        let mapOfEvents = array.map((imageObj) => {

            let eventPosition = this.getInstanceInPx(imageObj)

            return (
                <View key={imageObj.timestamp} style={{ height: 20, left: eventPosition, position: 'absolute', margin: 2}} >
                    <Ionicons name="ios-git-commit" size={20} color="black" containerStyle={flex = 1} />
                </View>
            )
        })
        return mapOfEvents

    }


    handleScroll = (event) => {
        //console.log(event.nativeEvent.contentOffset.x)
        this.setState(
            {
                scrollPosition: event.nativeEvent.contentOffset.x
            }
        )
    }

    onScrollPositionChanged = (x) => {
        this.props.onTimelineMoved(x)
    }


    render() {
        let timelineBarWidth = this.getTimelineBarWidth()
        return (
            <View >
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true} onScroll={this.handleScroll} >
                    {timelineBarWidth}
                </ScrollView>
                <Text> {JSON.stringify(this.state.scrollPosition)} </Text>
            </View>
        )
    }

}

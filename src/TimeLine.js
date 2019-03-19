import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import TimelineDisplay from '../src/timelineDisplay.js'

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
        milisecToPixelFactor: this.props.scale
    }

    componentWillMount() {
        this.setLengthOfTimeline()
        console.log('data in timeline is: ', JSON.stringify(this.state.imageHistory, null, 2))
    }


    setLengthOfTimeline = () => {
        this.setState(
            {
                timelineWidth: this.props.width,
                durationInPx: this.getFullDurationInPixels(this.state.imageHistory),
                currentPosition: this.milisecIntoPixels(this.state.currentMoment) + (this.state.timelineWidth * 0.5),
                genesisTimestamp: this.state.imageHistory[0].timestamp
            }
        )
    }

    milisecIntoPixels = (ms) => {
        return ms * this.state.milisecToPixelFactor
    }


    getFullDurationInPixels = (array) => {
        if (array.length === 0)
            return 0

        let arrayLastItem = array.length - 1
        return this.milisecIntoPixels(array[arrayLastItem].timestamp - array[0].timestamp)
    }


    getMsSinceGenesisTimestamp = (x) => {
        return x.timestamp - this.state.genesisTimestamp
    }



    _getTimelineBarWidth = () => {

        let timelineBarWidth = this.state.durationInPx + this.state.timelineWidth
        // console.log('timeline bar width = ',timelineBarWidth)
        let timelineInstances = this._getTimelineInstances(this.state.imageHistory)
        let instance = this._get1InstancePX(this.state.imageHistory[0])
        let instance2 = this._get1InstancePX(this.state.imageHistory[2])
        return (
            <View style={{ justifyContent: 'center' }}>
                <View style={{
                    backgroundColor: 'yellow', width: timelineBarWidth,
                    height: 20, flexDirection: 'row',
                }}>
                    {timelineInstances}
                </View>
            </View>
        )

    }

    _get1InstancePX = (imageObj) => {
        let t = this.getMsSinceGenesisTimestamp(imageObj)
        let instanceInPx = this.milisecIntoPixels(t)


        //console.log('instance px: '+instanceInPx)
        return (
            <View style={{ height: 20, left: instanceInPx, position: 'relative' }} >
                <Ionicons name="ios-git-commit" size={20} color="black" containerStyle={flex = 1} />
            </View>
        )
    }


    _getInstancePosition = (imageObj) => {
        let t = this.getMsSinceGenesisTimestamp(imageObj)
        return instanceInPx = this.milisecIntoPixels(t) + this.state.timelineWidth * 0.5
    }

    _getTimelineInstances = (array) => {
        let mapOfEvents = array.map((imageObj) => {

            let instancePosition = this._getInstancePosition(imageObj)
            //console.log("isntancePosition is: "+ instancePosition)

            return (
                <View key={imageObj.timestamp} style={{ height: 20, left: instancePosition, position: 'absolute', margin: 2 }} >
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
                scrollPosition: event.nativeEvent.contentOffset.x + (this.state.timelineWidth * 0.5)
            }
        )
    }

    onScrollPositionChanged = (x) => {
        this.props.onTimelineMoved(x)
    }

    _getTimelineDisplayInstances = () => {
        this.state.imageHistory.map(
            (imageObj, index, array) => {
                let previousImage = array[index - 1]
                let epochInMs = 0
                let epochInPx = 0
                console.log('previousImage: ', previousImage)
                if (index == 0) {
                    epochInMs = imageObj.timestamp
                    epochInPx = this.milisecIntoPixels(epochInMs)
                }
                else {
                    epochInMs = imageObj.timestamp - previousImage.timestamp
                    epochInPx = this.milisecIntoPixels(epochInMs)
                }
                return (
                    <View style={evokStyles.timelineObject} key={imageObj.timestamp}>
                        <Text style={evokStyles.timelineObjectText} >
                            {new Date(imageObj.timestamp).toDateString().replace(2019, "")}
                        </Text>
                        <View style={evokStyles.timeLineIcon} >
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-git-commit" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <View style={{ borderColor: 'red', borderWidth: 0.6, backgroundColor: 'red', width: epochInPx * 20 }} />
                        </View>
                        <Text> {new Date(imageObj.timestamp).getHours()}:{new Date(imageObj.timestamp).getMinutes()}</Text>
                    </View>
                )
            }
        )
    }

    _getTimelineDisplay = () => {
        let instances = this._getTimelineDisplayInstances()
        let newWidth = 0
        if (this.state.durationInPx === 0) { newWidth = 20 }
        else { newWidth = this.state.durationInPx + 300 }

        return (
            <View style={{
                backgroundColor: 'yellow', width: newWidth,
                height: 20, justifyContent: 'flex-start', alignSelf: 'flex-end'
            }}>
                {instances}
            </View>
        )
    }


    render() {
        let TlDisplay = this._getTimelineDisplay()

        return (
            <View style={evokStyles.timeLineElementsInside}>

                <TimelineDisplay></TimelineDisplay>
                
            </View>
        )
    }


    /*render() {
        let timelineBarWidth = this._getTimelineBarWidth()
        let timelineMiddle = this.state.timelineWidth * 0.5
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ScrollView contentContainerStyle={evokStyles.timelineScroll} horizontal={true} onScroll={this.handleScroll} >
                    {timelineBarWidth}
                </ScrollView>
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>|</Text>
                <Text> {JSON.stringify(this.state.scrollPosition)} </Text>
            </View>
        )
    }*/

}

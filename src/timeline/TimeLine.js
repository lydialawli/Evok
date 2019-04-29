import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../evokStyles.js'
import TimelineDisplay from '../timeline/timelineDisplay.js'
import TimelineScroll from '../timeline/timelineScroll.js'
import DisplayFlatlist from '../timeline/displayFlatlist.js'
import utils from '../timeline/utils.js'

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
        ms2pxFactor: this.props.scale,
        barWidth: this.props.data.length * this.props.objWidth,
    }

    componentWillMount() {
        this.setLengthOfTimeline()
        console.log('data in timeline is: ', JSON.stringify(this.state.imageHistory, null, 2))
    }


    setLengthOfTimeline = () => {
        this.setState(
            {
                timelineWidth: this.props.width,
                durationInPx: utils.getFullDurationInPixels(this.state.imageHistory, this.state.ms2pxFactor),
                currentPosition: utils.milisecIntoPixels(this.state.currentMoment, this.state.ms2pxFactor) + (this.state.timelineWidth * 0.5),
                genesisTimestamp: this.state.imageHistory[0].timestamp
            }
        )
        console.log('barwidth:', this.state.barWidth)
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
        let t = utils.getMsSinceGenesisTimestamp(imageObj, this.state.genesisTimestamp)
        let instanceInPx = utils.milisecIntoPixels(t, this.state.ms2pxFactor)


        //console.log('instance px: '+instanceInPx)
        return (
            <View style={{ height: 20, left: instanceInPx, position: 'relative' }} >
                <Ionicons name="ios-git-commit" size={20} color="black" containerStyle={flex = 1} />
            </View>
        )
    }


    _getInstancePosition = (imageObj) => {
        let t = utils.getMsSinceGenesisTimestamp(imageObj, this.state.genesisTimestamp)
        return instanceInPx = utils.milisecIntoPixels(t, this.state.ms2pxFactor) + this.state.timelineWidth * 0.5
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
                    epochInPx = utils.milisecIntoPixels(epochInMs, this.state.ms2pxFactor)
                }
                else {
                    epochInMs = imageObj.timestamp - previousImage.timestamp
                    epochInPx = utils.milisecIntoPixels(epochInMs, this.state.ms2pxFactor)
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

    isHalfWay = (n) => {
        var decimal = n - Math.floor(n)

        if (decimal >= 0.5 && n<this.state.barWidth-this.props.objWidth)
            return true
        else { return false }

    }

    updateParentCurrentMoment = (currentPosition) => {
        console.log('scrollPos-->', currentPosition)
        let ind = 0
        let ind2 = 0
        let isHalfway = this.isHalfWay(currentPosition)

        if (currentPosition >= this.state.barWidth) {
            ind = this.props.data.length - 1
        }

        else if (currentPosition <= 0) {
            ind = 0
        }

        else {
            let maxPosition = this.state.barWidth

            if (this.isHalfWay(currentPosition)) {
                ind = Math.floor(currentPosition * this.props.data.length / maxPosition)
                ind2 = ind + 1
            }
            else {
                ind = Math.floor(currentPosition * this.props.data.length / maxPosition)
            }
        }

        console.log('ind:', ind, ' ind2:', ind2)
        this.props.onPositionChanged(ind, ind2,isHalfway)
    }


    render() {
        //let TlDisplay = this._getTimelineDisplay()

        return (
            <View style={timelineStyles.timeLineElementsInside}>


                <DisplayFlatlist
                    data={this.props.data}
                    style={timelineStyles.timelineDisplayBar}
                    scale={this.props.scale}
                    index={0}
                    onScrolled={this.updateParentCurrentMoment}
                    cardWidth={this.props.width}
                    objWidth={this.props.objWidth}
                >
                </DisplayFlatlist>



            </View>
        )
    }

    /* <TimelineScroll
     data={this.props.data}
     currentTimestamp={this.state.currentTimestamp}
     mode={this.props.mode}
     scale={this.props.scale}
     onScrollChange={this.updateParentCurrentMoment}
 ></TimelineScroll>*/

    /*  <TimelineDisplay
      data={this.props.data}
      currentTimestamp={this.state.currentTimestamp}
      mode={this.props.mode}
      scale={this.props.scale}
      cardWidth={this.props.cardWidth}
  ></TimelineDisplay>*/


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



timelineStyles = StyleSheet.create({

    timeLineElementsInside: {
        width: 300,
        height: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineDisplayBar: {
        display: 'flex',
        //flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',


    },



})
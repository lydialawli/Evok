import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import utils from '../timeline/utils.js'
import { Ionicons } from '@expo/vector-icons'


export default class TimelineDisplay extends React.Component {

    state = {
        currentTimestamp: this.props.currentTimestamp,
        scrollPosition: 0,
        array: this.props.data,
        mode: this.props.mode,
        msToPixelsFactor: this.props.scale,
        durationInPx: utils.getFullDurationInPixels(this.props.data, this.props.scale),
        timelineCardWidth: this.props.cardWidth
    }



    getInstancesDisplayed = (array) => {
        //console.log('array is>',this.state.array)
        let NewArray = array.map(
            (imageObj, index, array) => {
                let previousImage = array[index - 1]
                //console.log('previousImage: ', previousImage)
                let epochInMs = 0
                let epochInPx = 0

                if (index == 0) {
                    epochInMs = imageObj.timestamp
                    epochInPx = utils.milisecIntoPixels(epochInMs, this.state.msToPixelsFactor) / 1000
                }
                else if (index == (array.length-1)){
                    epochInPx = 0
                }
                else {
                    epochInMs = imageObj.timestamp - previousImage.timestamp
                    epochInPx = utils.milisecIntoPixels(epochInMs, this.state.msToPixelsFactor)
                    console.log('epochPX:', epochInPx)
                }
                
                if (epochInPx < 100)
                    epochInPx = epochInPx / 2
                if (epochInPx > 100) {
                    epochInPx = epochInPx / 5
                }
                console.log('nw epochPX:', epochInPx)

                return (
                    <ScrollView contentContainerStyle={DisplayStyles.timelineObject} key={imageObj.timestamp}>
                        <Text style={DisplayStyles.timelineObjectText} >
                            {new Date(imageObj.timestamp).toDateString().replace(1970, "")}
                        </Text>
                        <View style={{ flexDirection: 'row' }} key={imageObj.timestamp} >
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-git-commit" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <View style={{ alignSelf: 'center', height: 2, borderColor: 'red', backgroundColor: 'red', width: epochInPx + 32, }} />
                        </View>
                        <Text style={{ alignSelf: 'center' }}>
                            {new Date(imageObj.timestamp).getHours()}:{new Date(imageObj.timestamp).getMinutes()}
                        </Text>
                    </ScrollView>

                )
            }
        )
        return NewArray
    }



    _getTimelineDisplay = () => {
        let instances = this.getInstancesDisplayed()
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
        let instances = this.getInstancesDisplayed(this.state.array)

        return (
            <ScrollView contentContainerStyle={DisplayStyles.timelineDisplayBar} horizontal={true} >
                {instances}
            </ScrollView>
        )
    }
}

DisplayStyles = StyleSheet.create({

    timelineDisplayBar: {
        display: 'flex',
        //flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timelineObject: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },

    timelineObjectText: {
        color: 'darkblue',
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    timeLineIcon: {
        flexDirection: 'row',
    },

})





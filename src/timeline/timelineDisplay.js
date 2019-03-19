import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import utils from '../timeline/utils.js'


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

    getTimelineDisplay = () => {
        //let instances = this._getTimelineDisplayInstances()
        console.log('duration in pxls is: ',this.state.durationInPixels)
        let  newWidth = 0

        if (this.state.durationInPx === 0) { newWidth = 50 }
        else { newWidth = this.state.durationInPx + this.state.timelineCardWidth }

        return (
            <View style={{
                backgroundColor: 'pink', width: newWidth,
                height: 20, justifyContent: 'flex-start', alignSelf: 'flex-end'
            }}>
            </View>
        )
    }


    render() {
        let TlDisplay = this.getTimelineDisplay()

        return (
                <ScrollView contentContainerStyle={styles.timelineDisplayBar} >
                 <Text style={{ alignSelf: 'center' }}  >I am display </Text>
                    {TlDisplay}
                </ScrollView>
        )
    }
}

styles = StyleSheet.create({


    timelineDisplayBar: {
        flexDirection: 'center', 
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
      
    },

})





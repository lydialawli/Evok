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
        durationInPixels: utils.getFullDurationInPixels(this.props.data, this.props.scale),
    }
    

    getTimelineDisplay = () => {
        console.log('duration in pxls is: ',this.state.durationInPixels)
        let  newWidth = 300

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
                 <Text style={{ alignSelf: 'center' }}  >I am display, {this.state.durationInPixels} </Text>
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





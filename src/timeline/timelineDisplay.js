import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

export default class TimelineDisplay extends React.Component {

    state = {
        currentTimestamp: this.props.currentTimestamp,
        scrollPosition: 0,
        array: this.props.data,
        mode: this.props.mode,
    }
    

    getTimelineDisplay = () => {
        
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
                 <Text style={{ alignSelf: 'center' }}  >I am display</Text>
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





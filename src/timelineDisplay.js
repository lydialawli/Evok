import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

export default class TimelineDisplay extends React.Component {


    getTimelineDisplay = () => {
        
        let  newWidth = 300

        return (
            <View style={{
                backgroundColor: 'yellow', width: newWidth,
                height: 20, justifyContent: 'flex-start', alignSelf: 'flex-end'
            }}>
            </View>
        )
    }

    render() {
        let TlDisplay = this.getTimelineDisplay()

        return (
                <ScrollView contentContainerStyle={styles.imageCarousel} >
                    {TlDisplay}
                </ScrollView>
        )
    }
}

styles = StyleSheet.create({


    imageCarousel: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
    },

})





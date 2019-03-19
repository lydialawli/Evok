import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

export default class TimelineScroll extends React.Component {


    getTimelineScrollBar = () => {

        let newWidth = 300

        return (
            <View style={{
                backgroundColor: '#ffffb3', width: newWidth,
                height: 20, justifyContent: 'flex-start', alignSelf: 'flex-end'
            }}>
            </View>
        )
    }

    render() {
        let Tlscroll = this.getTimelineScrollBar()

        return (

            <ScrollView contentContainerStyle={styles.imageCarousel} >

                <Text style={{ alignSelf: 'center' }}  >I am scrollbar</Text>
                {Tlscroll}
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
    },


})
import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

export default class TimelineScroll extends React.Component {

    state = {
        currentTimestamp: this.props.currentTimestamp,
        scrollPosition: 0,
        array: this.props.data,
        mode: this.props.mode,

    }

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

    handleScroll = (event) => {
        //console.log(event.nativeEvent.contentOffset.x)
        this.setState(
            {
                scrollPosition: event.nativeEvent.contentOffset.x + (this.state.timelineWidth * 0.5)
            }
        )
        this.getCurrentTimestampFromCurrentPosition

    }

    getCurrentTimestampFromCurrentPosition = () => {
        //make a function that receives scrollPosition and converts it to ms
    }

    render() {
        let Tlscroll = this.getTimelineScrollBar()

        return (

            <ScrollView contentContainerStyle={styles.imageCarousel} onScroll={this.handleScroll}>

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
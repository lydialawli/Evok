import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/evokFilesystem.js'

let lineXhour =
    <View style={{ borderColor: 'transparent', borderBottomColor: 'green', borderWidth: 2, width: 20, height: 2 }}>
    </View>


export default class TimeLine extends React.Component {
    state = {
        groupedPhotos: [],
        arrayLengthInHours: 0
    }

    componentWillMount() {
        this.getList()
    }

    getList = () => {
        let currentFolder = evokFileSystem.getPath('myPro', '')

        evokFileSystem.getArrayOfPicObjects(currentFolder, this.onFilesListed)
    }

    onFilesListed = (result) => {
        this.setState(
            {
                groupedPhotos: result,
            }
        )
        this.getArrayLengthInHours()
    }

    getArrayLengthInHours = () => {
        this.setState(
            {
                arrayLengthInHours: this.getFullDurationInHours(this.state.groupedPhotos),
            }
        )
        console.log('array length in hours: ' + this.state.arrayLengthInHours)
    }


    milisecIntoHours(milisecs) {
        h = milisecs / (60 * 60 * 1000)
        return h.toFixed(5)
    }

    getFullDurationInHours = (array) => {
        if (array.length === 0)
            return 0

        let arrayLastItem = array.length - 1
        console.log(array.length - 1, array[arrayLastItem])
        return this.milisecIntoHours(array[arrayLastItem].timestamp - array[0].timestamp)
    }

    getLineXhour = () => {
        let newWidth = 0
        if (this.state.arrayLengthInHours === 0) { newWidth = 20 }
        else { newWidth = Math.round(this.state.arrayLengthInHours)*10}
        console.log('new width is ' + newWidth)
        return (
            <View style={{
                backgroundColor: 'yellow', width: newWidth,
                height: 20, justifyContent: 'flex-start', alignSelf: 'flex-end'
            }}>
            </View>
        )
    }

    handleScroll = (event) => { 
        console.log(event.nativeEvent.contentOffset.x)
       }

    render() {

        let timelineSexyVersion = this.state.groupedPhotos.map(
            (picObject, index, array) => {
                let previousPic = array[index - 1]
                let milisecsSinceLastPic = 0
                let hoursSinceLastPic = 0

                if (index > 0) {
                    milisecsSinceLastPic = picObject.timestamp - previousPic.timestamp
                    hoursSinceLastPic = this.milisecIntoHours(milisecsSinceLastPic)
                }
                return (
                    <View style={evokStyles.timelineObject} key={picObject.timestamp}>
                        <Text style={evokStyles.timelineObjectText} >
                            {new Date(picObject.timestamp).toDateString().replace(2018, "")}
                        </Text>
                        <View style={evokStyles.timeLineIcon} >
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-git-commit" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <View style={{ borderColor: 'red', borderWidth: 0.6, backgroundColor: 'red', width: hoursSinceLastPic * 20 }} />
                        </View>
                        <Text> {new Date(picObject.timestamp).getHours()}:{new Date(picObject.timestamp).getMinutes()}</Text>
                    </View>
                )

            }
        )

        let timelineTrueVersion = this.state.groupedPhotos.map(
            (picObject, index, array) => {
                let previousPic = array[index - 1]
                let milisecsSinceLastPic = 0
                let hoursSinceLastPic = 0

                if (index > 0) {
                    milisecsSinceLastPic = picObject.timestamp - previousPic.timestamp
                    hoursSinceLastPic = this.milisecIntoHours(milisecsSinceLastPic)

                }
                return (
                    <View style={evokStyles.timelineObject} key={picObject.timestamp}>
                        <Text style={evokStyles.timelineObjectText} >
                            {new Date(picObject.timestamp).toDateString().replace(2018, "")}
                        </Text>
                        <View style={evokStyles.timeLineIcon} >
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-git-commit" size={40} color="black" containerStyle={flex = 1} />
                            <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                            <View style={{ borderColor: 'red', borderWidth: 0.6, backgroundColor: 'red', width: 20 }} />
                        </View>
                    </View>
                )
            }
        )

        let lineXhour = this.getLineXhour()

        return (

            <View style={evokStyles.timeLineElementsInside}>
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true}>
                    {timelineSexyVersion}
                </ScrollView>
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true}>
                    {timelineTrueVersion}
                </ScrollView>
                <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true} onScroll={this.handleScroll} >
                    {lineXhour}
                </ScrollView>
            </View>

        )
    }

}

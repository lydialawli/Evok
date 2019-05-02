import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Switch, Button, Dimensions, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import TimeLine_ from '../src/_TimeLine.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import { FileSystem } from 'expo'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import newEvokFileSystem from '../src/newEvokFileSystem.js'
import CurrentPic from '../src/currentPic.js'
import TimeLine from '../src/timeline/TimeLine.js'


export default class ElementScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            //header: 'false',
            headerTitle: params.elementName,
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name="ios-code-working" size={20} color={tintColor}></Ionicons>
            },
            headerStyle: {
                backgroundColor: 'grey',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },

            headerRight: <Ionicons
                name="md-settings"
                size={30}
                color="white"
                style={{ paddingRight: 20 }}
                onPress={() => navigation.navigate('Settings')}
            ></Ionicons>,

        }
    }

    state = {
        groupedPhotos: [],
        modalVisible: false,
        selectedFullImagePicObject: null,
        rootDirectory: FileSystem.documentDirectory,
        //projectID: this.props.navigation.state.params.projectID,
        elementID: this.props.navigation.state.params.elementID,
        elementObj: {},
        imageHistory: {},
        selectedItemTimestamp: 0,
        sliderValue: 0.5,
        imageDisplayed: 0,
        currentImageTimestamp: 0,
        placeholderImage: 'https://www.l-nutra.com/wp-content/uploads/2018/07/placeholder.png',
        currentImage: '',
        nextImage: '',
        isHalfway: false,
        switchValue: this.props.navigation.state.params.switchValue,
        cardWidth: 300
    }

    async componentWillMount() {
        this.onOpenedElementScreen(this.state.elementID)
        //this._getList()
    }

   

    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
        console.log('Switch is: ' + value)
    }


    onOpenedElementScreen = (elementID) => {
        this.setState({
            elementObj: newEvokFileSystem.getElementObj(elementID),
            imageHistory: newEvokFileSystem.getElementObj(elementID).imageHistory,
        })
        //console.log('imageHistory: ' + this.state.imageHistory)
    }


    _getList = () => {

        let currentFolder = evokFileSystem.getPath(this.state.projectID, '')

        evokFileSystem.getArrayOfPicObjects(currentFolder, this._onFilesListed)
    }

    _onFilesListed = (result) => {
        this.setState(
            {
                groupedPhotos: result,
            }
        )
    }

    _onCameraPressed = (projectName) => {
        this.props.navigation.navigate('Camera', { projectID: projectName })
    }


    getItemImage = (index, index2, isHalfway) => {
        var pic1 = this.state.imageHistory[index].uri
        var pic2 = this.state.imageHistory[index2].uri

        this.setState({
            currentImage: this.state.rootDirectory + 'images/' + pic1,
            isHalfway: isHalfway
        })


        if (index2 != 0) {
            this.setState({
                nextImage: this.state.rootDirectory + 'images/' + pic2
            })
        }
    }

    timelineSeparator = (text) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{
                    height: 1.5,
                    borderColor: 'grey',
                    backgroundColor: 'grey',
                    width: this.state.cardWidth * 0.3,
                    alignSelf: 'center'
                }} />
                <Text style={{ alignSelf: 'center', fontSize: 20, color: 'grey', padding: 10 }}>{text}</Text>
                <View style={{
                    height: 1.5,
                    borderColor: 'grey',
                    backgroundColor: 'grey',
                    width: this.state.cardWidth * 0.3,
                    alignSelf: 'center'
                }} />
            </View>

        )
    }
    getTimeline = () => {
        if (this.state.imageHistory.length == 0) {
            return (
                <Text>no images yet</Text>
            )
        }
        else {
            return (
                <TimeLine
                    data={this.state.imageHistory}
                    timestamp={this.state.imageHistory[0].timestamp}
                    currentImageTimestamp={this.state.currentImageTimestamp}
                    width={this.state.cardWidth}
                    scale={1 / 3600}
                    mode={'horizontal'}
                    cardWidth={this.state.cardWidth}
                    onPositionChanged={this.getItemImage}
                    styles={{ justifyContent: 'center', }}
                    objWidth={100}
                />)
        }
    }


    render() {
        const { navigate } = this.props.navigation
        console.log("Element mode")
        let separatorTimeline = this.timelineSeparator("Timeline")
        let separatorMeta = this.timelineSeparator("Meta info")
        let timelineBar = this.getTimeline()

        return (
            <ScrollView contentContainerStyle={elementScreenStyle.screenContainer} scrollEnabled={true}>


                <View style={elementScreenStyle.imageCard}>
                    <CurrentPic
                        data={this.state.imageHistory}
                        imagesFolder={FileSystem.documentDirectory + 'images/'}
                        placeholder={this.state.placeholderImage}
                        currentImage={this.state.currentImage}
                        nextImage={this.state.nextImage}
                        isHalfway={this.state.isHalfway}
                        switchIsOn={this.state.switchValue}
                    />
                </View>


                <View style={elementScreenStyle.timelineContainer}>
                    {separatorTimeline}
                    {timelineBar}
                    {separatorMeta}

                </View>
            </ScrollView>
        )

    }
    // <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />
    /*_render() {
        const { navigate } = this.props.navigation
        //console.log("Element mode")
        // console.log('width is: ' + this.state.timelineWidth)

        let images = this.state.imageHistory.map(
            (imageObj) => {

                let imagePath = this.state.rootDirectory + 'images/' + imageObj.uri

                return (
                    <TouchableOpacity key={imageObj.uri}>
                        <ImageBackground
                            style={{ width: 300, height: 300, margin: 1 }}
                            source={{ uri: imagePath }}>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        let images2 = this.state.imageHistory.map(
            (imageObj) => {

                let imagePath = this.state.rootDirectory + 'images/' + imageObj.uri

                return (
                    <TouchableOpacity key={imageObj.uri}>
                        <ImageBackground
                            style={{ width: 300, height: 300, margin: 1, opacity: 0 }}
                            source={{ uri: imagePath }}>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        updateCurrentMoment = (curentPosition) => {
            this.setState({
                currentImageTimestamp: curentPosition
            })
        }

        isEmpty = (obj) => {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false
            }
            return true
        }

        return (
        <ScrollView contentContaistylenerStyle={timelineCardStyle.screenContainer} >
                <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />

                <View style={timelineCardStyle.imageCard}>
                    <CurrentPic
                        data={this.state.imageHistory}
                        imagesFolder={FileSystem.documentDirectory + 'images/'}
                        placeholder={this.state.placeholderImage}
                        currentImage={this.state.currentImage}
                        nextImage={this.state.nextImage}
                        isHalfway={this.state.isHalfway}
                        switchIsOn={this.state.switchValue}
                    />
                </View>


                <View style={timelineCardStyle.sliderCard}>
                    <Text style={{ alignSelf: 'center', fontSize: 30, color: 'grey' }}>|</Text>
                    <TimeLine
                        data={this.state.imageHistory}
                        timestamp={this.state.imageHistory[0].timestamp}
                        currentImageTimestamp={this.state.currentImageTimestamp}
                        width={300}
                        scale={1 / 3600}
                        onTimelineMoved={this.updateCurrentMoment}
                        mode={'horizontal'}
                        cardWidth={300}
                        onPositionChanged={this.getItemImage}
                        styles={{ justifyContent: 'center', alignSelf: 'center' }}
                        objWidth={100}
                    />

                </View>
            </ScrollView>
        )

    }*/



}

elementScreenStyle = StyleSheet.create({
    screenContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //paddingTop: 5
    },

    timelineContainer: {
        width: 300,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#ffb84d',
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 10,
        //paddingTop: 100,
        //margin: 10,
        //elevation: 3,
    },

    imageCard: {
        height: 300,
        width: 300,
        borderColor: '#ffb84d',
        backgroundColor: 'lightblue',
        alignItems: 'flex-start',
        borderRadius: 10,
        elevation: 3,
        margin: 10
    },
}
)
import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Switch, Button, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
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
        placeholderImage: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        currentImage: '',
        nextImage: '',
        isHalfway: false,
        switchValue: false,
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


    render() {
        const { navigate } = this.props.navigation
        console.log("Element mode")


        return (
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 20 }}>
                <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />

                <View style={evokStyles.projectCard}>
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


                <View style={evokStyles.sliderCard}>
                    <Text style={{ alignSelf: 'center', fontSize: 30, color: 'grey' }}>|</Text>
                    <TimeLine
                        data={this.state.imageHistory}
                        timestamp={this.state.imageHistory[0].timestamp}
                        currentImageTimestamp={this.state.currentImageTimestamp}
                        width={300}
                        scale={1 / 3600}
                        mode={'horizontal'}
                        cardWidth={300}
                        onPositionChanged={this.getItemImage}
                        styles={{ justifyContent: 'center', alignSelf: 'center' }}
                        objWidth={100}
                    />

                </View>
            </View>
        )

    }

    _render() {
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
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />

                <View style={evokStyles.projectCard}>
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


                <View style={evokStyles.sliderCard}>
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
            </View>
        )

    }



}
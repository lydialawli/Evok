import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import TimeLine from '../src/_TimeLine.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import { FileSystem } from 'expo'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import newEvokFileSystem from '../src/newEvokFileSystem.js'

export default class ElementScreen extends React.Component {
    static navigationOptions = {
        title: 'Element',
        headerStyle: {
            backgroundColor: 'grey',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
        }
    }

    state = {
        groupedPhotos: [],
        modalVisible: false,
        selectedFullImagePicObject: null,
        rootDirectory: FileSystem.documentDirectory,
        projectID: this.props.navigation.state.params.projectID,
        elementID: this.props.navigation.state.params.elementID,
        elementObj: {},
        imageHistory: {},
        sliderValue: 0.5,
        imageDisplayed: 0
    }

    async componentWillMount() {
        this.onOpenedElementScreen(this.state.elementID)
        this._getList()
    }

    onOpenedElementScreen = (elementID) => {
        this.setState({
            elementObj: newEvokFileSystem.getElementObj(elementID),
            imageHistory: newEvokFileSystem.getElementObj(elementID).imageHistory
        })
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

    _alertDeleteWarning = (picObject) =>
        Alert.alert(
            'Delete ' + picObject.fileName,
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { evokFileSystem.deleteFile(picObject.fileUri, this.getList), console.log('pic deleted') } }
            ],
            { cancelable: false }
        )

    _getFullImageView = (picObject) => {

        console.log('viewFullImage', picObject)

        if (!picObject)
            return (
                <View style={{ flex: 1 }}>
                    <Text> No picObject   </Text>
                </View>
            )

        return (
            <View style={{ width: '90%', height: '90%', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: picObject.fileUri }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    _setModalVisible(visible, picObject) {
        console.log('modalview', visible, picObject)
        this.setState({
            modalVisible: visible,
            selectedFullImagePicObject: picObject
        })

    }

    _onCameraPressed = (projectName) => {
        this.props.navigation.navigate('Camera', { projectID: projectName })
    }

    getImageDisplayed = () => {
        let imageUri = this.state.imageHistory[this.state.imageDisplayed].uri
        let imagePath = this.state.rootDirectory + 'images/' + imageUri

        return (
            <TouchableOpacity >
                <ImageBackground
                    style={{ width: 300, height: 300, margin: 1 }}
                    source={{ uri: imagePath }}>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Element mode")

        let imageDisplayed = this.getImageDisplayed()

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

        return (
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>

                <Text  >
                    Element name is: {JSON.stringify(this.state.elementObj.name)}
                </Text>

                <View style={evokStyles.projectCard}>
                    {imageDisplayed}
                </View>

                <View style={evokStyles.timeLineCard}>
                    <TimeLine />
                </View>

                <View style={evokStyles.sliderCard}>

                </View>
            </View>
        )
    }

    _render() {
        const { navigate } = this.props.navigation
        console.log("Element mode")

        let images = this.state.groupedPhotos.map(
            (picObject) => {

                let onPressPic = () => {
                    console.log(picObject)
                    this._setModalVisible(true, picObject)
                }

                return (
                    <TouchableOpacity key={picObject.fileUri} onPress={onPressPic} onLongPress={() => this._alertDeleteWarning(picObject)}>
                        <ImageBackground
                            style={{ width: 300, height: 300, margin: 1 }}
                            source={{ uri: picObject.fileUri }}>
                            <Text> {new Date(picObject.timestamp).toDateString()} {new Date(picObject.timestamp).toLocaleTimeString()} </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        let fullImage = this._getFullImageView(this.state.selectedFullImagePicObject)

        return (

            <View style={evokStyles.elementContainer}>
                <TouchableOpacity style={evokStyles.plusIcon} onPress={() => this._onCameraPressed(this.state.projectID)}>
                    <Ionicons name="ios-add-circle-outline" size={40} color="black" />
                </TouchableOpacity>
                <View style={evokStyles.elementInfoDisplayContainer}>
                    <View style={evokStyles.elementInfoDisplay2Containers} >
                        <Text style={evokStyles.textRedElementInfoDisplay} >
                            {this.state.groupedPhotos.length}
                        </Text>
                        <Text style={evokStyles.textRedElementInfoDisplay} >
                            in 2 days
                            </Text>
                        <Text style={evokStyles.textRedElementInfoDisplay} >
                            15
                            </Text>
                    </View>
                    <View style={evokStyles.elementInfoDisplay2Containers} >
                        <Text style={evokStyles.textGreyElementInfoDisplay} >
                            Snaps
                            </Text>
                        <Text style={evokStyles.textGreyElementInfoDisplay} >
                            Next
                            </Text>
                        <Text style={evokStyles.textGreyElementInfoDisplay} >
                            Left
                            </Text>
                    </View>
                </View>

                <View style={evokStyles.projectCard}>
                    <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true}>
                        {images.reverse()}
                    </ScrollView>
                </View>

                <View style={evokStyles.timeLineCard}>
                    <TimeLine />
                </View>


                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert('Modal has been closed.') }}
                    animationType={'slide'}
                    transparent={true}
                >
                    <View style={evokStyles.modalWindow}>
                        {fullImage}

                        <TouchableHighlight style={evokStyles.buttonHideModal}
                            onPress={() => {
                                this._setModalVisible(!this.state.modalVisible)
                            }}>
                            <Text>Hide Picture</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>


            </View>
        )
    }

}



/* 
old maybe useful code: 

   <View style={evokStyles.projectCard}>
        <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true}>
            {images.reverse()}
        </ScrollView>
    </View>
    
    NORMAL REACT NATIVE SLIDER:
    <View style={{ height:50, width: 250, alignItems: 'stretch', justifyContent: 'center' }}>
        <Slider
            maximumValue={10}
            minimumValue={0}
            minimumTrackTintColor='#ffcc00'
            value={this.state.sliderValue}
            onValueChange={(sliderValue) => this.setState({ sliderValue })} />
            <Text>Value: {this.state.sliderValue}</Text>
    </View>
*/
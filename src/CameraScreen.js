import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, Button, Icon, Slider } from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'
import { StackNavigator } from 'react-navigation'
import GalleryScreen from '../src/GalleryScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import EvokCamera from '../src/EvokCamera.js'


export default class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Camera',
    }

    state = {
        camerasCurrentProjectID: this.props.navigation.state.params.projectID,
        elementID: this.props.navigation.state.params.elementID
    }

    _render() {
        const { navigate } = this.props.navigation
        console.log("Camera mode")
        return (
            <View style={evokStyles.camScreenView}>
                <OldEvokCamera projectID={this.state.camerasCurrentProjectID} />
                <View style={evokStyles.bottomBar}>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-home-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Gallery')}>
                        <Ionicons name="md-images" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Camera mode")
        return (
            <View style={evokStyles.camScreenView}>
                <EvokCamera elementID={this.state.elementID}></EvokCamera>
                <View style={evokStyles.bottomBar}>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-home-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Gallery')}>
                        <Ionicons name="md-images" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



class OldEvokCamera extends React.Component {

    state = {
        isPreviewMode: false,
        picturePreviewPath: '',
        hasCameraPermission: null,
        type: 'back',
        flashMode: 'off',
        ratio: '16:9',
        whiteBalance: 'auto',
        zoom: 0,
        autofocus: 'on',
        showGallery: 'false',
        permissionsGranted: true,
        groupedPhotos: [],
        lastPicOpacity: 0.5,
        onionSkin: '',
        projectID: this.props.projectID,


    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        this.getList()
    }

    getList = () => {
        let currentFolder = evokFileSystem.getPath(this.state.projectID, '')

        evokFileSystem.getArrayOfPicObjects(currentFolder, this.onFilesListed)
    }

    onFilesListed = (result) => {
        this.setState(
            {
                groupedPhotos: result,
            }
        )
        //console.log(this.state.groupedPhotos)

    }

    takePicture = async () => {
        console.log("...takePicture")

        if (!this.camera)
            return

        this.camera.takePictureAsync()
            .then(data => {

                let newFileName = Date.now() + '.jpg'
                let currentFolder = evokFileSystem.getPath(this.state.projectID, '')

                evokFileSystem.createDirectoryIfDoesntExist(currentFolder, () => {

                    evokFileSystem.moveFile(data.uri, currentFolder, newFileName, this.onMoved)
                })

                this.setState({
                    isPreviewMode: true,
                    picturePreviewPath: evokFileSystem.getPath(this.state.projectID, newFileName),

                })

                console.log("getinfo: ", FileSystem.getInfoAsync(currentFolder))
            })
            .catch(err => console.error(err))
    }


    onMoved = () => {
        console.log('file moved')

    }

    goToPreviewMode = () => {
        this.setState({ isPreviewMode: true })
    }

    goToCameraMode = () => {
        this.setState({ isPreviewMode: false })
    }

    getPreviewImageView() {

        if (!this.state.picturePreviewPath)
            return <View />

        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, marginTop: 20 }}
                    source={{ uri: this.state.picturePreviewPath }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    getPreviewView() {
        return (
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-around', paddingTop: 30 }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {this.getPreviewImageView()}
                </View>
                <View style={evokStyles.previewButtonContainer}>
                    <TouchableOpacity style={evokStyles.goToCameraButton} onPress={this.goToCameraMode}>
                        <Ionicons name="ios-arrow-dropleft" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getOnionSkin = () => {
        return (
            <ImageBackground
                style={{ flex: 7, justifyContent: 'center', opacity: this.state.lastPicOpacity }}
                resizeMode="contain"
                source={{ uri: this.state.groupedPhotos[0].fileUri }}>
            </ImageBackground>
        )
    }
    getCameraView() {
        let lastPicUri = ''
        if (this.state.groupedPhotos.length > 0)
            lastPicUri = this.state.groupedPhotos[this.state.groupedPhotos.length - 1].fileUri

        console.log(lastPicUri, this.state.groupedPhotos.length)
        let onionSkin = <View />
        if (lastPicUri)
            onionSkin = this.getOnionSkin()


        return (
            <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                <Camera
                    ref={ref => { this.camera = ref }}
                    style={evokStyles.cameraView}
                    ratio={this.state.ratio}
                >
                    <View
                        style={{
                            width: '100%', height: '100%',
                            backgroundColor: 'transparent',

                        }}>

                        {onionSkin}

                        <View
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <Slider
                                style={evokStyles.opacitySlider}
                                step={0}
                                maximumValue={1}
                                value={this.state.lastPicOpacity}
                                minimumTrackTintColor='#ffcc00'
                                lastPicOpacity={this.state.lastPicOpacity}
                                onValueChange={lastPicOpacity => this.setState({ lastPicOpacity })}
                            />

                            <TouchableOpacity style={evokStyles.snapCamButton} onPress={this.takePicture.bind(this)}>
                                <Ionicons name="md-aperture" size={50} color="white" />
                            </TouchableOpacity>

                        </View>

                    </View>


                </Camera>
            </View >
        )
    }



    render() {

        const { hasCameraPermission } = this.state

        if (hasCameraPermission === null) {
            return <Text>Camera permission is null</Text>
        }

        else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }

        let viewToRender = this.getCameraView()

        if (this.state.isPreviewMode)
            viewToRender = this.getPreviewView()

        return viewToRender
    }
}
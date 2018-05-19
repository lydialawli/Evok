import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, Button, Icon } from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'
import { StackNavigator } from 'react-navigation'
import GalleryScreen from '../src/GalleryScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokFileSystem from '../src/evokFilesystem.js'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'


export default class CameraScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Camera',
    }


    render() {
        const { navigate } = this.props.navigation
        console.log("Camera mode")
        return (
            <View style={evokStyles.camScreenView}>
                <EvokCamera />
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



class EvokCamera extends React.Component {
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

        ratios: [],
        photos: [],
        showGallery: 'false',
        permissionsGranted: true
    }

    async componentWillMount() {
        console.log("...componentWillMount")
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    takePicture = async () => {
        console.log("...takePicture")

        if (!this.camera)
            return

        this.camera.takePictureAsync()
            .then(data => {

                let newFileName = Date.now() + '.jpg'
                let currentFolder = evokFileSystem.getPath('myPro', '')

                evokFileSystem.createDirectoryIfDoesntExist(currentFolder, () => {

                    evokFileSystem.moveFile(data.uri, currentFolder, newFileName, this.onMoved)
                })

                this.setState({
                    isPreviewMode: true,
                    picturePreviewPath: evokFileSystem.getPath('myPro', newFileName),

                })
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

    getCameraView() {
        return (
            <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                <Camera
                    ref={ref => { this.camera = ref }}
                    style={evokStyles.cameraView}
                    ratio={this.state.ratio}
                >
                    <View
                        style={{
                            flex: 0.5,
                            alignSelf: 'flex-end',
                            backgroundColor: 'transparent'
                        }}>
                        <TouchableOpacity style={evokStyles.snapCamButton} onPress={this.takePicture.bind(this)}>
                            <Ionicons name="md-aperture" size={40} color="white" />
                        </TouchableOpacity>

                    </View>
                </Camera>
            </View>
        )
    }

    getGalleryView() {
        return (
            <GalleryScreen image={this.state.picturePreviewPath} />
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
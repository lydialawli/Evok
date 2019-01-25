import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground, Button, Icon, Slider } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import newEvokFileSystem from '../src/newEvokFileSystem.js'
import evokStyles from '../src/evokStyles.js'


export default class EvokCamera extends React.Component {

    state = {
        hasCameraPermission: null,
        elementID: this.props.elementID,
        imageHistory: {},
        isPreviewMode: false,
        imageToPreview: '',
        type: 'back',
        flashMode: 'off',
        ratio: '16:9',
        lastImagePath: '',
        lastPicOpacity: 0.5,
        onionSkin: '',
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        this.setImageHistoryObj(this.state.elementID)
    }

    setImageHistoryObj = (elementID) => {
        this.setState({
            imageHistory: newEvokFileSystem.getElementObj(elementID).imageHistory,
        })
        this.setState({
            lastImagePath: newEvokFileSystem.getImagePath(this.state.imageHistory[this.state.imageHistory.length - 1].uri)
        })
    }

    takePicture = async () => {
        console.log("...takePicture")

        if (!this.camera)
            return

        this.camera.takePictureAsync()
            .then(data => {
                newEvokFileSystem.saveImage(data.uri, this.state.elementID, this.setImageHistoryObj, this.onPictureTaken)

            })
            .catch(err => console.error(err))
    }

    onPictureTaken = (filePath) => {
        this.setState({
            isPreviewMode: true,
            imageToPreview: filePath
        })
    }

    goToPreviewMode = () => {
        this.setState({ isPreviewMode: true })
    }

    getPreviewImageView() {

        if (!this.state.imageToPreview)
            return <View />

        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, marginTop: 20 }}
                    source={{ uri: this.state.imageToPreview }}
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
                style={{ width: '100%', height: '100%', justifyContent: 'center', opacity: this.state.lastPicOpacity, position: 'absolute' }}
                resizeMode="contain"
                source={{ uri: this.state.lastImagePath }}>
            </ImageBackground>
        )
    }


    getOpacitySlider = () => {
        return (
            <Slider
                style={evokStyles.opacitySlider}
                step={0}
                maximumValue={1}
                value={this.state.lastPicOpacity}
                minimumTrackTintColor='#ffcc00'
                lastPicOpacity={this.state.lastPicOpacity}
                onValueChange={lastPicOpacity => this.setState({ lastPicOpacity })}
            />
        )
    }


    goToCameraMode = () => {
        this.setState({ isPreviewMode: false })
    }

    getCameraView = () => {

        let onionSkin = this.getOnionSkin()

        let opacitySlider = this.getOpacitySlider()

        return (
            <View style={styles.view}>
                <Camera
                    ref={ref => { this.camera = ref }}
                    style={evokStyles.cameraView}
                    ratio={this.state.ratio}
                >
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>

                        {onionSkin}
                        <View style={{ width: '100%', height: '100%',position: 'absolute', flexDirection: 'column', justifyContent: 'flex-end'}}>
                            {opacitySlider}
                            <TouchableOpacity style={evokStyles.snapCamButton} onPress={this.takePicture.bind(this)}>
                                <Ionicons name="md-aperture" size={50} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>

            </View>
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

styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    text: {
        flex: 1,
        justifyContent: 'center',
        color: 'white',
        textShadowRadius: 2,
        fontWeight: 'bold',
        fontSize: 25,
    },
})
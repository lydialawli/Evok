import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, Button, Icon } from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'
import GalleryScreen from '../src/GalleryScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokFileSystem from '../src/evokFilesystem.js'


export default class extends React.Component {
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
        photoId: 1,
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

                let newFileName = this.state.photoId + '.jpg'
                let currentFolder = evokFileSystem.getPath('myPro', '')

                evokFileSystem.createDirectoryIfDoesntExist(currentFolder, () => {

                    evokFileSystem.moveFile(data.uri, currentFolder, newFileName, this.onMoved)
                })

                this.setState({
                    isPreviewMode: true,
                    picturePreviewPath: evokFileSystem.getPath('myPro', newFileName),
                    photoId: this.state.photoId + 1
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
                <View style={styles.previewButtonContainer}>
                    <TouchableOpacity style={styles.goToCameraButton} onPress={this.goToCameraMode}>
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
                    style={styles.preview}
                    ratio={this.state.ratio}
                >
                    <View
                        style={{
                            flex: 0.5,
                            alignSelf: 'flex-end',
                            backgroundColor: 'transparent'
                        }}>
                        <TouchableOpacity style={styles.snapButton} onPress={this.takePicture.bind(this)}>
                            <Ionicons name="md-aperture" size={40} color="white" />
                        </TouchableOpacity>

                    </View>
                </Camera>
            </View>
        )
    }

    getGalleryView(){
        return (
             <GalleryScreen image = {this.state.picturePreviewPath}/>
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

    /* _render() {
         const cameraScreenContent = this.state.permissionsGranted
             ? this.renderCamera()
             : this.()
         const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent
         return <View style={styles.container}>{cameraScreenContent}</View>
     }
     */
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcccc',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    goToCameraButton: {
        width: 50,
        height: 50,
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 3

    },

    previewButtonContainer: {
        width: 200,
        height: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginLeft: 70,

    },

    snapButton: {
        flex: 0.5,
        backgroundColor: '#ff6666',
        borderRadius: 5,
        marginHorizontal: 2,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 20
    }
})
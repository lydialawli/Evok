import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'
import GalleryScreen from '../src/GalleryScreen.js'

export default class extends React.Component {
    state = {
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
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    componentDidMount() {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    takePicture = async () => {
        if (this.camera) {
            this.camera.takePictureAsync()
                .then(data => {
                    FileSystem.moveAsync({
                        from: data.uri,
                        to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
                    }).then(() => {
                        console.log('saved!', `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`)
                        this.setState({
                            photoId: this.state.photoId + new Date().getTime(),
                        })
                        
                    }).catch(err => console.error(err))
                })
                .catch(err => console.error(err))
        }
    }

    handleError() {

    }

    /*
    toggleView() {
      this.setState({
        showGallery: !this.state.showGallery,
      })
    }
    */

    renderNoPermissions() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={{ color: 'white' }}>
                    Camera permissions not granted - No access to camera
        </Text>
            </View>
        )
    }

    renderGallery() {
        return <GalleryScreen onPress={this.toggleView.bind(this)} />
    }

    render() {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <Text>Camera permission is null</Text>
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => { this.camera = ref }}
                        style={styles.preview}
                        ratio={this.state.ratio}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignSelf: 'flex-end',
                                backgroundColor: 'transparent'
                            }}>
                            <TouchableOpacity style={styles.snapButton} onPress={this.takePicture.bind(this)}>
                                <Text style={styles.buttonText}>Snap!</Text>
                            </TouchableOpacity>

                        </View>
                    </Camera>
                </View>
            )
        }
    }

    _render() {
        const cameraScreenContent = this.state.permissionsGranted
            ? this.renderCamera()
            : this.renderNoPermissions()
        const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent
        return <View style={styles.container}>{cameraScreenContent}</View>
    }
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

    snapButton: {
        flex: 0.1,
        height: 40,
        backgroundColor: '#ff6666',
        borderRadius: 8,
        marginHorizontal: 2,
        padding: 5,
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 20
    }



})
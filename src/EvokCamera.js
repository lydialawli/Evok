import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground, Button, Icon } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import newEvokFileSystem from '../src/newEvokFileSystem.js'
import evokStyles from '../src/evokStyles.js'


export default class EvokCamera extends React.Component {

    state = {
        hasCameraPermission: null,
        elementID: this.props.elementID,
        elementObj: {}
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        this.setElementObJ(this.state.elementID)
    }

    setElementObJ = (elementID) => {
        this.setState({
            elementObj: newEvokFileSystem.getElementObj(elementID)
        })
    }


    takePicture = async () => {
        console.log("...takePicture")

        if (!this.camera)
            return

        this.camera.takePictureAsync()
            .then(data => {
                newEvokFileSystem.saveImage(data.uri, this.state.elementID, this.setElementObJ)
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <View style={styles.view}>
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
                        <Text style={styles.text}> This is element's ID: {this.state.elementID}</Text>
                        <TouchableOpacity style={evokStyles.snapCamButton} onPress={this.takePicture.bind(this)}>
                            <Ionicons name="md-aperture" size={50} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>

            </View>
        )
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
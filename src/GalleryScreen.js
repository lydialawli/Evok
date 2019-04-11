import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'

export default class GalleryScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Gallery',
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")
        return (
            <View style={evokStyles.galleryView}>
                <Text>I am gallery screen</Text>
            </View>
        )
    }


    /*state = {
        groupedPhotos: [],
        modalVisible: false,
        selectedFullImagePicObject:  null
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
                groupedPhotos: result
            }
        )
    }

    alertDeleteWarning = (picObject) =>
        Alert.alert(
            'Delete ' + picObject.fileName,
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { evokFileSystem.deleteFile(picObject.fileUri, this.getList) } }
            ],
            { cancelable: false }
        )

    getFullImageView = (picObject) => {

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

    setModalVisible(visible, picObject) {
        console.log('modalview', visible, picObject)
        this.setState({
            modalVisible: visible,
            selectedFullImagePicObject: picObject
        })

    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")

        let images = this.state.groupedPhotos.map(
            (picObject) => {

                let onPressPic = () => {
                    console.log(picObject)
                    this.setModalVisible(true, picObject)
                }

                return (
                    <TouchableOpacity key={picObject.fileUri} onPress={onPressPic} onLongPress={() => this.alertDeleteWarning(picObject)}>
                        <ImageBackground
                            style={{ width: 80, height: 80, margin: 1 }}
                            source={{ uri: picObject.fileUri }}>
                            <Text> {new Date(picObject.timestamp).toDateString()} {new Date(picObject.timestamp).toLocaleTimeString()} </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        let fullImage = this.getFullImageView(this.state.selectedFullImagePicObject)

        return (
            <View style={evokStyles.galleryView} >
                <Text style={evokStyles.projectTextinGallery}>My project name</Text>
                <ScrollView contentContainerStyle={evokStyles.imagesWrapper}>
                    {images}
                </ScrollView>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert('Modal has been closed.') }}
                    animationType= {'slide'}
                    transparent = {true}
                   >

                    <View style={evokStyles.modalWindow}>
                        {fullImage}

                        <TouchableHighlight style={evokStyles.buttonHideModal}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                            <Text>Hide Picture</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

                <View style={evokStyles.bottomBar}>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-home-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Camera')}>
                        <Ionicons name="ios-add-circle-outline" size={40} color="white" />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }*/

}

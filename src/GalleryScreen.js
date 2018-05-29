import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/evokFilesystem.js'

export default class GalleryScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Gallery',
    }

    state = {
        groupedPhotos: [],
        modalVisible: false
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
                { text: 'OK', onPress: () => { evokFileSystem.deleteImagefromGallery(picObject.fileUri, this.getList) } }
            ],
            { cancelable: false }
        )

    viewFullImage = (lala) => {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1 }}
                    source={{ uri: lala }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")

        let images = this.state.groupedPhotos.map(
            (picObject) => {
                return (
                    <TouchableOpacity key={picObject.fileUri} onLongPress={() => this.alertDeleteWarning(picObject)}>
                        <ImageBackground
                            style={{ width: 80, height: 80, margin: 3 }}
                            source={{ uri: picObject.fileUri }}>
                            <Text> {new Date(picObject.timestamp).toString()} </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        return (
            <View style={evokStyles.galleryView} >
                <Text style={evokStyles.projectTextinGallery}>My project name</Text>
                <ScrollView contentContainerStyle={evokStyles.imagesWrapper}>
                    {images}
                </ScrollView>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert('Modal has been closed.') }} >
                    <View>
                        <Text>Hello World!</Text>
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>

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
    }

}



/* 
<TouchableOpacity style={evokStyles.homeButton} onPress={this.getList}>                     
    <Ionicons name="ios-barcode-outline" size={40} color="white" />
</TouchableOpacity>
*/
import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, Text, Alert } from 'react-native'
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
        groupedPhotos: []
    }

    componentWillMount() {
        this.getList()
    }

    getList = () => {
        let currentFolder = evokFileSystem.getPath('myPro', '')

        evokFileSystem.getFilesUriInDirectory(currentFolder, this.onFilesListed)
    }

    onFilesListed = (result) => {
        this.setState(
            {
                groupedPhotos: result
            }
        )
    }

    alertDeleteWarning = (fileUri) =>
        Alert.alert(
            'Delete Picture',
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => {evokFileSystem.deleteImagefromGallery(fileUri, this.updatePhotoList)} }
            ],
            { cancelable: false }
        )

    updatePhotoList = () => {this.getList(), console.log('pic deleted')}

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode") 

        let images = this.state.groupedPhotos.map(
            (fileUri) => {
                return (
                    <TouchableOpacity key={fileUri} onPress={() => this.alertDeleteWarning(fileUri)}>
                        <Image
                            style={{ width: 100, height: 100, margin: 3 }}
                            source={{ uri: fileUri }}
                        />
                    </TouchableOpacity>
                )
            }
        )

        return (
            <View style={evokStyles.galleryView} >

                <ScrollView contentContainerStyle={evokStyles.imagesWrapper}>
                    {images}
                </ScrollView>
                <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Camera')}>
                    <Ionicons name="ios-add-circle-outline" size={40} color="white" />
                </TouchableOpacity>

                <View style={evokStyles.bottomBar}>
                    <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-home-outline" size={40} color="white" />
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
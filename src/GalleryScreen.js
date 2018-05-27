import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, Text, Alert, ImageBackground } from 'react-native'
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
            'Delete '+picObject.fileName,
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { evokFileSystem.deleteImagefromGallery(picObject.fileUri, this.getList) } }
            ],
            { cancelable: false }
        )


    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")

        let images = this.state.groupedPhotos.map(
            (picObject) => {
                return (
                    <TouchableOpacity key={picObject.fileUri} onLongPress={() => this.alertDeleteWarning(picObject)}>
                        <ImageBackground
                            style={{ width: 100, height: 100, margin: 3 }}
                            source={{ uri: picObject.fileUri }}>
                            <Text> {new Date(picObject.timestamp).toString()} </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        return (
            <View style={evokStyles.galleryView} >

                <ScrollView contentContainerStyle={evokStyles.imagesWrapper}>
                    {images}
                </ScrollView>

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
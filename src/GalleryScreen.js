import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/EvokCamera.js'
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

    getList = () => {
        let currentFolder = evokFileSystem.getPath('myPro', '')

        evokFileSystem.getFilesUriInDirectory(currentFolder, this.onFilesListed)
    }

    onFilesListed = (result) => {
        console.log(result)
        this.setState(
            {
                groupedPhotos: result
            }
        )
    }

    justPrint = () => {
        let currentFolder = evokFileSystem.getPath('myPro', '')
        console.log(this.currentFolder)
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")

        let images = this.state.groupedPhotos.map(
            (fileUri) => {
                return (

                    <Image
                        key={fileUri}
                        style={{ width: 100, height: 100 }}
                        source={{ uri: fileUri }}
                    />

                )
            }
        )

        return (
            <View style={evokStyles.galleryView} >
                <View style={evokStyles.imagesWrapper}>
                    {images}
                </View>
                <Text> {this.state.groupedPhotos[0]} </Text>
                <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Home')}>
                    <Ionicons name="ios-home-outline" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={evokStyles.homeButton} onPress={this.getList}>
                    <Ionicons name="ios-barcode-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

}



import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Icon, Dimensions, ImageBackground, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../Evok/src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../Evok/src/evokStyles.js'
import GalleryScreen from '../Evok/src/GalleryScreen.js'
import evokFileSystem from '../Evok/src/evokFilesystem.js'


export class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Home',
    }

    state = {
        groupedPhotos: []
    }

    async componentWillMount() {
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
        //console.log(this.state.groupedPhotos)
    }

    getProjectImage = (projectImagefileUri) => {
        return (
            <ImageBackground
                style={{ flex:1 }}
                resizeMode="cover"
                source={{ uri: projectImagefileUri }}>
                <Text style={evokStyles.ProjectFolderText} >Project Name</Text>
            </ImageBackground>
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("homescreen mode")
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this.getProjectImage(this.state.groupedPhotos[22].fileUri)

        return (
            <View style={evokStyles.container} >
                <Text style={evokStyles.evokText} >
                    EVOK
                </Text>
                <TouchableOpacity style={evokStyles.homeButton} onPress={() => navigate('Camera')}>
                    <Ionicons name="ios-camera-outline" size={60} color="#009999" containerStyle={flex = 1} />
                </TouchableOpacity>
                <TouchableOpacity style={evokStyles.projectFolderButton} onPress={() => navigate('Gallery')}>
                    {projectImage}
                </TouchableOpacity>
            </View>
        )
    }
}


const NavigationApp = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Camera: { screen: CameraScreen },
        Gallery: { screen: GalleryScreen }
    },

    {
        navigationOptions: {
            headerMode: 'null',
        },

        navigationOptions: ({ navigation }) => ({ header: false })
    }
)

export default class App extends React.Component {
    render() {
        return <NavigationApp />
    }
}
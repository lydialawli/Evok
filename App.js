
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Icon, Dimensions, ImageBackground, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../Evok/src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../Evok/src/evokStyles.js'
import GalleryScreen from '../Evok/src/GalleryScreen.js'
import evokFileSystem from '../Evok/src/evokFilesystem.js'
import ElementScreen from '../Evok/src/ElementScreen.js'

export class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Home',
    }

    state = {
        groupedPhotos: [],
        projectTitle: 'press to name'
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

    updateProjectName = () => {
        this.setState({ projectTitle: 'Unga Bunga' })
    }

    getProjectImage = (projectImagefileUri) => {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode="cover"
                source={{ uri: projectImagefileUri }}>

                <Text style={evokStyles.ProjectFolderText} >
                    {this.state.projectTitle}
                </Text>

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
            <View style={evokStyles.screenContainer} >

                <View style={evokStyles.topBar}>
                    <TouchableOpacity style={evokStyles.topBarRightIcon}>
                        <Ionicons name="ios-camera-outline" size={40} color="grey" containerStyle={flex = 1} />
                    </TouchableOpacity>
                    <Text style={evokStyles.topBarText} >
                        Elements
                    </Text>
                    <TouchableOpacity style={evokStyles.topBarRightIcon} onPress={() => navigate('Camera')}>
                        <Ionicons name="ios-camera-outline" size={40} color="white" containerStyle={flex = 1} />
                    </TouchableOpacity>
                </View>

                <View style={evokStyles.cardsContainer}>
                    <TouchableOpacity style={evokStyles.projectCard} onPress={() => navigate('Gallery')}>
                        {projectImage}
                    </TouchableOpacity>
                    <TouchableOpacity style={evokStyles.projectCard} onPress={() => navigate('Element')}>
                        <Text style={evokStyles.topBarText} >
                             + New project
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const NavigationApp = StackNavigator(
    {
        Home: { screen: HomeScreen },
        Camera: { screen: CameraScreen },
        Gallery: { screen: GalleryScreen },
        Element: { screen: ElementScreen}
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
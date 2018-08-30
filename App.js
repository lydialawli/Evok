
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Icon, Dimensions, ImageBackground, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../Evok/src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../Evok/src/evokStyles.js'
import GalleryScreen from '../Evok/src/GalleryScreen.js'
import evokFileSystem from '../Evok/src/evokFilesystem.js'
import ElementScreen from '../Evok/src/ElementScreen.js'
import { FileSystem } from 'expo'

export class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Home',
    }

    constructor(props) {
        super(props)
        this.state  = {
        groupedPhotos: [],
        projectTitle: 'myPro',
        rootDirectory: FileSystem.documentDirectory
        }

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
            </ImageBackground>
        )
    }

    createNewFolder = () => {
        alert("How to name your new folder?")
        console.log("here goes list of created folders")
        console.log(this.state.rootDirectory)
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("homescreen mode")
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this.getProjectImage(this.state.groupedPhotos[this.state.groupedPhotos.length-1].fileUri)

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
                    <View style={evokStyles.projectCard}>
                        <TouchableOpacity style={evokStyles.projectCardImage} onPress={() => navigate('Gallery')}>
                            {projectImage}
                        </TouchableOpacity>
                        <View style={evokStyles.projectCardDescription}>
                            <TextInput
                                style={evokStyles.ProjectCardTitle}
                                onChangeText={(projectTitle) => this.setState({ projectTitle })}
                                value={this.state.projectTitle}
                                editable = {true}
                                maxLength = {10}
                                placeholderTextColor = {'grey'}
                                clearTextOnFocus = {true}
                                underlineColorAndroid = {'transparent'}>
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={evokStyles.projectCard} onPress={() => navigate('Element')}>
                        <Text style={evokStyles.topBarText} >
                            "myPro" folder on Element Screen
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={evokStyles.projectCard} onPress={() => this.createNewFolder()}>
                        <Text style={evokStyles.topBarText} >
                            new Folder
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
        Element: { screen: ElementScreen }
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
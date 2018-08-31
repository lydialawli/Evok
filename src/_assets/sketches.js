
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Icon, Dimensions, ImageBackground, Alert, Image } from 'react-native'
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
        this.state = {
            groupedPhotos: [],
            projectTitle: 'myPro',
            rootDirectory: FileSystem.documentDirectory,
            folderName: 1,
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

    alertCreateNewFolder = (picObject) =>
        Alert.alert(
            'Create new element',
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.createNewFolder() } }
            ],
            { cancelable: false }
        )

    createNewFolder = () => {
        evokFileSystem.createDirectoryIfDoesntExist(evokFileSystem.getPath(Date.now(), ''), () => {
            console.log(evokFileSystem.readAppDirectory())
        })
    }



    render() {
        const { navigate } = this.props.navigation;
        console.log("homescreen mode")
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this.getProjectImage(this.state.groupedPhotos[this.state.groupedPhotos.length - 1].fileUri)

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
                                editable={true}
                                maxLength={10}
                                placeholderTextColor={'grey'}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={evokStyles.projectCardDescription}>
                        <TouchableOpacity style={evokStyles.projectCard} onPress={() => navigate('Element')}>
                            <Text style={evokStyles.projectCardText} >
                                "myPro" folder on Element Screen
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={evokStyles.projectCardDescription}>
                        <TouchableOpacity style={evokStyles.projectCard} onPress={() => this.alertCreateNewFolder()}>
                            <Text style={evokStyles.projectCardText} >
                                new Folder
                        </Text>
                        </TouchableOpacity>
                    </View>
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
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Icon, Dimensions, ImageBackground, Alert, ScrollView, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import GalleryScreen from '../src/GalleryScreen.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import ElementScreen from '../src/ElementScreen.js'
import { FileSystem } from 'expo'
import Card from '../src/Card.js'
import newEvokFileSystem from '../src/newEvokFileSystem.js'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#999966',
        },
        headerTintColor: 'blue',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            groupedPhotos: [],
            projectTitle: 'myPro',
            rootDirectory: FileSystem.documentDirectory,
            listDirectories: [],
            listOfCards: []
        }

    }

    async componentWillMount() {
        this.getArrayOfDirectories()
    }

    getArrayOfDirectories = () => {
        evokFileSystem.readAppDirectory((result) => {
            this.setState({
                listDirectories: result,
            })
            console.log("..this is list of directiories/elements: "+ result)
        })
    }

    navigateToELement = (projectName) => {
        this.props.navigation.navigate('Element', { projectID: projectName })
    }

    getListCards = () => {
        let listOfCards = this.state.listDirectories.map((projectName, index) => {
           // console.log("..this is list of elements: " + projectName)
            return <Card
                name={projectName}
                key={projectName}
                onCardPressed={this.navigateToELement}
            />
        })
        return listOfCards
    }

    getCard = (projectName) => {
        return (
            <View>
                <TouchableOpacity style={styles.card}>
                    <Text> {projectName}</Text>
                </TouchableOpacity>
            </View>
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
            console.log(this.getArrayOfDirectories())
        })
    }



    render() {
        const { navigate } = this.props.navigation;
        //console.log("homescreen mode")
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this.getProjectImage(this.state.groupedPhotos[this.state.groupedPhotos.length - 1].fileUri)

        return (
            <View style={evokStyles.screenContainer} >
                <View style={styles.two}>
                    <ScrollView contentContaistylenerStyle={styles.cardsContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => newEvokFileSystem.startStorage()}>
                            <Text style={evokStyles.topBarText}> create elementIndex </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => newEvokFileSystem.addNewElement(Date.now(),'test')}>
                            <Text style={evokStyles.topBarText}> add elements</Text>
                        </TouchableOpacity>
                        <View>
                            {this.getListCards()}
                        </View>
                        <TouchableOpacity style={styles.card} onPress={() => this.alertCreateNewFolder()}>
                            <Text style={evokStyles.topBarText}> Create new Element ? </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>

        )
    }
}

styles = StyleSheet.create({
    two: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardsContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        width: 300,
        height: 100,
        borderColor: '#ffb84d',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        elevation: 3,
    },
})


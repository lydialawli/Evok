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
            listOfCards: [],
            elements: [],
        }

    }

    async componentWillMount() {
        this._getArrayOfDirectories()
        newEvokFileSystem.startStorage(this.onStorageReady)

    }

    onStorageReady = () => {
        this.setState({
            elements: newEvokFileSystem.getArrayOfElements(),
        })
        console.log("..this is elements: " + JSON.stringify(this.state.elements))
    }

    getListElementCards = () => {
        let listOfElementCards = this.state.elements.map((x) => {
            // console.log("..this is list of elements: " + projectName)
            return <Card
                name={x.name}
                key={x.name}
                type={x.type}
                onCardPressed={this.alertCardType}
            />
        })
        return listOfElementCards
    }

  
    alertCardType = (x) => {
        alert("this card is a " + x )

    }

    _getArrayOfDirectories = () => {
        evokFileSystem.readAppDirectory((result) => {
            this.setState({
                listDirectories: result,
            })
            //console.log("..this is list of directiories/elements: "+ result)
        })
    }

    _navigateToELement = (projectName) => {
        this.props.navigation.navigate('Element', { projectID: projectName })
    }

    _getListCards = () => {
        let listOfCards = this.state.listDirectories.map((projectName, index) => {
            // console.log("..this is list of elements: " + projectName)
            return <Card
                name={projectName}
                key={projectName}
                onCardPressed={this._navigateToELement}
            />
        })
        return listOfCards
    }


    _updateProjectName = () => {
        this.setState({ projectTitle: 'Unga Bunga' })
    }

    _getProjectImage = (projectImagefileUri) => {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode="cover"
                source={{ uri: projectImagefileUri }}>
            </ImageBackground>
        )
    }

    _alertCreateNewFolder = (picObject) =>
        Alert.alert(
            'Create new element',
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this._createNewFolder() } }
            ],
            { cancelable: false }
        )

    _createNewFolder = () => {
        evokFileSystem.createDirectoryIfDoesntExist(evokFileSystem.getPath(Date.now(), ''), () => {
            console.log(this._getArrayOfDirectories())
        })
    }



    render() {
        const { navigate } = this.props.navigation;
        //console.log("homescreen mode")
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this._getProjectImage(this.state.groupedPhotos[this.state.groupedPhotos.length - 1].fileUri)

        return (
            <View style={evokStyles.screenContainer} >
                <View style={styles.two}>
                    <ScrollView contentContaistylenerStyle={styles.cardsContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => newEvokFileSystem.addNewElement(Date.now(), 'test')}>
                            <Text style={evokStyles.topBarText}> add elements</Text>
                        </TouchableOpacity>
                        <View>
                            {this.getListElementCards()}
                        </View>
                        <TouchableOpacity style={styles.card} onPress={() => this._alertCreateNewFolder()}>
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


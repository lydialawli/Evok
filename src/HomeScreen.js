import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, TextInput, Icon, Dimensions, ImageBackground, Modal, Alert, ScrollView, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraScreen from '../src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import GalleryScreen from '../src/GalleryScreen.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import ElementScreen from '../src/ElementScreen.js'
import { FileSystem } from 'expo'
import ElementCard from '../src/elementCard.js'
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
            modalVisible: false,
            placeholderElementName: 'enter title',
            newTextInput: ''
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
        console.log("..elements strigified: " + JSON.stringify(this.state.elements))
    }

    getListElementCards = () => {
        let listOfElementCards = this.state.elements.map((x) => {
            // console.log("..this is list of elements: " + projectName)
            return <ElementCard
                name={x.name}
                key={x.name}
                type={x.type}
                onCardPressed={this.alertCardType}
            />
        })
        return listOfElementCards
    }


    alertCardType = (x) => {
        Alert.alert(
            'Take picture?',
            'Or show gallery?',
            [
                { text: 'Show metadata', onPress: () => alert("this card is a " + x) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }



    _getArrayOfDirectories = () => {
        evokFileSystem.readAppDirectory((result) => {
            this.setState({
                listDirectories: result,
            })
            //console.log("..this is list of directiories/elements: " + result)
        })
    }

    _navigateToELement = (projectName) => {
        this.props.navigation.navigate('Element', { projectID: projectName })
    }

    _getListCards = () => {
        let listOfCards = this.state.listDirectories.map((projectName, index) => {
            // console.log("..this is list of elements: " + projectName)
            return < ElementCard
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

    alertCreateNewElement = () => {
        Alert.alert(
            'Create new element',
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.setModalVisible(true) } }
            ],
            { cancelable: false }
        )
    }

    addNewElement = (textInput) => {
        this.setState({
            placeholderElementName: 'Enter new title',
        })
        newEvokFileSystem.addNewElement(textInput, Date.now(), 'test', this.onStorageReady)

    }

    setModalVisible(visible) {
        console.log('modalview', visible)
        this.setState({
            modalVisible: visible,
        })
    }

    elementTitleInput = () => {
        return (
            <TextInput
                style={{ fontSize: 25, height: 60, width: 200, borderColor: 'red', borderWidth: 1 }}
                placeholderTextColor='gray'
                clearTextOnFocus={true}
                placeholder={this.state.placeholderElementName}
            //defaultValue={this.state.placeholderElementName}

            onChangeText={(result) => this.setState(this.state.newTextInput = {result})}
            //onSubmitEditing={(result) => console.log(result)}
            //value={this.state.placeholderElementName}  
            //onSubmitEditing={console.log(this.state.newTextInput)}
            />
        );
    }



    render() {
        const { navigate } = this.props.navigation;
        //console.log("homescreen mode")
        let textInput = this.elementTitleInput()
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this._getProjectImage(this.state.groupedPhotos[this.state.groupedPhotos.length - 1].fileUri)

        return (
            <View style={evokStyles.screenContainer} >
                <View style={styles.two}>
                    <ScrollView contentContaistylenerStyle={styles.cardsContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => this.alertCreateNewElement()}>
                            <Text style={evokStyles.topBarText}> Add an element </Text>
                        </TouchableOpacity>
                        <View>
                            {this.getListElementCards()}
                        </View>
                    </ScrollView>

                    <Modal
                        visible={this.state.modalVisible}
                        onRequestClose={() => { alert('Modal has been closed.') }}
                        animationType={'slide'}
                        transparent={true}
                    >
                        <View style={styles.modalWindow}>
                            {textInput}
                            <View style={styles.modalButtons}>
                                <TouchableHighlight style={styles.buttonHideModal}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                        this.addNewElement(this.state.newTextInput.result)
                                    }}>
                                    <Text style={styles.modalButtonText}>Done</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.buttonHideModal}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                    }}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

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

    modalWindow: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 2,

    },
    modalButtons: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textModalTitle: {
        flex: 1,
        color: 'black',
        textShadowRadius: 2,
        fontWeight: 'bold',
        fontSize: 25,
    },


    modalButtonText: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },

    buttonHideModal: {
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffb84d',
        margin:5,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        elevation: 3
    },

})


import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, TextInput, Icon, Dimensions, ImageBackground, Modal, Alert, ScrollView, Image } from 'react-native'
import { NavigationActions, TabNavigator } from 'react-navigation'
import CameraScreen from '../src/CameraScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import GalleryScreen from '../src/GalleryScreen.js'
import evokFileSystem from '../src/oldEvokFilesystem.js'
import ElementScreen from '../src/ElementScreen.js'
import { FileSystem } from 'expo'
import ElementCard from '../src/elementCard.js'
import newEvokFileSystem from '../src/newEvokFileSystem.js'
import readWrite from '../src/readWrite.js'


export default class HomeScreen extends React.Component {
    /*static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: 'grey',
        },
        headerTintColor: 'blue',s
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
        },
        headerRight: <Ionicons name="md-settings" size={30} color="white"></Ionicons>
    }*/

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
            newTextInput: '',
            imageHistory: {},
            placeHolderImage: 'https://i.pinimg.com/564x/e1/2a/9e/e12a9ed7c61da354c6cfdaf811cf6c3c.jpg',
        }

    }

    async componentWillMount() {
        //this._getArrayOfDirectories()
        newEvokFileSystem.startStorage(this.onStorageReady)
        newEvokFileSystem.createImagesDirectoryIfDoesnotExist()
        
    }


    onStorageReady = () => {
        this.setState({
            elements: newEvokFileSystem.getArrayOfElements(),
            elementCardSize: {width:300, height: 100}
        })
        //console.log("..elements: " + JSON.stringify(this.state.elements, null, 2))

    }

    getListElementCards = () => {
        let listOfElementCards = this.state.elements.map((e) => {
            return <ElementCard
                name={e.name}
                key={e.name}
                type={e.type}
                id={e.id}
                onCardPressed={this.alertCardOptions}
                onLongPressed={this.alertLongPressed}
                data={e}
                placeHolderImage={this.state.placeHolderImage}
                cardWidth= {this.state.elementCardSize.width}
                cardHeight= {this.state.elementCardSize.height}
            />
        })
        return listOfElementCards
    }

    alertLongPressed = (elementID) => {
        Alert.alert(
            'Delete element and its content PERMANENTLY',
            'Are you sure?',
            [
                { text: 'yes', onPress: () => newEvokFileSystem.deleteElementObj(elementID, this.onStorageReady) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: true }
        )
    }

    alertCardOptions = (elementID, elementName) => {
        Alert.alert(
            'Take picture?',
            'Or show cards index?',
            [
                { text: 'go to Element', onPress: () => this.navigateToELement(elementID, elementName) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'YES', onPress: () => this.navigateToCamera('Myproject', elementID, elementName) },
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

    navigateToELement = (elementID, elementName) => {
        this.props.navigation.navigate('Tabs', { elementID: elementID, elementName })

    }

    _getListCards = () => {
        let listOfCards = this.state.listDirectories.map((projectName, index) => {
            // console.log("..this is list of elements: " + projectName)
            return < ElementCard
                name={projectName}
                key={projectName}
                onCardPressed={this.navigateToELement}
            />
        })
        return listOfCards
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

    onPressedAddNewElement = () => {
        this.setModalVisible(true)
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
    //FUNCTIONS TO DOWNLOAD PICS-----------------------------------------------
    _setImageHistoryObj = (elementID) => {
        this.setState({
            imageHistory: newEvokFileSystem.getElementObj(elementID).imageHistory,
        })
    }

    _safePic = (uri, elementID, callback1, callback2) => {
        newEvokFileSystem._downloadImage(uri, elementID, this._setImageHistoryObj, callback1, callback2)
    }

    _displayElementID = (elementID) => {
        console.log('elementID: ', elementID)
    }

    _consoleImagePath = (imagePath) => {
        console.log('imagePath is:', JSON.stringify(imagePath))
    }
    //-------------------------------------------------------------------------

    elementTitleInput = () => {
        return (
            <TextInput
                style={{ fontSize: 25, height: 60, width: 200, borderColor: 'red', borderWidth: 1 }}
                placeholderTextColor='gray'
                clearTextOnFocus={true}
                placeholder={this.state.placeholderElementName}
                //defaultValue={this.state.placeholderElementName}

                onChangeText={(result) => this.setState(this.state.newTextInput = { result })}
            //onSubmitEditing={(result) => console.log(result)}
            //value={this.state.placeholderElementName}  
            //onSubmitEditing={console.log(this.state.newTextInput)}
            />
        );
    }

    navigateToCamera = (projectName, elementID) => {
        this.props.navigation.navigate('Camera', { projectID: projectName, elementID: elementID })
    }

    render() {
        const { navigate } = this.props.navigation


        //console.log("homescreen mode")
        let textInput = this.elementTitleInput()
        let projectImage = <Text>Image goes here</Text>

        if (this.state.groupedPhotos[0])
            projectImage = this._getProjectImage(this.state.groupedPhotos[this.state.groupedPhotos.length - 1].fileUri)

        return (
            <View style={evokStyles.screenContainer} >
                <View style={styles.two}>
                    <ScrollView contentContaistylenerStyle={styles.cardsContainer}>

                        <TouchableOpacity style={styles.card} onPress={() => this.onPressedAddNewElement()}>
                            <Text style={evokStyles.topBarText}> Add an element </Text>
                        </TouchableOpacity>
                        <View>
                            {this.getListElementCards()}
                        </View>

                        <TouchableOpacity style={styles.card} onPress={() =>
                            this._safePic('http://www.bleaq.com/wp-content/uploads/kate-macdowell-01.jpg',
                                1554655385269,
                                this._displayElementID,
                                this._consoleImagePath

                            )}>
                            <Text style={evokStyles.topBarText}> Add a pic </Text>
                        </TouchableOpacity>

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
        flexDirection: 'row',
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
        margin: 5,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        elevation: 3
    },

})


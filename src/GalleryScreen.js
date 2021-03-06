import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import newEvokFileSystem from '../src/newEvokFileSystem.js'

export default class GalleryScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            //header: 'false',
            headerTitle: params.elementName,
            title: 'Gallery',
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name="md-images" size={20} color={tintColor}></Ionicons>
            },
            headerStyle: {
                backgroundColor: 'grey',
            },

            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
            },
            headerRight: <Ionicons
                name="md-settings"
                size={30}
                color="white"
                style={{ paddingRight: 20 }}
                onPress={() => navigation.navigate('Settings')}
            ></Ionicons>,
            //tabBarIcon: <Ionicons name="md-settings" size={20} color="white"></Ionicons>

        }
    }

    async componentWillMount() {
        this.onOpenGallery(this.state.elementID)
    }

    async componentDidMount() {
        this.onOpenGallery(this.state.elementID)
    }
    

    state = {
        elementID: this.props.navigation.state.params.elementID,
        elementName: this.props.navigation.state.params.elementName,
        elementObj: {},
        imageHistory: {},
        modalVisible: false,
        selectedImageToPreview: '',
    }

    onOpenGallery = (elementID) => {
        this.setState({
            elementObj: newEvokFileSystem.getElementObj(elementID),
            imageHistory: newEvokFileSystem.getElementObj(elementID).imageHistory,
        })
    }

   
    getImagesPaths = () => {
        let images = this.state.imageHistory.map(
            (imageObj, i) => {

                let onPressPic = () => {
                    console.log('pressed img is:', imageObj)
                    this.setModalVisible(true, imageObj)

                }
                let uri = imageObj.uri

                let fileUri = newEvokFileSystem.getImagePath(uri)
                let t = imageObj.timestamp

                return (
                    <TouchableOpacity key={t} onPress={onPressPic} onLongPress={() => this.alertDeleteWarning(imageObj, i)}>
                        <ImageBackground
                            style={{ width: 100, height: 100, margin: 1 }}
                            source={{ uri: fileUri }}>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )
        return images
    }

    alertDeleteWarning = (imageObj, i) => {
        Alert.alert(
            'Delete ' + imageObj.uri,
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { newEvokFileSystem.deleteImage(imageObj.uri, i, this.state.elementID,this.onOpenGallery) } }
            ],
            { cancelable: false }
        )
    }



    getFullImageView = (uri) => {

        let fullPath = newEvokFileSystem.getImagePath(uri)
        //console.log('viewFullImage', uri)

        if (uri == '')
            return (
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        No imageObj
                     </Text>
                </View>
            )

        return (
            <View style={{ width: '90%', height: '90%', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: fullPath }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    setModalVisible = (visible, imageObj) => {
        //console.log('modalview', visible, imageObj)
        this.setState({
            modalVisible: visible,
            selectedImageToPreview: imageObj.uri
        })

    }

    goToCameraButton = (state) => {
        return (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Camera', { elementID: this.state.elementID, elementName:this.state.elementName, goBackKey: state.key })}}>
                <Ionicons name="ios-add-circle"
                    size={50}
                    style={{ alignSelf: 'center', justifyContent: 'center', padding: 20 }}
                    color={'black'}
                > </Ionicons>
            </TouchableOpacity>)
    }

    getLastImage = () => {
        if (this.state.imageHistory.length > 0) {
            console.log('>>>', this.state.imageHistory[5].uri)
            return this.state.imageHistory[this.state.imageHistory.length - 1].uri
        }
    }

    navigateToCamera = () => {
        //console.log('camera pressed')
        this.props.navigation.navigate('Camera', { elementID: this.state.elementID, elementName:this.state.elementName })

    }


    render() {

        const { state, navigate } = this.props.navigation
        let images = this.getImagesPaths()
        let fullImage = this.getFullImageView(this.state.selectedImageToPreview)
        let goToCamera = this.goToCameraButton(state)

        console.log("Gallery mode")
        return (
            <View style={evokStyles.galleryView}>
                <ScrollView contentContainerStyle={evokStyles.imagesWrapper}>
                    {images}
                    {goToCamera}
                </ScrollView>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert('Modal has been closed.') }}
                    animationType={'slide'}
                    transparent={true}
                >

                    <View style={evokStyles.modalWindow}>
                        {fullImage}

                        <TouchableHighlight style={evokStyles.buttonHideModal}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible, '')
                            }}>
                            <Text>Hide Picture</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        )
    }




    /*state = {
        groupedPhotos: [],
        modalVisible: false,
        selectedFullImagePicObject:  null
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
            'Delete ' + picObject.fileName,
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { evokFileSystem.deleteFile(picObject.fileUri, this.getList) } }
            ],
            { cancelable: false }
        )

    getFullImageView = (picObject) => {

        console.log('viewFullImage', picObject)

        if (!picObject)
            return (
                <View style={{ flex: 1 }}>
                    <Text> No picObject   </Text>
                </View>
            )

        return (
            <View style={{ width: '90%', height: '90%', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: picObject.fileUri }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    setModalVisible(visible, picObject) {
        console.log('modalview', visible, picObject)
        this.setState({
            modalVisible: visible,
            selectedFullImagePicObject: picObject
        })

    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Gallery mode")

        let images = this.state.groupedPhotos.map(
            (picObject) => {

                let onPressPic = () => {
                    console.log(picObject)
                    this.setModalVisible(true, picObject)
                }

                return (
                    <TouchableOpacity key={picObject.fileUri} onPress={onPressPic} onLongPress={() => this.alertDeleteWarning(picObject)}>
                        <ImageBackground
                            style={{ width: 80, height: 80, margin: 1 }}
                            source={{ uri: picObject.fileUri }}>
                            <Text> {new Date(picObject.timestamp).toDateString()} {new Date(picObject.timestamp).toLocaleTimeString()} </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        let fullImage = this.getFullImageView(this.state.selectedFullImagePicObject)

        return (
            <View style={evokStyles.galleryView} >
                <Text style={evokStyles.projectTextinGallery}>My project name</Text>
                <ScrollView contentContainerStyle={evokStyles.imagesWrapper}>
                    {images}
                </ScrollView>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert('Modal has been closed.') }}
                    animationType= {'slide'}
                    transparent = {true}
                   >

                    <View style={evokStyles.modalWindow}>
                        {fullImage}

                        <TouchableHighlight style={evokStyles.buttonHideModal}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                            <Text>Hide Picture</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

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
    }*/

}

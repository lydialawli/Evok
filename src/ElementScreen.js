import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, ScrollView, Text, Alert, ImageBackground, Modal, Slider } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../src/CameraScreen.js'
import TimeLine from '../src/TimeLine.js'
import { Ionicons } from '@expo/vector-icons'
import evokStyles from '../src/evokStyles.js'
import HomeScreen from '../App.js'
import evokFileSystem from '../src/evokFilesystem.js'

export default class ElementScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Element',
    }

    state = {
        groupedPhotos: [],
        modalVisible: false,
        selectedFullImagePicObject: null,
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
                groupedPhotos: result,
            }
        )
    }

    alertDeleteWarning = (picObject) =>
        Alert.alert(
            'Delete ' + picObject.fileName,
            'Are you sure?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { evokFileSystem.deleteFile(picObject.fileUri, this.getList), console.log('pic deleted') } }
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
        console.log("Element mode")

        let images = this.state.groupedPhotos.map(
            (picObject) => {

                let onPressPic = () => {
                    console.log(picObject)
                    this.setModalVisible(true, picObject)
                }

                return (
                    <TouchableOpacity key={picObject.fileUri} onPress={onPressPic} onLongPress={() => this.alertDeleteWarning(picObject)}>
                        <ImageBackground
                            style={{ width: 300, height: 300, margin: 1 }}
                            source={{ uri: picObject.fileUri }}>
                            <Text> {new Date(picObject.timestamp).toDateString()} {new Date(picObject.timestamp).toLocaleTimeString()} </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
        )

        let fullImage = this.getFullImageView(this.state.selectedFullImagePicObject)

        return (
            <View style={evokStyles.screenContainer} >

                <View style={evokStyles.topBar}>
                    <TouchableOpacity style={evokStyles.topBarLeftIcon} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-arrow-round-back" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={evokStyles.topBarText} >
                        Element 1
                    </Text>
                    <TouchableOpacity style={evokStyles.topBarRightIcon} onPress={() => navigate('Camera')}>
                        <Ionicons name="ios-add-circle-outline" size={40} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={evokStyles.cardsContainer}>
                    <View style={evokStyles.elementInfoDisplayContainer}>
                        <View style={evokStyles.elementInfoDisplay2Containers} >
                            <Text style={evokStyles.textRedElementInfoDisplay} >
                                {this.state.groupedPhotos.length}
                            </Text>
                            <Text style={evokStyles.textRedElementInfoDisplay} >
                                in 2 days
                            </Text>
                            <Text style={evokStyles.textRedElementInfoDisplay} >
                                15
                            </Text>
                        </View>
                        <View style={evokStyles.elementInfoDisplay2Containers} >
                            <Text style={evokStyles.textGreyElementInfoDisplay} >
                                Snaps
                            </Text>
                            <Text style={evokStyles.textGreyElementInfoDisplay} >
                                Next
                            </Text>
                            <Text style={evokStyles.textGreyElementInfoDisplay} >
                                Left
                            </Text>
                        </View>
                    </View>

                    <View style={evokStyles.projectCard}>
                        <ScrollView contentContainerStyle={evokStyles.imageCarousel} horizontal={true}>
                            {images.reverse()}
                        </ScrollView>
                    </View>

                    <View style={evokStyles.timeLineCard}>
                        <TimeLine/>
                    </View>
                </View>

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
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                            <Text>Hide Picture</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>


            </View>
        )
    }

}
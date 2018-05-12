import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image,Button, Icon} from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'
import GalleryScreen from '../src/GalleryScreen.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


export default class extends React.Component {
    state = {
        isPreviewMode: false,
        picturePreviewPath: '',
        hasCameraPermission: null,
        type: 'back',
        flashMode: 'off',
        ratio: '16:9',
        whiteBalance: 'auto',
        zoom: 0,
        autofocus: 'on',
        
        ratios: [],
        photoId: 1,
        photos: [],
        showGallery: 'false',
        permissionsGranted: true
    }

    async componentWillMount() {
        console.log("...componentWillMount")
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    componentDidMount() {
        console.log("...componentDidMount")
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory exists')
        })
    }

    takePicture = async () => {
        console.log("...takePicture")

        if (!this.camera)
            return

        this.camera.takePictureAsync()
        .then(data => {
            this.setState({
                isPreviewMode: true,
                picturePreviewPath : data.uri
            })
        })
        .catch(err => console.error(err))

        
        /*.then(data => {
            FileSystem.moveAsync({
                from: data.uri,
                to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
            }).then(() => {
                console.log('saved!', `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`)
                this.setState({
                    photoId: this.state.photoId + new Date().getTime(),
                })
                
            }).catch(err => console.error(err))
        })*/
        //

    }


    /*
    toggleView() {
      this.setState({
        showGallery: !this.state.showGallery,
      })
    }
    */

    /*renderNoPermissions() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={{ color: 'white' }}>
                    Camera permissions not granted - No access to camera
        </Text>
            </View>
        )
    }
    */

    /*renderGallery() {
        return <GalleryScreen onPress={this.toggleView.bind(this)} />
    }*/
    goToPreviewMode=()=>{
        this.setState({isPreviewMode: true})
    }

    goToCameraMode=()=>{
        this.setState({isPreviewMode: false})
    }

    getPreviewImageView(){

        if(!this.state.picturePreviewPath)
            return <View/>
        
        return (
            <View style={{width: '100%', height: '100%'}}>
                <Image
                     style={{flex:1}}
                     source={{uri: this.state.picturePreviewPath}}
                     resizeMode= "contain"
                />
            </View>
        )
    }

    getPreviewView() {
        return (
            <View style={{ width: '100%', height: '100%', flexDirection: 'column'}}>     
                {this.getPreviewImageView()}
                <View style={styles.previewButtonContainer}>
                    <TouchableOpacity style={styles.goToCameraButton} onPress={this.goToCameraMode}>
                        <Ionicons name="ios-arrow-dropleft" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goToCameraButton}>
                        <Ionicons name="md-images" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View> 
        )
    }
    
    getCameraView(){
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => { this.camera = ref }}
                    style={styles.preview}
                    ratio={this.state.ratio}
                >
                    <View
                        style={{
                            flex: 0.5,
                            alignSelf: 'flex-end',
                            backgroundColor: 'transparent'
                                               }}>
                        <TouchableOpacity style={styles.snapButton} onPress={this.takePicture.bind(this)}>
                            <Ionicons name="md-aperture" size={40} color="white" />
                        </TouchableOpacity>

                    </View>
                </Camera>
            </View>
        )
    }

    render() {
        console.log('...render')
        const { hasCameraPermission } = this.state
        
        if (hasCameraPermission === null) {
            return <Text>Camera permission is null</Text>
        }
        
        else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }
        
        let viewToRender = this.getCameraView()
        if(this.state.isPreviewMode)
            viewToRender = this.getPreviewView()

        return viewToRender
    }

    /* _render() {
         const cameraScreenContent = this.state.permissionsGranted
             ? this.renderCamera()
             : this.()
         const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent
         return <View style={styles.container}>{cameraScreenContent}</View>
     }
     */
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcccc',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    goToCameraButton:{
        flex: 1,
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      
    },

    previewButtonContainer:{
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems:'flex-end'
    },

    snapButton: {
        flex: 0.5,
        backgroundColor: '#ff6666',
        borderRadius: 5,
        marginHorizontal: 2,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 20
    }
})
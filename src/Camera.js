import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Camera, Permissions, Constants, FileSystem } from 'expo'

export default class extends React.Component {
  state = {
    hasCameraPermission: null,
    type: 'back',
    flashMode: 'off',
    ratio: '16:9',
    whiteBalance: 'auto',
    zoom: 0,
    autofocus:'on',
    ratios: [],
    photoId: 1,
    photos: [],
    showGallery: 'false',
    permissionsGranted: false,

  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }



  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
                 ref={ref => { this.camera = ref }} 
                 style={styles.preview} 
                 ratio={this.state.ratio}
                >
           
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                
              
              }}>

              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
              Snap!
              </Text>

            </View>
          </Camera>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcccc',
      },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
     },

    capture: {
        flex: 0,
        backgroundColor: '#ff6666',
        borderRadius: 5,
        color: '#ffffff',
        padding: 10,
        margin: 40
     }
    
})
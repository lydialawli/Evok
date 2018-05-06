import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
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
    photoId: 1,
    photos: [],
    showGallery: 'false',
    permissionsGranted: false,

  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists')
    })
  }


  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          })
       
        })
      })
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
                 style={{ flex: 1 }} 
                 type={this.state.type} 
                 flashMode={this.state.flashMode}
                 ratio={this.state.ratio}
                 whiteBalance={this.state.whiteBalance}
                 zoom={this.state.zoom}
                 autofocus={this.state.autofocus}
                >
           
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === 'back'
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  })
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    }
  }
}
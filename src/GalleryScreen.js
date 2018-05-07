import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo'

export default class GalleryScreen extends React.Component {

    componentDidMount() {
        this._mounted = true;
        FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
          if (this._mounted) {
            this.setState(
              {
                photos,
              },
              this.detectFaces
            );
          }
        });
      }
    
      componentWillUnmount() {
        this._mounted = false;
      }
    

    saveToGallery = async () => {
      const { photos } = this.state;

        if (photos.length > 0) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if (status !== 'granted') {
            throw new Error('Denied CAMERA_ROLL permissions!')
        }

        const promises = photos.map(photo => {
            return MediaLibrary.createAssetAsync(`${FileSystem.documentDirectory}photos/${photo}`)
        })

        await Promise.all(promises)
        alert('Successfully saved photos to user\'s gallery!')
        } else {
        alert('No photos to save!')
        }  
    }

    render(){
      return( 
       <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text>Save to gallery</Text>
          </TouchableOpacity>
       </View>
      )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    paddingTop: 20,
  },

  button: {
    padding: 20,
  }
})
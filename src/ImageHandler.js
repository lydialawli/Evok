import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo'


var image= {
    width: '',
    height: ''
}

const pictureSize = 150;

export default class ImageSizeConverter extends React.Component {

getImageDimensions = ({ width, height }) => {
    if (width > height) {
      const scaledHeight = pictureSize * height / width
      return {
        width: pictureSize,
        height: scaledHeight,

        scaleX: pictureSize / width,
        scaleY: scaledHeight / height,

        offsetX: 0,
        offsetY: (pictureSize - scaledHeight) / 2,
      }
    } else {
      const scaledWidth = pictureSize * width / height
      return {
        width: scaledWidth,
        height: pictureSize,

        scaleX: scaledWidth / width,
        scaleY: pictureSize / height,

        offsetX: (pictureSize - scaledWidth) / 2,
        offsetY: 0,
      }
    }
  }

  render() {
        let width=this.getImageDimensions(image.width)
        let height= this.getImageDimensions(image.height)
        let imageStyle = {width:width, height:height}
        return (
            <View >    
                <Image style =  {imageStyle} source = {this.props.image} />
            </View>
        )
    }
}
import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo'

export default class GalleryScreen extends React.Component {



    render() {
        return (
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
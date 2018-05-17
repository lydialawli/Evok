import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo'

export default class GalleryScreen extends React.Component {



    render() {
        return (
            <View style={styles.container} >
                <Text> ALOHA!! </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6666',
        flex: 1,
        alignItems: 'center',
    },


})
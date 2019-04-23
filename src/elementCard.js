import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import newEvokFileSystem from '../src/newEvokFileSystem.js'


export default class ElementCard extends React.Component {

    onPressed = () => {

        this.props.onCardPressed(this.props.id, this.props.name)
    }

    onLongPressed = () => {
        this.props.onLongPressed(this.props.id)
    }

    getImageUri = () => {
        if (!this.props.data.imageHistory) {
            return 0
        }
        else {
            //console.log('elements imageHistory>', this.props.data.imageHistory)
            return this.props.data.imageHistory[0].uri
        }
    }

    getImageFullPath = () => {
        let uri = this.getImageUri()
        let fileUri = ''
        if (uri == 0) {
            fileUri = this.props.placeHolderImage
        }
        else {
            fileUri = newEvokFileSystem.getImagePath(uri)
        }

        return fileUri
    }

    getImageToDisplay = () => {
        let filePath = this.getImageFullPath()
        return (
            <Image
                style={{
                    width: 90, height: 90,
                }}
                source={{ uri: filePath }}>
            </Image>
        )
    }

    render() {
        let imageDisplayed = this.getImageToDisplay()
        return (
            <View sthyle={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={this.onPressed}
                    onLongPress={this.onLongPressed}
                >
                    <View style={styles.objectsInCard}>
                        {imageDisplayed}
                        <Text> {this.props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        backgroundColor: 'lightblue',
        alignItems: 'flex-start',
        margin: 10,
        borderRadius: 10,
        borderColor: '#ffb84d',
        elevation: 3,
    },
    objectsInCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})


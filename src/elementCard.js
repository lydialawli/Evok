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
                    width: this.props.cardHeight, height: this.props.cardHeight, borderRadius: 5, 
                }}
                source={{ uri: filePath }}>
            </Image>
        )
    }

    getTotalSnaps = () => {
        if (!this.props.data.imageHistory) {
            return 0
        }
        else {
            //console.log('elements imageHistory>', this.props.data.imageHistory)
            return this.props.data.imageHistory.length
        }
    }

    render() {
        let imageDisplayed = this.getImageToDisplay()
        let snaps = this.getTotalSnaps()

        return (

            <TouchableOpacity
                style={cardStyle.card}
                onPress={this.onPressed}
                onLongPress={this.onLongPressed}
            >
                <View style={cardStyle.objectsInCard}>
                    {imageDisplayed}
                    <View style={cardStyle.textCard}>
                        <Text style={cardStyle.title}> {this.props.name}</Text>
                        <Text style={cardStyle.text}> {snaps} snaps </Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}


cardStyle = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        backgroundColor: 'lightblue',
        //alignItems: 'flex-start',
        margin: 10,
        borderRadius: 10,
        borderColor: '#ffb84d',
        elevation: 3,
    },
    objectsInCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textCard: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        textAlign: 'center',
        color: 'black',
        textShadowRadius: 2,
        fontWeight: 'bold',
        fontSize: 25,
    },

    text: {
        textAlign: 'center',
        color: 'grey',
        textShadowRadius: 2,
        fontWeight: 'bold',
        fontSize: 15,
    },
})


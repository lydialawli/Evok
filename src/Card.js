import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default class Card extends React.Component {

    onPress = ()=>{
        
        this.props.onCardPressed(this.props.name)
    }

    render() {

        return (
            <View >
                <TouchableOpacity
                    style={styles.card}
                    onPress={this.onPress}
                >
                    <Text> {this.props.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        borderColor: '#ffb84d',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        elevation: 3,
    },
})


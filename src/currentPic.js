import React, { Component } from "react"
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import evokStyles from '../src/evokStyles.js'

export default class CurrentPic extends Component {



    getImageDisplayed = () => {
        var firstImageOfArray = this.props.imagesFolder + this.props.data[0].uri
        if (this.props.data.length <= 0) {
            return (
                <TouchableOpacity >
                    <ImageBackground
                        style={{ width: 300, height: 300, margin: 1 }}
                        source={{ uri: this.props.placeholder }}>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }

        else if (this.props.currentImage == '') {
            return (
                <TouchableOpacity >
                    <ImageBackground
                        style={{ width: 300, height: 300, margin: 1 }}
                        source={{ uri: firstImageOfArray }}>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }

        else {
            if (this.props.isHalfway == false) {
                return (
                    <TouchableOpacity >
                        <ImageBackground
                            style={{ width: 300, height: 300, margin: 1 }}
                            source={{ uri: this.props.currentImage }}>
                        </ImageBackground>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity >
                        <ImageBackground
                            style={{ width: 300, height: 300, margin: 1, opacity: 0.5,}}
                            source={{ uri: this.props.currentImage }}>
                            <ImageBackground
                                style={{ width: 300, height: 300, margin: 1, opacity: 0.5 }}
                                source={{ uri: this.props.nextImage }}>
                            </ImageBackground>
                        </ImageBackground>

                    </TouchableOpacity>
                )
            }
        }
    }



    render() {

        let imageDisplayed = this.getImageDisplayed()

        return (
            <View >
                {imageDisplayed}
            </View>
        )
    }



}
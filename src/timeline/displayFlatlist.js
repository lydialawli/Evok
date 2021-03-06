import React from "react"
import { View, Text, FlatList, VirtualizedList, StyleSheet, ScrollView } from "react-native"
import InstancesListItem from '../timeline/listItem.js'
import { Ionicons } from '@expo/vector-icons'
import utils from '../timeline/utils.js'

//import { List, ListItem } from "react-native-elements"

export default class DisplayFlatlist extends React.Component {


    renderSeparator = () => {
        return (
            <View style={{
                justifyContent: 'center',
                marginBottom: 40
            }}>
                <View style={{
                    //alignSelf: 'center',
                    height: 2,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    width: 40,
                }} />
            </View>
        )
    }

    handleScroll = (event) => {
        this.props.onScrolled(event.nativeEvent.contentOffset.x) + (this.props.cardWidth*0.5)

        //console.log('position:',event.nativeEvent.contentOffset.x)
        /*this.setState(
            {
                scrollPosition: event.nativeEvent.contentOffset.x + (this.state.timelineWidth * 0.5)
            }
        )*/

    }

    getAdditionalListLength = () => {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 40
            }}>
                <View style={{
                    //alignSelf: 'center',
                    height: 2,
                    borderColor: 'pink',
                    backgroundColor: 'pink',
                    width: this.props.cardWidth * 0.5,
                }} />
            </View>
        )
    }

    _getAddMorePicButton = () => {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 40,
                flexDirection: 'row',
            }}>
                <View style={{
                    //alignSelf: 'center',
                    height: 2,
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    width: this.props.cardWidth / 3,
                }} />
                <View style={{ flexDirection: 'row' }} >
                    <Ionicons name="ios-add-circle-outline" size={40} color="black" containerStyle={{ flex: 1, alignSelf: 70 }} />
                </View>
                <View style={{
                    //alignSelf: 'center',
                    height: 2,
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    width: this.props.cardWidth / 3,
                }} />
            </View>
        )
    }

    getAddMorePicButton = () => {
        return (
            <View style={{
                justifyContent: 'center',
                marginTop: 40,
                flexDirection: 'row',
            }}>
                <View style={{
                    //alignSelf: 'center',
                    height: 2,
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    width: this.props.cardWidth / 2,
                }}>
                    <View style={{justifyContent: 'flex-start', alignSelf: 'flex-start', position: 'absolute' }} >
                        <Ionicons name="ios-add-circle-outline" size={40} color="black" containerStyle={{ flex: 1, alignSelf: 70 }} />
                    </View>
                </View>
            </View>
        )

    }

    emptyListView = () => {
        return
    }

    render() {

        let data = this.props.data.map((item, index) => {
            const it = Object.assign(item, { key: index.toString() })
            return it
        })


        return (


            <VirtualizedList
                data={data}
                renderItem={({ item, index }) => {
                    //console.log('item',item)
                    return (<InstancesListItem
                        timestamp={item.timestamp}
                        obj={item}
                        ind= {index}
                        key={index}
                        objWidth={this.props.objWidth}
                    />
                    )
                }}
                keyExtractor={(item, index) => 'key'+index}
                getItemCount={data => data.length}
                disableVirtualization={false}
                getItem={(data, index) => (data[index],index)}
                initialScrollIndex={this.props.index}
                horizontal={true}
                //ItemSeparatorComponent={this.renderSeparator}
                onScroll={this.handleScroll}
                ListEmptyComponent={this.emptyListView}
                ListHeaderComponent={this.getAddMorePicButton}
                ListFooterComponent={this.getAddMorePicButton}

            >
            </VirtualizedList>


        )
    }
}


styles = StyleSheet.create({

    timelineDisplayBar: {
        flex: 0.5,
        justifyContent: 'center',
    },




})
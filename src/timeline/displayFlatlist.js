import React from "react"
import { View, Text, FlatList, VirtualizedList, StyleSheet, ScrollView } from "react-native"
import InstancesListItem from '../timeline/listItem.js'
import { Ionicons } from '@expo/vector-icons'

//import { List, ListItem } from "react-native-elements"

export default class DisplayFlatlist extends React.Component {

    scrollToItem = () => {

    }


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

    render() {

        let data = this.props.data.map((item, index) => {
            const it = Object.assign(item, { key: index.toString() })
            return it
        })


        return (


            <VirtualizedList
                data={data}
                renderItem={({ item }) => {
                    //console.log('item',item)
                    return (<InstancesListItem
                        timestamp={item.timestamp}
                        key={item.timestamp}
                        obj={item}
                    />
                    )
                }}
                //keyExtractor={item => item.timestamp.toString()}
                getItemCount={data => data.length}
                disableVirtualization={false}
                getItem={(data, index) => data[index]}
                initialScrollIndex={this.props.index}
                horizontal={true}
                ItemSeparatorComponent={this.renderSeparator}

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
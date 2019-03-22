import React from "react"
import { View, Text, FlatList, VirtualizedList, StyleSheet, ScrollView } from "react-native"
import InstancesListItem from '../timeline/listItem.js'

//import { List, ListItem } from "react-native-elements"

export default class DisplayFlatlist extends React.Component {


    render() {

        let data = this.props.data.map((item, index)=>{
            const it = Object.assign(item,{key:index.toString()})
            return it
        })

      
        return (
            /* <View style={this.props.style}>
                 <FlatList
                     data={this.props.data}
                     renderItem={({ item }) => (
                         <InstancesListItem
                             timestamp={item.timestamp}
                         />
                     )}
                     keyExtractor={item => item.timestamp}
                 />
 
             </View>*/

            <VirtualizedList
                data={data}
                renderItem={( {item} ) => {
                    //console.log('item',item)
                    return(<InstancesListItem
                        timestamp={item.timestamp}
                        key={item.timestamp}
                        obj={item}
                    />
                )}}
                //keyExtractor={item => item.timestamp.toString()}
                getItemCount={data => data.length}
                disableVirtualization={false}
                getItem={(data, index) => data[index]}

                horizontal={true}

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
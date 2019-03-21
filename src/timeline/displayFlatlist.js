import React from "react"
import { View, Text, FlatList, VirtualizedList, StyleSheet, ScrollView } from "react-native"
import InstancesListItem from '../timeline/listItem.js'
//import { List, ListItem } from "react-native-elements"

export default class DisplayFlatlist extends React.Component {
getItem = (i,d,index) => {
    return d.map(function(e) { return e.timestamp; }).indexOf(i.timestamp)
}

    render() {
      

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
                    data={this.props.data}
                    renderItem={({ item }) => (
                        <InstancesListItem
                            timestamp={item.timestamp}
                            item={item}
                        />
                    )}
                    keyExtractor={(item, index )=> item.timestamp}
                    getItemCount={data => data.length}
                    disableVirtualization= {false}
                    getItem={this.getItem(item, data, index)}
                    
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
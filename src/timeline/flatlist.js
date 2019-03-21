import React, { Component } from "react"
import { View, Text, FlatList } from "react-native"
import InstancesListItem from '../timeline/listItem.js'
import { List, ListItem } from "react-native-elements"
import { Ionicons } from '@expo/vector-icons'

class DisplayFlatlist extends Component {


    render() {

        return (
            /*<View>
                <FlatList 
                data={this.props.data}
                renderItem={({ item })=>{
                    <InstancesListItem
                    timestamp={item.timestamp}
                    />
                }}
                keyExtractor={item=> item.timestamp}
                />
               
            </View>*/
            <List>
                <FlatList
                    data={this.props.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={new Date(item.timestamp).toDateString()}
                            subtitle={new Date(this.props.timestamp).getHours()&& new Date(this.props.timestamp).getMinutes()}
                            avatar={<Ionicons name="ios-git-commit" size={40} color="black" containerStyle={flex = 1} />}
                        />
                    )}
                    keyExtractor={item => item.timestamp}
                />
            </List>


        )
    }


}

export default DisplayFlatlist  
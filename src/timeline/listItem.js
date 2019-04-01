import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'

export default class InstancesListItem extends Component {


    render() {
        //console.log('timestamp:',this.props.obj)

        return (
             <View style={styles.timelineObject}>
                 <Text style={styles.timelineObjectText} >
                     {new Date(this.props.timestamp).toDateString().replace(1970, "")}
                 </Text>
                 <View style={{ flexDirection: 'row' }} key={this.props.timestamp} >
                     <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                     <Ionicons name="ios-git-commit" size={40} color="black" containerStyle={flex = 1} />
                     <Ionicons name="ios-remove" size={40} color="black" containerStyle={flex = 1} />
                 </View>
                 <Text style={{ alignSelf: 'center' }}>
                     {new Date(this.props.timestamp).getHours()}:{new Date(this.props.timestamp).getMinutes()}
                 </Text>
             </View>
        )
    }

}


styles = StyleSheet.create({

    timelineDisplayBar: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',


    },
    timelineObject: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },

    timelineObjectText: {
        color: 'darkblue',
        fontSize: 10,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    timeLineIcon: {
        flexDirection: 'row',
    },
    viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }

})





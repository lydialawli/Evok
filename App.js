
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Icon, Dimensions } from 'react-native'
import { StackNavigator } from 'react-navigation'
import EvokCamera from '../Evok/src/EvokCamera.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Home',
    }
    render() {
        const { navigate } = this.props.navigation;
        console.log("homescreen mode")
        return (
            <View style={styles.container} >
                <Text style={styles.evokText} >
                    Evok
        </Text>
                <Button
                    color='#ffcc00'
                    title="Go take a Pic"
                    onPress={() => navigate('Profile')}
                />
            </View>
        )
    }
}

class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Profile',
    }

    render() {
        const { navigate } = this.props.navigation
        console.log("Profile mode")
        return (
            <View style={styles.profileScreenView}>
                <EvokCamera/>
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.homeButton} onPress={() => navigate('Home')}>
                        <Ionicons name="ios-home-outline" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
}, {
        navigationOptions: {
            headerMode: 'null',
        },
        navigationOptions: ({ navigation }) => ({ header: false }),
    })

export default class App extends React.Component {
    render() {
        return <NavigationApp />
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6666',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    profileScreenView: {
        backgroundColor: '#ff6666',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 8,
    },

    bottomBar:{
        height: 100,
        width: 200,
        justifyContent: 'flex-start',
        paddingBottom: 8

    },

    evokText: {
        flex: 0.5,
        color: '#009999',
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'flex-start'
    },

    iconText: {
        flex: 0.5,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },

    homeButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 8,
        marginHorizontal: 8,
        marginTop: 2

    }
})
import { StyleSheet} from 'react-native'

const evokStyles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6666',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    galleryView: {
        backgroundColor: '#ff6666',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    camScreenView: {
        backgroundColor: '#ff6666',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 8,
    },

    bottomBar: {
        height: 100,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 3

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
        justifyContent: 'space-around',
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 2

    }
})

export default evokStyles 
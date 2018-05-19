import { StyleSheet, Dimensions } from 'react-native'

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
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    camScreenView: {
        backgroundColor: '#ff6666',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 8,
    },
    imagesWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',

    },

    bottomBar: {
        height: 100,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end'
    },

    goToCameraButton: {
        width: 50,
        height: 50,
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 3

    },

    previewButtonContainer: {
        width: 200,
        height: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginLeft: 70,

    },

    snapCamButton: {
        flex: 0.5,
        backgroundColor: '#ff6666',
        borderRadius: 5,
        marginHorizontal: 2,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 20
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
    },

    cameraView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
})

export default evokStyles 
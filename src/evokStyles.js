import { StyleSheet, Dimensions } from 'react-native'

const evokStyles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-around',
       alignItems: 'center',
    },

    elementsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    topBar: {
        backgroundColor: 'grey',
        width: Dimensions.get('window').width,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        paddingTop: 30
    },

    topBarText: {
        flex: 1,
        color: 'white',
        textShadowRadius: 2,
        fontSize: 25,
        alignSelf: 'center'
    },

    galleryView: {
        backgroundColor: '#002233',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    camScreenView: {
        backgroundColor: '#002233',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 30

    },

    imagesWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10

    },

    bottomBar: {
        height: 50,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 5
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

    opacitySlider: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start"

    },

    snapCamButton: {
        width: 60,
        height: 60,
        backgroundColor: '#009999',
        borderRadius: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },

    buttonText: {
        color: 'white',
        fontSize: 20
    },

    projectFolderButton: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderColor: '#ffb84d',
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 10,
        
        elevation: 3,
    },

    projectTextinGallery: {
        display: 'flex',
        color: '#ffb84d',
        fontSize: 30,
        fontWeight: 'normal',
        marginTop: 10
    },

    ProjectFolderText: {
        flex: 1,
        color: '#ffb84d',
        fontSize: 15,
        fontWeight: 'normal',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
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
       
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#ffb84d',
        padding: 2,
        marginTop: 2
    },

    modalWindow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 2,

    },

    cameraView: {
        flex: 1,
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },

    buttonHideModal: {
        backgroundColor: '#ffb84d',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        elevation: 3

    }
})

export default evokStyles 
import { StyleSheet, Dimensions } from 'react-native'

const evokStyles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-around',
       alignItems: 'center',
    },

    cardsContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    
    topBar: {
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 8,
        paddingTop: 20
    },

    topBarText: {
        flex: 1,
        color: 'white',
        textShadowRadius: 2,
        fontSize: 25,
        
    },

    topBarLeftIcon: {
        flex:1,
        alignItems: 'flex-start',
        marginLeft: 5,
    },

    topBarRightIcon: {
        flex:1,
        alignItems: 'flex-end',
        marginRight: 5,
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

    timeLineImages: {
        width: 300,
        height: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',

    },

    projectCard: {
        width: 300,
        height: 300,
        borderColor: '#ffb84d',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
    },

    projectCardImage: {
        width: 300,
        height: 200
    },

    projectCardDescription: {
        width: 300,
        height: 100,
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },

    projectTextinGallery: {
        display: 'flex',
        color: '#ffb84d',
        fontSize: 30,
        fontWeight: 'normal',
        marginTop: 10
    },

    ProjectCardTitle: {
        flex: 1,
        color: '#ffb84d',
        fontSize: 25,
        fontWeight: 'normal',
        marginTop: 5, 
        marginLeft: 5,
    },

    iconText: {
        flex: 0.5,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },

    modalWindow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
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
    },

    imageCarousel: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
    },

    timeLineCard: {
        width: 300,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#ffb84d',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
    },

    elementInfoDisplayContainer: {
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
    },

    elementInfoDisplay2Containers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
    },

    textGreyElementInfoDisplay: {
        flex: 1,
        color: 'grey',
        textShadowRadius: 2,
        fontSize: 20,
        textAlign: 'center'
    },

      
    textRedElementInfoDisplay: {
        flex: 1,
        color: 'red',
        textShadowRadius: 2,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },

    timelineObject: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    timelineObjectText: {
        color: 'darkblue',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    timeLineIcon: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
})

export default evokStyles 
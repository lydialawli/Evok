import { StyleSheet, Dimensions } from 'react-native'

const evokStyles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    elementContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    
    projectCardText: {
        flex: 1,
        color: 'white',
        textShadowRadius: 2,
        fontSize: 15,
    },


    plusIcon: {
        flex:1,
        justifyContent: 'flex-start'
,       alignItems: 'center',
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
        marginHorizontal: 3,
        position: 'absolute'

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
        //alignItems: "stretch",
        width: 400,
        height: 100,
        justifyContent: 'center',
    
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

    projectCard: {
        height: 300,
        width: 300,
        borderColor: '#ffb84d',
        justifyContent: 'space-evenly',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
        margin: 10
    },

    projectCardImage: {
        flex:1,
    },

    projectCardDescription: {
        width: 300,
        height: 30,
        alignItems: 'center',
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
        fontSize: 15,
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


    sliderCard: {
        width: 300,
        height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#ffb84d',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 3, 
    },

    elementInfoDisplayContainer: {
        flex: 1,
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

    timeLineElementsInside: {
        width: 300,
        height: 200,
        backgroundColor: 'transparent',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    timelineObject: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    timelineObjectText: {
        color: 'darkblue',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    timeLineIcon: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },

    timelineScroll: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})



export default evokStyles 

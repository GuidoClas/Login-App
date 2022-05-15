import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter_900Black',
    },
    imageBg:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height 
    },
    titleText: {
        color: 'white',
        fontFamily: 'Inter_900Black',
        fontWeight: '600',
        fontSize: 28,
        textShadowRadius: 2,
        textShadowColor: '#e09e31',
    },
    inputContainer: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.65,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter_900Black',
    },
    input: {
        width: Dimensions.get('window').width*0.9,
        color: 'black',
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 0,
        marginTop: 25,
        paddingTop: 25,
        borderColor: 'white',
        borderWidth: 3,
        fontFamily: 'Inter_900Black',
    },
    buttonContainer: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height*0.25,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter_900Black',
    },
    button: {
        backgroundColor: "rgba(256,256,256,0.5)",
        width: '100%',
        padding: 45,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 0,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 26,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#e09e31',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#e09e31',
        fontWeight: '700',
        fontSize: 16
    },
    error: {
        color: 'red',
        padding: 5,
        marginLeft: 5
    },
    success: {
        color: 'green',
        padding: 5,
        marginLeft: 5
    },
    spinnerContainer: {
        position: 'absolute',
        zIndex: 99,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    spinner: {
        width: '100%',
        height: '100%'
    },
    text: {
        color: 'black',
        height: 20,
        fontWeight: '700'
    },
    containerTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.15,
    },
    buttonAux: {
        backgroundColor: "rgba(256,256,256,0.5)",
        width: Dimensions.get('window').width/2.95,
        height: Dimensions.get('window').height*0.2,
        borderWidth: 2,
        borderRadius: 0,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAuxText: {
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontWeight: '700',
        fontSize: 20,
    }
});
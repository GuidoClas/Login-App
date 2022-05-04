import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#212842"
    },
    titleText: {
        color: '#e09e31',
        fontFamily: 'sans-serif',
        fontWeight: '600',
        fontSize: 28,
        textShadowRadius: 2,
        textShadowColor: '#e09e31',
    },
    inputContainer: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.65,
        backgroundColor: '#212842',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: Dimensions.get('window').width*0.9,
        backgroundColor: 'grey',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 25,
        paddingTop: 25,
        borderColor: 'black',
        borderWidth: 3
    },
    buttonContainer: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height*0.25,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212842'
    },
    button: {
        backgroundColor: "#e09e31",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        paddingBottom: 15
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
        height: Dimensions.get('window').height*0.1,
        backgroundColor: '#212842'
    },
    buttonAux: {
        backgroundColor: "#e09e31",
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height*0.1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
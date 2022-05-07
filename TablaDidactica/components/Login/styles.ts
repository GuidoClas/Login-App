import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "lightgrey"
    },
    titleText: {
        color: 'black',
        fontFamily: 'monospace',
        fontWeight: '600',
        fontSize: 28,
        textShadowRadius: 2,
        textShadowColor: 'grey',
        paddingTop: 50
    },
    inputContainer: {
        paddingTop: 20,
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.65,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontFamily: 'monospace',
        width: Dimensions.get('window').width*0.9,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 25,
        paddingTop: 25,
        borderColor: 'lightgrey',
        borderWidth: 1
    },
    buttonContainer: {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height*0.25,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EE4266',
        borderWidth: 3,
        borderColor: 'grey'
    },
    button: {
        backgroundColor: "#FFCB1F",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'monospace',
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        paddingBottom: 15
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FFCB1F',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#EE4266',
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
        backgroundColor: '#d3e6e7'
    },
    buttonAux: {
        backgroundColor: "#EE4266",
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height*0.1,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
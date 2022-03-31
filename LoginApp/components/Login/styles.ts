import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE9E1'
    },
    titleText: {
        color: '#3A2F2C',
        fontFamily: 'sans-serif-condensed',
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 15
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'lightgrey',
        borderWidth: 1
    },
    buttonContainer: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#FAD4C0',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FAD4C0',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#FAD4C0',
        fontWeight: '700',
        fontSize: 16
    },
    error: {
        color: 'red',
        padding: 5,
        marginLeft: 100
    }
});
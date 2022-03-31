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
    button: {
        backgroundColor: '#FAD4C0',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 50,
        borderColor: 'lightgrey',
        borderWidth: 2
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16,
        color: 'black',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FAD4C0',
        borderWidth: 2,
    }
});
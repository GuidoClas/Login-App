import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: 50,
        height: 50,
        marginTop: 50,
        marginLeft: 5
    },
    titleText: {
        color: '#a0cfcf',
        fontFamily: 'sans-serif-condensed',
        fontWeight: '700',
        fontSize: 48,
        marginBottom: 15
    },
    button: {
        backgroundColor: '#a0cfcf',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 50,
        borderColor: 'white',
        borderWidth: 2
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16,
        color: 'white',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FAD4C0',
        borderWidth: 2,
    }
});
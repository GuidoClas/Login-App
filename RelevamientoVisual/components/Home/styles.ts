import { Dimensions, StyleSheet } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#a3dbdb',
        justifyContent: "center",
        alignItems: 'center',
        
    },
    divIdiomas:{
        backgroundColor: '#a3dbdb',
        width: windowWidth,
        height: windowHeight * 0.1,
        marginTop: windowHeight * 0.045,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        borderTopColor: "black",
        borderTopWidth: 2,
    },
    botIdioma:{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * 0.3,
    },
    divTemas:{
        backgroundColor: '#3bb29b',
        width: windowWidth,
        height: windowHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    botTema:{
        width: windowWidth * 0.3,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divAudios:{
        width: windowWidth,
        height: windowHeight * 0.72,
        backgroundColor: '#349281'
    },logo:{
        resizeMode: 'contain',
        maxHeight: '80%',
    },
    divCerrarSesion:{
        height: windowHeight * 0.08,
        width: windowWidth,
        backgroundColor:  "#3c4c4c",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Gill Sans Extrabold",
        resizeMode: 'contain',
        borderTopColor: "black",
        borderTopWidth: 2,
    },
    textCS:{
        color:"white",
    }
});
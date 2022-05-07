import { Dimensions, StyleSheet } from 'react-native';
import Constants from "expo-constants";

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    botButtons:{
        alignItems: 'center',
        height: windowHeight*0.95,
        width: windowWidth,
        backgroundColor:  "#FFCB1F",
        fontFamily: "Gill Sans Extrabold",
        borderBottomWidth: 2,
    },
    botFAB: {
        paddingTop: '13%',
        backgroundColor: '#EE4266',
        borderColor: 'black',
        borderWidth: 3
    },
    image: {
        width: 50,
        height: 50,
        bottom: 10
    },
    divItems: {
        width: Dimensions.get('screen').width, 
        backgroundColor: 'lightgrey',
        zIndex: -99 
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        height: windowHeight*0.165, 
        width: windowWidth,
        borderWidth: 2,
        borderColor: 'black' 
    },
    imageBG: {
        height: windowHeight*0.165,
        width: windowWidth*0.4,
    },
    imageBGColors: {
        height: windowHeight*0.165,
        width: windowWidth*1,
    },
    pressable: {
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    actionButtonImage: {
        fontSize: 20,
        height: 35,
        width: 35,
        color: 'black',
    },
    actionButtonIcon: {
        color: 'white',
        fontSize: 20,
        height: 30,
    }
});
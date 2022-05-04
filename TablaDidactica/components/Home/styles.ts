import { Dimensions, StyleSheet } from 'react-native';
import Constants from "expo-constants";

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    container: {
        flex: 1,
        //backgroundColor: '#a3dbdb',
        backgroundColor: 'red',
    },
    divAudios:{
        width: windowWidth,
        height: windowHeight*0.85,
       // backgroundColor: '#349281'
       backgroundColor: 'green'
    },
    botButtons:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: windowHeight * 0.10,
        width: windowWidth,
        backgroundColor:  "orange",
        fontFamily: "Gill Sans Extrabold",
        borderTopColor: "black",
        borderTopWidth: 2,
    },
});
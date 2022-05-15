import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
  } from "react-native";import React from "react";
  import Constants from 'expo-constants';

const HomeScreen : React.FunctionComponent = ( {navigation} : any ) => {
    
    return (
    <View>
        <TouchableHighlight
            onPress={() => { navigation.navigate("ChatScreen", { screen: '4to A' }) }}
            style={styles.btn}
        >
            <ImageBackground
            style={styles.image}
            resizeMode="stretch"
            source={require("../../assets/bgBlue.jpg")}
            >
                <Text style={styles.titleBlue}>Chat del 4to A</Text>
            </ImageBackground>
        </TouchableHighlight>

      <TouchableHighlight
        onPress={() => { navigation.navigate("ChatScreen", { screen: '4to B' }) }}
        style={styles.btn}
      >
        <ImageBackground
          style={styles.image}
          resizeMode="stretch"
          source={require("../../assets/bgGreen.jpg")}
        >
            <Text style={styles.titleGreen}>Chat del 4to B</Text>
        </ImageBackground>
      </TouchableHighlight>
    </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    btn: {
      paddingTop: 10,
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height / 2,
    },
    titleGreen: {
      backgroundColor: 'white',
      textShadowColor: 'green',
      textShadowRadius: 6,
      opacity: 0.85,
      color: 'green',
      fontSize: 36,
      fontFamily: 'Inter_900Black',
      paddingHorizontal: 25,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: '#047645'
    },
    titleBlue: {
        backgroundColor: 'white',
        textShadowColor: 'blue',
        textShadowRadius: 6,
        opacity: 0.85,
        color: 'black',
        fontSize: 36,
        fontFamily: 'Inter_900Black',
        paddingHorizontal: 25,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: 'blue'
      },
    image: {
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height *0.5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
});
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth } from "../../firebase";

export default function Home({ navigation } : any) {

  const logout = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };
  
  return (
    <View>
      
      <TouchableHighlight
        onPress={() => { navigation.navigate("Things", { type: 'pretty' }) }}
        style={styles.btn}
      >
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/lobby-lindo.jpg")}
        >
          <View style={{ height: 35, width: 35, bottom: Dimensions.get('screen').height*0.14, left: Dimensions.get('screen').width*0.43 }}>
            <Icon name={'sign-out-alt'} size={35} color={'white'} onPress={logout} />
          </View>
          <Text style={styles.title}>Cosas Lindas</Text>
        </ImageBackground>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => { navigation.navigate("Things", { type: 'horrible' }) }}
        style={styles.btn}
      >
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/lobby-feo.jpg")}
        >
            <Text style={styles.title}>Cosas Feas</Text>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 2.1,
    borderWidth: 1,
    borderColor: '#047645'
  },
  title: {
    backgroundColor: 'lightgrey',
    textShadowColor: '#047645',
    textShadowRadius: 6,
    opacity: 0.85,
    color: 'black',
    fontSize: 36,
    fontFamily: 'monospace',
    paddingHorizontal: 25,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: '#047645'
  },
  image: {
    width: Dimensions.get("screen").width * 0.99,
    height: Dimensions.get("screen").height *0.48,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
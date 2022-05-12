import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableHighlight,
  ImageBackground,
  Text,
  ActivityIndicator
} from "react-native";
import { React, useState } from "react";
import { auth } from '../../firebase';
import Icon from "react-native-vector-icons/FontAwesome5";
import AlarmComponent from "../AlarmComponent/AlarmComponent";

export default function Home({ navigation }) {
  const [alarma, setAlarma] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      auth.signOut().then(() => navigation.replace("Login"));
    }, 3000);
  };

  const handleActivarAlarma = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAlarma(true);
    }, 1500);
  };

  const handlerDesactivar = () => {
    setAlarma(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {alarma ? (
        <>
          <AlarmComponent onDesactivar={handlerDesactivar}></AlarmComponent>
        </>
      ) : (
        <>
          {loading && <View style={styles.spinnerContainer}>
          <ActivityIndicator style={styles.spinner} size={180} color="yellow" />
          </View>}

          <ImageBackground source={require('../../assets/SplashS.jpg')} style={styles.container}>
            <TouchableHighlight style={styles.button} onPress={handleActivarAlarma}>
              <View>
                <View>
                  <Icon size={140} name='power-off'/>
                </View>
                <View>
                  <Text style={styles.buttonText}>Activar</Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.signOutButton} onPress={logout}>
              <Icon size={100} name='sign-out-alt'></Icon>
            </TouchableHighlight>
          </ImageBackground>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  button: { 
    width: Dimensions.get("screen").width*0.7,
    height: Dimensions.get("screen").height*0.4,
    backgroundColor: 'rgba(193, 41, 46, 0.4)',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: 'black'
  },
  signOutButton: {
    marginTop: 30,
  },
  buttonText: {
    marginTop: 50,
    fontSize: 45,
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
  }
});
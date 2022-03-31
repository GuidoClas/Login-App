import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from "./styles";
import { auth } from '../../firebase';
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const Home = () => {
  const user = (auth.currentUser?.email).split('@')[0];

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.navigate("Login");
    })
    .catch((err : any) => {
      console.log(err.code);
      console.log(err.message);
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Bienvenido {user}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
      <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home;
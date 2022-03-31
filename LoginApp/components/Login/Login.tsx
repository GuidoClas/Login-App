import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



const Login : React.FunctionComponent = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( (user : any) => {
      if(user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);


  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials : any) => {
        console.log('User registered with: ', userCredentials.user.email);
    })
    .catch((err : any) => {
      setError(true);
      console.log(err.code);
      console.log(err.message);
    });
  };  

  const handleLogin = () => {
    auth.
    signInWithEmailAndPassword(email, password)
    .then((userCredential : any) => {
      console.log('User logged in with: ', userCredential.user.email);

    })
    .catch((err : any) => {
      setError(true);
      console.log(err.code);
      console.log(err.message);
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titleText}>Login Application</Text>
      <View style={styles.inputContainer}>
        <TextInput 
            placeholder="Email" 
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)} 
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)} 
          secureTextEntry
        />
        {error && <Text style={styles.error}>Error, try again</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            onPress={handleLogin} 
            style={styles.button}
        > 
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

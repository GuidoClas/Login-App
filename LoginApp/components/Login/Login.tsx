import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Login : React.FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successAtRegister, setSuccessAtRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignUp = () => {
    setLoading(true);
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials : any) => {
        setLoading(false);
        setSuccessAtRegister(true);
        console.log('User registered with: ', userCredentials.user.email);
    })
    .catch((err : any) => {
      setLoading(false);
      setError(true);
      setErrorMessage(handleRegisterErrorMessage(err.code));
      console.log(err.code);
      console.log(err.message);
    });
  };  

  const handleLogin = () => {
    setLoading(true);
    auth.
    signInWithEmailAndPassword(email, password)
    .then((userCredential : any) => {
      setLoading(false);
      console.log('User logged in with: ', userCredential.user.email);
      navigation.replace('Home');
    })
    .catch((err : any) => {
      setLoading(false);
      setError(true);
      setErrorMessage(handleLoginErrorMessage(err.code));
      console.log(err.code);
      console.log(err.message);
    });
  }

  const handleLoginErrorMessage = (code : String) => {
    switch (code) {
      case 'auth/user-disabled': {
          return 'Usuario deshabilitado';
      }
      case 'auth/invalid-email': {
          return 'Email inválido';
      }
      case 'auth/user-not-found': {
        return 'No se encontró un usuario con éste mail';
      }
      case 'auth/wrong-password': {
        return 'Contraseña inválida';
      }
      default: {
          return 'Contraseña inválida';
      }
    }
  };

  const handleRegisterErrorMessage = (code : String) => {
    switch (code) {
      case 'auth/email-already-in-use': {
          return 'El email ya está en uso';
      }
      case 'auth/invalid-email': {
          return 'Email inválido';
      }
      case 'auth/weak-password': {
        return 'Tu contraseña es muy débil';
      }
      default: {
          return "Contraseña inválida";
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titleText}>Ingresá para operar</Text>

      {loading && <View style={styles.spinnerContainer}>
        <ActivityIndicator style={styles.spinner} size="large" color="#3A2F2C" />
      </View>}
      
      <View style={styles.inputContainer}>
        <TextInput 
            placeholder="Email" 
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)} 
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)} 
          secureTextEntry
        />
        {error && <Text style={styles.error}>{errorMessage}</Text>}
        {successAtRegister && <Text style={styles.success}>Se registró exitosamente!</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            onPress={handleLogin} 
            style={styles.button}
        > 
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

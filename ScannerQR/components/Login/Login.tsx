import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Keyboard
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./styles";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UserContext from "../../context/context";

const Login : React.FunctionComponent = () => {
  const { email, setEmail } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successAtRegister, setSuccessAtRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignUp = () => {
    Keyboard.dismiss();
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
    loguear(email, password);
  }

  const handleLoginAutomático = (userPosition : Number) => {
    let username : string;
    let password : string;
    switch(userPosition)
    {
      case 1:
        username = "admin@admin.com";
        setEmail(username);
        password = "123456";
        setPassword(password);
      break;
      case 2:
        username = "usuario1@usuario1.com";
        setEmail(username);
        password = "222222";
        setPassword(password);
      break;
      case 3:
        username = "usuario2@usuario2.com";
        setEmail(username);
        password = "333333";
        setPassword(password);
      break;
      default:
        username = "admin@admin.com";
        setEmail(username);
        password = "123456";
        setPassword(password);
      break;
    }
    setLoading(true);
    loguear(username, password);
  }

  const loguear = (username : string, password : string) => {
    auth.
    signInWithEmailAndPassword(username, password)
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
  };

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
        return 'Contraseña incorrecta';
      }
      default: {
          return 'Contraseña incorrecta';
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
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      
      {loading && <View style={styles.spinnerContainer}>
        <ActivityIndicator style={styles.spinner} size={180} color="lightgrey" />
      </View>}
      
      <View style={styles.inputContainer}>
        <Image
              style={{ width: 100, height: 100 }}
              source={require("../../assets/gifplay.gif")}
            >
        </Image>
        <Text style={styles.titleText}>Ingresar</Text>
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
      
      <View style={styles.containerTouchable}>
          <TouchableOpacity
              onPress={() => handleLoginAutomático(1) } 
              style={styles.buttonAux}
          > 
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLoginAutomático(2) } 
            style={styles.buttonAux}
          > 
            <Text style={styles.buttonText}>Usuario 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => handleLoginAutomático(3) } 
              style={styles.buttonAux}
          > 
            <Text style={styles.buttonText}>Usuario 2</Text>
          </TouchableOpacity>
      
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./styles";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UserContext from "../../context/context";
import DropDownPicker from 'react-native-dropdown-picker';
import { Inter_900Black } from "@expo-google-fonts/inter";

const Login : React.FunctionComponent = () => {
  const { email, setEmail, password, setPassword } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successAtRegister, setSuccessAtRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogin = () => {
    setLoading(true);
    loguear(email, password);
  }

  const handleLoginAutomático = (userPosition : number) => {
    let username : string;
    let password : string;

    switch(userPosition)
    {
      case 1:
        username = "admin@admin.com";
        password = "123456";
      break;
      case 2:
        username = "usuario1@usuario1.com";
        password = "222222";
      break;
      case 3:
        username = "usuario2@usuario2.com";
        password = "333333";
      break;
      default:
        username = "admin@admin.com";
        password = "123456";
      break;
    }
    setLoading(true);
    setPassword(password);
    setEmail(username);
    loguear(username, password);
  }

  const loguear = (username : string, password : string) => {
    auth.
    signInWithEmailAndPassword(username, password)
    .then((userCredential : any) => {
      setLoading(false);
      console.log('User logged in with: ', userCredential.user.email);
      navigation.replace('HomeScreen');
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Usuario 1', value: 1},
    {label: 'Usuario 2', value: 2},
    {label: 'Usuario 3', value: 3}
  ]);

  const handleSelectItem = (item: any) => {
    handleLoginAutomático(item.value);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      
      {loading && <View style={styles.spinnerContainer}>
        <ActivityIndicator style={styles.spinner} size={180} color="lightgrey" />
      </View>}
      <ImageBackground style={styles.imageBg} source={require('../../assets/SplashS.jpg')} >
        <View style={styles.inputContainer}>
          
          <Image
                style={{ width: 100, height: 100 }}
                source={require("../../assets/gifplay.gif")}
              >
          </Image>
          
          <TextInput 
              placeholder="Email"
              placeholderTextColor="black"  
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)} 
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="black"
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
          
        </View>
        
        <View style={{}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              placeholder={'Usuarios'}
              placeholderStyle={{ fontFamily: 'Inter_900Black', textAlign: 'left', fontSize: 20 }}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onSelectItem={(item) => { handleSelectItem(item) }}
            />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import { manipulateAsync } from "expo-image-manipulator";
import { saveImageInStorage, saveInCollection } from "../../services/FirestoreService";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../../context/context";

export default function CamaraView({ route, navigation }) {
    const user = useContext(UserContext);
    const [fotoTomada, setFotoTomada] = useState(false);
    const [hideCamara, setHideCamara] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [spinnerGuardado, setSpinnerGuardado] = useState(false);
    const [uriFotoSacadaPreview, setUriFotoSacadaPreview] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
    const isFocused = useIsFocused();
    const camaraRef = useRef();
    const { type } = route.params;
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    }) ();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No tengo acceso para usar la camara</Text>;
  }

  const snap = async () => {
    try {
      if (camaraRef) {
        const options = { quality: 1, skipProcessing: true };
        const foto = await camaraRef.current.takePictureAsync(options);
        setHideCamara(true);
        setSpinner(true);
        const { uri } = foto;
        const manipResult = await manipulateAsync(
          uri,
          [{ resize: { width: 1024, height: 1024 } }],
          { format: "png" }
        );
        setUriFotoSacadaPreview(manipResult.uri);
        setFotoTomada(true);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetearCamara = () => {
    setSpinnerGuardado(false);
    setSpinner(false);
    setHideCamara(false);
    setFotoTomada(false);
    setUriFotoSacadaPreview(null);
  };

  const guardarFoto = async () => {
    try {
      const userEmail = user.email;
      setSpinnerGuardado(true);
      const blob = await (await fetch(uriFotoSacadaPreview)).blob();
      const imgRefName = `relevamientoVisual/${userEmail}/${type}`;
      const { ref, docName } = await saveImageInStorage(imgRefName, blob);
      const fotoStorage = await ref.getDownloadURL();
      
      const foto = {
        id: docName,
        email: userEmail,
        fotoURL: { uri: fotoStorage },
        tipo: type,
        fecha: new Date().toLocaleString(),
        votos: [],
      };
      await saveInCollection("relevamientoVisual", docName, foto);
      resetearCamara();
    } catch (error) {
      console.log(error);
    } finally {
      navigation.navigate('Things', { type: type });
    }
  };
  return (
    <View style={styles.container}>
      {fotoTomada ? (
        <>
          <View style={styles.container}>
            <Image
              source={{ uri: uriFotoSacadaPreview }}
              style={{ width: Dimensions.get("screen").width, height: 550 }}
            ></Image>

            {spinnerGuardado ? (
              <View
                style={[
                  styles.container,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <ActivityIndicator size={180} color={'grey'} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: Dimensions.get("screen").width,
                  marginBottom: 50,
                }}
              >
                <TouchableOpacity
                  style={styles.buttonGuardar}
                  onPress={() => guardarFoto()}
                >
                  <Text style={styles.text}> Guardar </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => resetearCamara()}
                >
                  <Text style={styles.text}> Eliminar </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          {isFocused ? (
            <View style={{ flex: 1 }}>
              <View>
                <Camera
                  pictureSize=""
                  ref={camaraRef}
                  style={[styles.camera, hideCamara && styles.hideCamera]}
                  type={typeCamera}
                  ratio="1:1"
                ></Camera>
                <View
                  style={[
                    styles.buttonContainer,
                    hideCamara && styles.hideCamera,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.buttonSacarFoto}
                    onPress={() => snap()}
                  >
                  </TouchableOpacity>
                </View>
              </View>
              {spinner && (
                <View
                  style={[
                    styles.container,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <ActivityIndicator size={180} color={'grey'} />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size={180} color={'grey'} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    camera: {
      width: Dimensions.get("screen").width,
      height: Dimensions.get('screen').height*0.80,
    },
    hideCamera: {
      display: "none",
      width: 0,
      height: 0,
    },
    buttonContainer: {
      height: Dimensions.get('screen').height * 0.15,
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center'
    },
    button: {
      paddingVertical: 20,
      paddingHorizontal: 40,
      alignSelf: "flex-end",
      alignItems: "center",
      backgroundColor: 'red',
      borderRadius: 50
    },
    buttonSacarFoto: {
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: "lightgrey",
      borderWidth: 2,
      borderColor: 'green',
      paddingTop: 30,
      padding: 35,
      borderRadius: 50,
      bottom: 15
    },
    text: {
      fontSize: 25,
      color: "white",
    },
    buttonGuardar: {
      alignSelf: "flex-end",
      alignItems: "center",
      backgroundColor: "green",
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 50
    },
  });
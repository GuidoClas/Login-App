import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Vibration,
    TextInput,
    ImageBackground,
    Dimensions
  } from "react-native";
  import { Camera } from "expo-camera";
  import React, { useState, useEffect, useRef, useContext } from "react";
  import Icon from "react-native-vector-icons/FontAwesome5";
  import { Accelerometer, Magnetometer } from "expo-sensors";
  import { Audio } from "expo-av";
import UserContext from "../../context/context";
  
  export default function AlarmComponent(props) {
    const { password } = useContext(UserContext);
    const [armado, setArmado] = useState(true);
    const [passwordIntroducida, setPasswordIntroducida] = useState("");
    const [error, setError] = useState(false);
    const [alarmaActivada, setAlarmaActivada] = useState(false);
    const camaraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [showFlash, setShowFlash] = useState(false);
    const [alarmaHorizontal, setAlarmaHorizontal] = useState(false); // x > 90 && y < 10 || x < -90 && y < 10
    const [alarmaVertical, setAlarmaVertical] = useState(false);
    const [alarmaDerecha, setalarmaDerecha] = useState(false);
    const [alarmaIzquierda, setalarmaIzquierda] = useState(false);

    const [timeoutIzq, setTimeoutIzq] = useState();
    const [timeoutDer, setTimeoutDer] = useState();
    const [timeoutVer, setTimeoutVer] = useState();
    const [timeoutHor, setTimeoutHor] = useState();

    // Data capturada en el listener de cada herramienta (movimiento cada medio segundo)
    const [dataAcelerometro, setDataAcelerometro] = useState({x: 0,y: 0, z: 0});
    const [dataMagnometro, setDataMagnometro] = useState({x: 0,y: 0, z: 0});
    const [dataPreviaMagnometro, setDataPreviaMagnometro] = useState({x: 0,y: 0,z: 0});

    //Subscripciones a los listeners
    const [subscriptionAcelerometro, setAcelerometroSubscription] = useState(null);
    const [subscriptionMagnometro, setMagnometroSubscription] = useState(null);
  
    const subscribeAcelerometro = () => {
      setAcelerometroSubscription(
        Accelerometer.addListener((accelerometerData) => {
          setDataAcelerometro(accelerometerData);
        })
      );
      Accelerometer.setUpdateInterval(250);
    };

    const subscribeMagnometro = () => {
      setMagnometroSubscription(
        Magnetometer.addListener((result) => {
          setDataMagnometro(result);
        })
      );
      Magnetometer.setUpdateInterval(250);
    };

    const unsubscribeAcelerometro = () => {
      subscriptionAcelerometro && subscriptionAcelerometro.remove();
      setAcelerometroSubscription(null);
    };

    const unsubscribeMagnometro = () => {
      subscriptionMagnometro && subscriptionMagnometro.remove();
      setMagnometroSubscription(null);
    };
  
    useEffect(() => {
      console.log(password);
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
      subscribeAcelerometro();
      subscribeMagnometro();
      return () => {
        unsubscribeAcelerometro();
        unsubscribeMagnometro();
      };
    }, []);
  
    useEffect( () => {
        if ( !dataMagnometro ) return
        setDataPreviaMagnometro( dataMagnometro );
    }, [armado] );

    useEffect(() => {
        if (alarmaVertical || alarmaHorizontal || alarmaDerecha || alarmaIzquierda)
          return;
        if (!armado) return;
    
        const ver = Math.round(dataAcelerometro.x * 100);
        const hor = Math.round(dataAcelerometro.y * 100);
        
        if ( (ver >= 90 && ver > 0) || (ver <= -90 && ver < 0) ) {
            Audio.Sound.createAsync( require('../../assets/audios/queMeGiras.aac') )
                .then( ({sound}) => {
                  sound.playAsync();
                  Vibration.vibrate(5000);
                })
                .catch( e => console.error(e) );
            setAlarmaVertical( true );
            setTimeoutVer(setTimeout( () => setAlarmaVertical(false), 5000 ));
        }

        if ( (hor >= 90 && hor > 0) ) {
            Audio.Sound.createAsync( require('../../assets/audios/solta.aac') )
                .then( ({sound}) => {
                    turnOnFlash();
                    sound.playAsync();
                } )
                .catch( e => console.error(e) );
            setAlarmaHorizontal( true );
            setTimeoutHor(setTimeout( () => setAlarmaHorizontal(false), 5000 ));
        }
        
      }, [dataAcelerometro.x, dataAcelerometro.y]);

    const turnOnFlash = () => {
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    };
  
    useEffect(() => {
        if ( !armado ) return
        if ( alarmaVertical || alarmaHorizontal || alarmaDerecha || alarmaIzquierda ) return;
        if ( !dataMagnometro ) return

        if (dataPreviaMagnometro.x == 0) {
          setDataPreviaMagnometro(dataMagnometro);
        }

        const movX = Math.round(dataPreviaMagnometro.x -  dataMagnometro.x);

        if ( dataMagnometro.y > 15 && movX <= 2 && dataMagnometro.z >= 18) {
            Audio.Sound.createAsync( require('../../assets/audios/usted.aac') )
                .then( ({sound}) => sound.playAsync() )
                .catch( e => console.error(e) );
            setalarmaDerecha( true );
            setTimeoutIzq(setTimeout( () => setalarmaDerecha(false), 5000 ));
        }

        if ( dataMagnometro.y < -15 && movX <= 2 && dataMagnometro.z >= 18 ) {
            Audio.Sound.createAsync( require('../../assets/audios/noo.aac') )
                .then( ({sound}) => sound.playAsync() )
                .catch( e => console.error(e) );
            setalarmaIzquierda( true );
            setTimeoutDer(setTimeout( () => setalarmaIzquierda(false), 5000 ));
        }
      }, [dataMagnometro.x, dataMagnometro.y]);

      const limpiarAlarmas = () => {
        clearInterval(timeoutDer);
        clearInterval(timeoutHor);
        clearInterval(timeoutIzq);
        clearInterval(timeoutVer);
    
        setAlarmaActivada(false);
        setalarmaDerecha(false);
        setalarmaIzquierda(false);
        setAlarmaHorizontal(false);
        setAlarmaVertical(false);
        setArmado(false);
      };

      const ingresarPassword = () => {
        console.log(password);
        console.log(passwordIntroducida);
        if (passwordIntroducida == password) {
            limpiarAlarmas();
            props.onDesactivar();
        } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
        }
      };

    return (
      <ImageBackground source={require('../../assets/SplashS.jpg')} style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.text}>
            Alarma Activada
          </Text>
        </View>
        <View>
          <TextInput
          style={styles.input}
          value={passwordIntroducida}
          onChangeText={(text) => setPasswordIntroducida(text)}
          secureTextEntry
          placeholder="Ingrese su contraseña para desactivar"
          placeholderTextColor={'black'}
          ></TextInput>

          {error && (
          <Text style={{color: 'yellow', textAlign: 'center'}}>
            La contraseña es inválida
          </Text>
          )}
        </View>

        <TouchableOpacity style={styles.buttonDeactivate}
          onPress={ingresarPassword}
        >
          <View>
              <View>
                <Icon size={140} name='power-off'/>
              </View>
          </View>
        </TouchableOpacity>

        <>
          {showFlash && (
            <Camera
              style={{ width: 1, height: 1 }}
              type={Camera.Constants.Type.back}
              ref={camaraRef}
              flashMode={"torch"}
              pictureSize=""
              ratio="1:1"
            />
          )}
        </>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    viewContainer: {
      height: Dimensions.get('screen').height*0.2,
      justifyContent: 'center',
    },  
    input: {
      fontFamily: 'monospace',
      width: Dimensions.get('window').width*0.9,
      backgroundColor: 'rgba(241, 211, 2, 0.5)',
      paddingHorizontal: 15,
      paddingVertical: 20,
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 4
    },
    textContainer: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      width: Dimensions.get('window').width*0.9,
    },
    text: {
      textAlign: 'center',
      fontSize: 50,
      textDecorationLine: 'underline',
    },
    buttonDeactivate: {
      width: Dimensions.get("screen").width*0.8,
      height: Dimensions.get("screen").height*0.4,
      backgroundColor: 'rgba(35, 87, 137, 0.4)',
      bottom: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 5,
      borderColor: 'black',
      
    },
    buttonText: {
      fontSize: 30,
    },
  });
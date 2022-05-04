import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Constants from 'expo-constants';
import UserContext from '../../context/context';
import { app } from '../../firebase';

export default function Scanner() {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    let hash = data.trim();
    let qrNumber;

    switch(hash){
      case "8c95def646b6127282ed50454b73240300dccabc":
        qrNumber = 10;
      break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
        qrNumber = 50;
      break;
      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        qrNumber = 100;
      break;
      default:
        qrNumber = 0;
      break;
    }
    validateBarCode(qrNumber);
  };

  const validateBarCode = (qrNumber) => {
    let hayError = false;
    if(qrNumber === 0){
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Código no valido'
      });
    } else {
      if(user.role == "admin"){
        if(qrNumber === 10){
          if(user.acum < 2){
            user.acum++;
            user.creditScore+=10;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if(qrNumber === 50){
          if(user.acum2 < 2){
            user.acum2++;
            user.creditScore+=50;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if(qrNumber === 100){
          if(user.acum3 < 2){
            user.acum3++;
            user.creditScore+=100;
            hayError = false;
          } else {
            hayError = true;
          }
        }
      } else {
        if(qrNumber === 10){
          if(user.acum < 1){
            user.acum++;
            user.creditScore+=10;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if(qrNumber === 50){
          if(user.acum2 < 1){
            user.acum2++;
            user.creditScore+=50;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if(qrNumber === 100){
          if(user.acum3 < 1){
            user.acum3++;
            user.creditScore+=100;
            hayError = false;
          } else {
            hayError = true;
          }
        }
      }
    }

    updateCreditScore(user);

    if(!hayError && qrNumber !== 0){
      Toast.show({
        type: 'success',
        text1: 'Éxito!',
        text2: 'Crédito agregado 👋'
      });
    } 
    if(hayError && qrNumber !== 0){
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'No podes acumular más de éste crédito'
      });
    }
  };

  const updateCreditScore = () => {
    app.firestore().collection('users').doc(user.user).update({
      creditScore: user.creditScore,
      acum: user.acum,
      acum2: user.acum2,
      acum3: user.acum3
    })
    .then(console.log("updated!"))
    .catch((err) => console.log(err));
  }
 
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <View style={styles.buttonContainer}>
          {scanned && <Button color="lightgrey" title={'Escanear de nuevo'} onPress={() => setScanned(false)}/>}
      </View>

      {isFocused && <View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.wrapper}
        />
      </View>}

      <View style={styles.bottomWrapper} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black', 
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.6
  },
  bottomWrapper: {
    backgroundColor: '#212842', 
    height: Dimensions.get('screen').height*0.12
  },
  buttonContainer: {
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212842',
    width: Dimensions.get('screen').width * 1,
    height: Dimensions.get('screen').height * 0.15
  }
});
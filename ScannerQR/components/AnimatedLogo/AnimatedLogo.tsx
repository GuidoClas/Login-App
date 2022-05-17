import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import React from "react";

export default function AnimatedLogo() {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    setTimeout(() => {
        setShowSpinner(true);
    }, 1500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
        }}
      >
        <ImageBackground
          style={{ width: Dimensions.get('screen').width*2, height: Dimensions.get('screen').height }}
          source={require("../../assets/SplashS.jpg")}
          resizeMode='stretch'
        ></ImageBackground>

      </View>

      <View style={{ position: 'absolute', top: -280 }}>
        <Text style={{ fontSize: 26, color: '#ffffff' }}>Guido Clas</Text>
      </View>

      <View style={{ position: 'absolute', top: -180, width: 320 }}>
        <Text style={{ fontSize: 50, fontFamily: 'Roboto', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>Escaneame</Text>
      </View>

      {showSpinner && (
        <View style={{ position: "relative", marginTop: 45 }}>
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../../assets/gifplay.gif")}
          ></Image>
        </View>
      )}

      <View style={{ position: 'absolute', bottom: -200 }}>
        <Text style={{ fontSize: 26, color: '#ffffff' }}>4B</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});
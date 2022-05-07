import { StyleSheet, View } from "react-native";
import React from "react";
import Scanner from "../../../Scanner/Scanner";

export default function ScannerTab({ navigation } : any) {

  return (
    <View>
        <Scanner navigation={navigation} ></Scanner>
    </View>
  );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#d3e6e7"
    },
    spinnerContainer: {
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
    },
});
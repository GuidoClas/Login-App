import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Scanner from "../../../Scanner/Scanner";

export default function ScannerTab() {

  return (
    <View>
        <Scanner></Scanner>
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
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { updateVotes } from "../../services/FirestoreService";
import Constants from 'expo-constants'
import UserContext from "../../context/context";
import Icon from "react-native-vector-icons/FontAwesome5";

let windowHeight = Dimensions.get('screen').height;
let windowWidth = Dimensions.get('screen').width;

export default function PicCard(props: any) {
  const { email } = useContext(UserContext);
  const [voted, setVoted] = useState(props.votos.includes(email));
  const fecha = props.fecha.split(' ')[0] + ' ' + props.fecha.split(' ')[1] + ' ' + props.fecha.split(' ')[3];

  const onVote = () => {
    if(!voted){
      updateVotes(
        "relevamientoVisual",
        props.id,
        email,
        props.votos
      );
    }
    setVoted(true);
  };

  return (
    <View key={props.id} style={styles.container}>
      <View style={styles.vwUser}>
        <Text style={styles.userText}>Usuario: {props.email} - Fecha: {fecha}</Text>
      </View>
      <View style={styles.vwStyle}>
        <ImageBackground
          source={{ uri: props.fotoURL.uri }}
          resizeMode="cover"
          style={styles.img}
        >
          <TouchableOpacity onPress={onVote} style={styles.iconContainer}>
            <Icon size={45} name={'heart'} color={voted === false ? 'red' : 'green'}/>
            <Text style={styles.iconText}>{props.votos.length}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.45,
    width: windowWidth,
    paddingTop: Constants.statusBarHeight,
  },
  vwUser:{
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.05,
    width: windowWidth * 0.9,
    textAlign: "center",
    backgroundColor: "orange",
  },
  userText:{
    color: "white"
  },
  vwStyle:{
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.35,
    width: windowWidth * 0.9,
    textAlign: "center",
    borderWidth: 3,
    borderColor: "orange",
    
  },
  img:{
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.345,
    width: windowWidth*0.89,
  },
  votado:{
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.07,
    width: windowWidth * 0.9,
    backgroundColor: "red",
  },
  iconText: {
    color: 'white',
    position: 'absolute',
    top: 5,
    left: 15,
    fontSize: 25
  },  
  iconContainer: {
    top: 120,
    left: 135
  }
});

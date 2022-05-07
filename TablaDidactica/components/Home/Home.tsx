import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Audio } from 'expo-av';
import { Audios } from "./Audio";


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [cat, setCat] = useState("Animals");
  const [language, setLanguage] = useState("ES");
  const [flagLanguage, setFlagLanguage] = useState(false);
  const [flagTopic, setFlagTopic] = useState(false);
  const [iconNameLanguage, setIconNameLanguage] = useState("ES");
  const [iconNameTopic, setIconNameTopic] = useState("ES");

  const images : any = {
    "Animals": {
      "Monkey": require('../../assets/animals/monkey.png'),
      "Cow": require('../../assets/animals/cow.png'),
      "Lion": require('../../assets/animals/lion.png'),
      "Cat": require('../../assets/animals/cat.png'),
      "Dog": require('../../assets/animals/dog.png'),
    },
    "Colors": {
      "Red": require('../../assets/colors/red.png'),
      "Blue": require('../../assets/colors/blue.png'),
      "Yellow": require('../../assets/colors/yellow.png'),
      "Purple": require('../../assets/colors/purple.png'),
      "Green": require('../../assets/colors/green.png'),
    },
    "Numbers": {
      "One": require('../../assets/numbers/one.png'),
      "Two": require('../../assets/numbers/two.png'),
      "Three": require('../../assets/numbers/three.png'),
      "Four": require('../../assets/numbers/four.png'),
      "Five": require('../../assets/numbers/five.png'),
    }
  };

  const handleSwitchTheme = ( cat : string) => {
    return Object.entries( images[cat] ).map(([key, value] : any ) => {
      return (<Pressable style={styles.pressable} onPress={() => { handleTouch(key) }} ><Image style={cat!="Colors" ? styles.imageBG : styles.imageBGColors } source={value}></Image></Pressable>)
    });
  };

  const handleTouch = async (key : string) => {
    const { sound } = await Audio.Sound.createAsync(
      Audios[language][key]
    );
    sound.playAsync();
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error: { message: any }) => alert(error.message));
  };
  
  const handleIconChangeLanguage : any = () => {
    if(!flagLanguage){
      return <Icon size={40} name={"globe"} color={"white"} />;
    } else {
      if(iconNameLanguage == "../../assets/uk.png"){
        return <Image
        style={styles.actionButtonImage}
        source={require("../../assets/uk.png")}
        />
      } else if (iconNameLanguage == "../../assets/espana.png"){
        return <Image
        style={styles.actionButtonImage}
        source={require("../../assets/espana.png")}
        />
      } else {
        return <Image
        style={styles.actionButtonImage}
        source={require("../../assets/portugal.png")}
        />
      }
    }
  };

  const handleIconChangeTopic : any = () => {
    if(!flagTopic){
      return <Icon size={40} name={"child"} color={"white"} />;
    } else {
      if(iconNameTopic == "palette"){
        return <Icon style={styles.actionButtonIcon} name="palette" />
      } else if (iconNameTopic == "paw"){
        return <Icon style={styles.actionButtonIcon} name="paw" />
      } else {
        return <Icon style={styles.actionButtonIcon} name="sort-numeric-up" />
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.botButtons}>
        <ActionButton
          offsetY={40}
          verticalOrientation={"down"}
          buttonColor="#EE4266"
          position={"left"}
          degrees={180}
          onPress={() => setFlagLanguage(true)}
          renderIcon={handleIconChangeLanguage}
          style={{ width: "30%", left: Dimensions.get("screen").width * 0.6 }}
        >
          <ActionButton.Item
            spaceBetween={2}
            buttonColor="#FFCB1F"
            useNativeFeedback={true}
            onPress={() => {
              setLanguage("EN");
              setIconNameLanguage("../../assets/uk.png");
            }}
          >
            <Image
              style={styles.actionButtonImage}
              source={require("../../assets/uk.png")}
            />
          </ActionButton.Item>
          <ActionButton.Item
            spaceBetween={2}
            buttonColor="#FFCB1F"
            onPress={() => {
              setLanguage("ES");
              setIconNameLanguage("../../assets/espana.png");
            }}
          >
            <Image
              style={styles.actionButtonImage}
              source={require("../../assets/espana.png")}
            />
          </ActionButton.Item>
          <ActionButton.Item
            spaceBetween={2}
            buttonColor="#FFCB1F"
            onPress={() => {
              setLanguage("POR");
              setIconNameLanguage("../../assets/portugal.png");
            }}
          >
            <Image
              style={styles.actionButtonImage}
              source={require("../../assets/portugal.png")}
            />
          </ActionButton.Item>
        </ActionButton>

        <View style={styles.botFAB}>
          <TouchableOpacity onPress={handleSignOut}>
            <Image
              source={require("../../assets/logout.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <ActionButton
          offsetY={40}
          verticalOrientation={"down"}
          buttonColor="#EE4266"
          position={"right"}
          degrees={360}
          renderIcon={handleIconChangeTopic}
          onPress={() => setFlagTopic(true)}
          style={{ width: "40%" }}
        >
          <ActionButton.Item
            spaceBetween={2}
            buttonColor="#FFCB1F"
            onPress={() => {
              setCat("Colors");
              setIconNameTopic("palette");
            }}
          >
            <Icon style={styles.actionButtonIcon} name="palette" />
          </ActionButton.Item>
          <ActionButton.Item
            spaceBetween={2}
            buttonColor="#FFCB1F"
            onPress={() => { 
              setCat("Animals");
              setIconNameTopic("paw");
            }}
          >
            <Icon style={styles.actionButtonIcon} name="paw" />
          </ActionButton.Item>
          <ActionButton.Item
            spaceBetween={2}
            buttonColor="#FFCB1F"
            onPress={() => { 
              setCat("Numbers");
              setIconNameTopic("sort-numeric-up");
            }}
          >
            <Icon style={styles.actionButtonIcon} name="sort-numeric-up" />
          </ActionButton.Item>
        </ActionButton>

        <View style={styles.divItems}>
          { handleSwitchTheme(cat) }
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

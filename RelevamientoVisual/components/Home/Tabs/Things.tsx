import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAll } from "../../../services/FirestoreService";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/FontAwesome5";
import PicCard from "../../PicCard/PicCard";

export default function Things({ route, navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [picList, setPicList] = useState([]);
  const { type } = route.params;

  useEffect(() => {
    setLoading(true);
    getAll(
      "relevamientoVisual",
      type,
      (data: any) => {
        const respuesta = data.docs.map((doc: any) => doc.data());
        setPicList(respuesta);
        setLoading(false);
      },
      (error: any) => console.log(error)
    );
  }, []);

  return (
    <View>
        <ImageBackground
          source={require('../../../assets/bgAndroid.jpg')}
          resizeMode={'cover'}
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height * 0.95,
          }}
        >
          {loading &&
          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', marginTop: 300 }}>
            <ActivityIndicator size={180} color={"black"} />
          </View>}
          
          <FlatList
              data={picList}
              renderItem={({ item: pic }) => (
                <PicCard {...pic}></PicCard>
              )}
            />
            <ActionButton
              offsetY={40}
              verticalOrientation={"down"}
              buttonColor="#658874"
              position={"right"}
              degrees={360}
              onPress={() => {}}
              renderIcon={() => { return <Icon size={45} color={'orange'} name={'portrait'}></Icon>}}
              size={65}
              style={{
                width: "30%",
                left: Dimensions.get("screen").width * 0.7,
              }}
            >
              <ActionButton.Item
                spaceBetween={2}
                buttonColor="#658874"
                useNativeFeedback={true}
                onPress={() => { navigation.navigate('Camera', { type: type }) }}
                title={'Camara'}
                textStyle={{ width: '100%', fontSize: 15 }}
              >
                <Icon size={30} color={'orange'} name={'camera'}></Icon>
              </ActionButton.Item>
              <ActionButton.Item
                spaceBetween={2}
                buttonColor="#658874"
                onPress={() => { navigation.navigate('MyPictures', { type: type }) }}
                title={'Mis Fotos'}
                textStyle={{ width: '100%', fontSize: 15 }}
              >
                <Icon size={30} color={'orange'} name={'images'}></Icon>
              </ActionButton.Item>
            </ActionButton>
        </ImageBackground>
    </View>
  );
}

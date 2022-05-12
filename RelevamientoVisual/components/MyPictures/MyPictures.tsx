import {
    StyleSheet,
    ImageBackground,
    View,
    FlatList,
    ActivityIndicator,
    Dimensions,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { getAllByUser } from "../../services/FirestoreService";
  import PicCard from "../PicCard/PicCard";
import UserContext from "../../context/context";
  
  export default function ListaPropia({ route }: any) {
    const user = useContext(UserContext);
    const [picList, setPicList] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const { type } = route.params;

    useEffect(() => {
      setSpinner(true);
      getAllByUser(
        "relevamientoVisual",
        user.email,
        type,
        (data : any) => {
          const respuesta = data.docs.map((doc : any) => doc.data());
          setPicList(respuesta);
          setSpinner(false);
        },
        (error : any) => console.log(error)
      );
    }, []);

    return (
        <ImageBackground
          source={require('../../assets/bgAndroid.jpg')}
          resizeMode={'cover'}
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height * 0.95,
          }}
        >
            <View>
                {spinner ? (
                <View>
                    <ActivityIndicator size={180} color={'grey'} />
                </View>
                ) : (
                <FlatList
                    data={picList}
                    renderItem={({ item: foto }) => <PicCard {...foto}></PicCard>}
                />
                )}
            </View>
        </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({});
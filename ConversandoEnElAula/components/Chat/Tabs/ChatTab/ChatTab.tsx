import React, {
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import {
  GiftedChat,
  Bubble,
  Send,
  Time,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { getAll, addMessage } from "../../../../services/FirestoreService";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import UserContext from "../../../../context/context";

export default function ChatTab({navigation, route}: any) {
  const { email } = useContext(UserContext);
  const { type } = route.params;
  const [messages, setMessages] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const AR = require("dayjs/locale/es-mx");

  useLayoutEffect(() => {
    console.log(type);
    getAll(
      "chats",
      (data:any) => {
        const respuesta = data.docs.map((doc:any) => doc.data());
        setMessages(
          respuesta
            .filter((m:any) => m.sala == type)
            .map((M:any) => ({
              _id: M._id,
              createdAt: M.createdAt.toDate(),
              text: M.text,
              user: { _id: M.user._id, name: M.user._id },
            }))
        );
      },
      (error:any) => console.log(error)
    ).then(() => {
      setTimeout(() => {
        setSpinner(false);
      }, 3000);
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    if (messages[0].text.length < 22) {
      Keyboard.dismiss();
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const { _id, createdAt, text, user } = messages[0];
      addMessage("chats", {
        _id,
        createdAt,
        text,
        user,
        sala: type,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "El mensaje debe ser menor a 21 caracteres",
        position: "bottom",
      });
    }
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor:'black',
          },
          left: {
            backgroundColor: type=='A' ? '#71B6C1' : '#C3EB78',
          },
        }}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: 'white',
          },
        }}
        usernameStyle={{ color: "black" }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        textStyle={{
          color: "white",
          borderRadius: 10,
          backgroundColor: 'grey',
          paddingTop: 12,
          height: 50,
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
        label={"Enviar"}
      ></Send>
    );
  };

  const renderComposer = (props: any) => {
    return (
      <Composer
        {...props}
        placeholder={"Escribí tu mensaje"}
        placeholderTextColor={'black'}
        composerHeight={60}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={{
          backgroundColor: 'lightgrey',
          borderWidth: 2,
          borderColor: 'black',
          color: "white",
        }}
        optionTintColor="white"
      />
    );
  };
  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: "black",
          },
          right: {
            color: "white",
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      
      {spinner && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={180} color='orange' />
        </View>
      )}
      <GiftedChat
        dateFormat="LL"
        locale={AR}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        renderTime={renderTime}
        renderUsernameOnMessage={true}
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(messages) => onSend(messages)}
        renderSend={renderSend}
        messagesContainerStyle={styles.messagesContainer}
        user={{
          _id: email,
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  input: {
    color: "white",
  },
  messagesContainer: {
    backgroundColor: 'white',
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height*0.72,
    justifyContent: "flex-end",
  },
  spinnerContainer: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.84,
    justifyContent: "center",
  },
});
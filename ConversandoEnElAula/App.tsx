import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login/Login";
import AnimatedLogo from "./components/AnimatedLogo/AnimatedLogo";
import AnimatedSplash from 'react-native-animated-splash-screen';
import Toast from "react-native-toast-message";
import UserContext from "./context/context";
import AppLoading from "expo-app-loading";
import useFonts from "./hooks/useFonts";
import HomeScreen from "./components/Home/HomeScreen";
import ChatScreen from "./components/Chat/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoaded, setIsloaded] = useState(false);
  const [isReady, SetIsReady] = useState(false);
  const FontLoading = async () => {
    await useFonts();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, 4000);
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={FontLoading}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor={"#fff"}
      customComponent={<AnimatedLogo />}
    >
      <UserContext.Provider value={{ email, setEmail, password, setPassword }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                title: "Chateando",
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTintColor: "black",
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontFamily: 'Inter_900Black'
                }
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ 
                headerShown: false,
               }}
              name="ChatScreen"
              component={ChatScreen}
            />
          </Stack.Navigator>
          <Toast/>
        </NavigationContainer>
      </UserContext.Provider>
    </AnimatedSplash>
  );
};
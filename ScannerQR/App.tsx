import { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AnimatedLogo from "./components/AnimatedLogo/AnimatedLogo";
import AnimatedSplash from 'react-native-animated-splash-screen';
import Toast from "react-native-toast-message";
import UserContext from "./context/context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoaded, setIsloaded] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, 4000);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor={"#fff"}
      customComponent={<AnimatedLogo />}
    >
      <UserContext.Provider value={{ email, setEmail, user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                title: "ScanMe",
                headerStyle: {
                  backgroundColor: "#e09e31",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold"
                }
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
          </Stack.Navigator>
          <Toast/>
        </NavigationContainer>
      </UserContext.Provider>
    </AnimatedSplash>
  );
};
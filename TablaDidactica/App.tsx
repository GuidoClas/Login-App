import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AnimatedLogo from "./components/AnimatedLogo/AnimatedLogo";
import AnimatedSplash from 'react-native-animated-splash-screen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoaded, setIsloaded] = useState(false);

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: "Juegardos",
              headerStyle: {
                
                backgroundColor: "#EE4266",
              },
              headerTitleAlign: 'center',
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontFamily: 'monospace',
                fontSize: 30,
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
      </NavigationContainer>
    </AnimatedSplash>
  );
};
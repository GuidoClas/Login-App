import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/FontAwesome5";
import ScannerTab from './Tabs/ScannerTab/ScannerTab';
import CreditTab from './Tabs/CreditTab/CreditTab';
import { auth } from "../../firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const HomeScreen : React.FunctionComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogout = () => {
    auth.signOut();
    navigation.replace('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route } : any) => ({
        tabBarIcon: ({ color, size } : any) => {
          let iconName;
          switch (route.name) {
            case "Créditos":
              iconName = "credit-card";
              break;
            case "Escaner":
              iconName = "qrcode";
              break;
            default:
              iconName = "error";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerRight: () => (
          <Icon.Button
          size={30}
          borderRadius={50}
          name="sign-out-alt"
          backgroundColor="#fff"
          onPress={handleLogout}
          color='#e09e31'
        />
        ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'grey',
      })}
    >
      <Tab.Screen name="Créditos" component={CreditTab} />
      <Tab.Screen name="Escaner" component={ScannerTab} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});

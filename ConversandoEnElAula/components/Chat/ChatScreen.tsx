import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import ChatTab from './Tabs/ChatTab/ChatTab';
import { auth } from "../../firebase";

const Tab = createBottomTabNavigator();

const ChatScreen : React.FunctionComponent = ( {navigation} : any) => {

  const handleLogout = () => {
    auth.signOut();
    navigation.replace('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route } : any) => ({
        tabBarIcon: ({ size } : any) => {
          let iconName;
          let iconColor;
          switch (route.name) {
            case "Chat A":
              iconColor = 'green';
              iconName = "comments";
              break;
            case "Chat B":
              iconColor = '#8ACDEA';
              iconName = "comments";
              break;
            default:
              iconName = "comments";
          }
          return <Icon name={iconName} size={size} color={iconColor} />;
        },
        headerStyle: {
          backgroundColor:'orange',
          borderBottomWidth: 2,
          borderBottomColor: 'black'
        },
        headerRight: () => (
          <Icon.Button
          size={30}
          borderRadius={5}
          name="sign-out-alt"
          backgroundColor='transparent'
          onPress={handleLogout}
          color='black'
        />
        ),
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="4to A" initialParams={{type: 'A'}} component={ChatTab} options={
        { 
          headerStyle: {
            backgroundColor:'#71B6C1',
            borderBottomWidth: 2,
            borderBottomColor: 'black' 
          },
          tabBarActiveTintColor: '#71B6C1',
          tabBarInactiveTintColor: 'black',
        }
      }
      />
       <Tab.Screen name="4to B" initialParams={{type: 'B'}} component={ChatTab} options={
        { 
          headerStyle: {
            backgroundColor:'#C3EB78',
            borderBottomWidth: 2,
            borderBottomColor: 'black' 
          },
          tabBarActiveTintColor: '#C3EB78',
          tabBarInactiveTintColor: 'black',
        }
      }
      />
    </Tab.Navigator>
  );
}

export default ChatScreen;
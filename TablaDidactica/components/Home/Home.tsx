import { View, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import { auth } from "../../firebase"
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingAction } from "react-native-floating-action";
import FAB from '../FAB/FAB';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {navigation.replace("Login")})
        .catch((error: { message: any; }) => alert(error.message));
    };

  return (
    <KeyboardAvoidingView
    style = {styles.container} 
    >

    <View style={styles.divAudios}>
    </View>
    
    <View style={styles.botButtons}>
      <View>
        <FloatingAction
            color={'cyan'}
            floatingIcon={require('../../assets/uk.png')}
            iconHeight={30}
            iconWidth={30}
            showBackground={false}
            onPressItem={name => {
            console.log(`selected button: ${name}`);
            }}
        />
      </View>
      <View>
      <TouchableOpacity onPress = {handleSignOut}>
        <Image
          source={require('../../assets/logout.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      </View>
      <View>
        <FloatingAction
            color={'cyan'}
            floatingIcon={require('../../assets/uk.png')}
            iconHeight={30}
            iconWidth={30}
            showBackground={false}
            onPressItem={name => {
            console.log(`selected button: ${name}`);
            }}
        />
      </View>
    </View>

    </KeyboardAvoidingView>
  )
}

export default HomeScreen;
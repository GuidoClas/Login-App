import {Dimensions, StyleSheet, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Text, Image, ActivityIndicator} from 'react-native'
import { auth } from "../../firebase"
import { useNavigation } from '@react-navigation/native';
import españaBandera from '../../assets/espana.png';
import portugalBandera from '../../assets/portugal.png';
import reinoUnidoBandera from '../../assets/uk.png';
import coloresImg from '../../assets/colores.png';
import animalImg from '../../assets/leon.png';
import numerosImg from '../../assets/numeros.png';
import Botones from '../Botones/botones';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;


const HomeScreen = () => {
    

    console.log(windowHeight);
    console.log(windowWidth);

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {navigation.replace("LoginScreen")})
        .catch(error => alert(error.message));
    };

  return (
    <KeyboardAvoidingView
    style = {styles.container} 
    >

    <View style={styles.divIdiomas}>
        <TouchableOpacity style = {styles.botIdioma}>
            <Image source = {españaBandera} style= {styles.logo}></Image>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.botIdioma}>
        <Image source = {portugalBandera} style= {styles.logo}></Image>
        </TouchableOpacity>
        <TouchableOpacity  style = {styles.botIdioma}>
        <Image source = {reinoUnidoBandera} style= {styles.logo}></Image>
        </TouchableOpacity>
    </View>

    <View style={styles.divTemas}>
        <TouchableOpacity style = {styles.botTema}>
            <Image source = {numerosImg} style= {styles.logo}></Image>
        </TouchableOpacity >
        <TouchableOpacity style = {styles.botTema}>
            <Image source = {animalImg} style= {styles.logo}></Image>
            </TouchableOpacity>
        <TouchableOpacity onPress = {handleSignOut} style = {styles.botTema}>
            <Image source = {coloresImg} style= {styles.logo}></Image>
        </TouchableOpacity>
    </View>

    <View style={styles.divAudios}>
        <Botones></Botones>
    </View>
    <View style={styles.divCerrarSesion}>
    <TouchableOpacity onPress = {handleSignOut} style = {styles.botTema}>
            <Text style={styles.textCS}>Cerrar sesion</Text>
        </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#184e77',
        justifyContent: "center",
        alignItems: 'center',
        
    },
    divIdiomas:{
        backgroundColor: '#1a759f',
        width: windowWidth,
        height: windowHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.05,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        borderTopColor: "black",
        borderTopWidth: 2,
    },
    botIdioma:{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * 0.3,
    },
    divTemas:{
        backgroundColor: '#168aad',
        width: windowWidth,
        height: windowHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    botTema:{
        width: windowWidth * 0.3,
        paddingTop: 0,
        borderColor: 0,  
        alignItems: 'center',
        justifyContent: 'center',
    },
    divAudios:{
        marginTop: 1,
        top: 0,
        width: windowWidth,
        height: windowHeight * 0.72,
    },logo:{
        resizeMode: 'contain',
        maxHeight: '80%',
    },
    divCerrarSesion:{
        height: windowHeight * 0.08,
        width: windowWidth,
        backgroundColor:  "#184e77",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Gill Sans Extrabold",
        resizeMode: 'contain',
        borderTopColor: "black",
        borderTopWidth: 2,
    },
    textCS:{
        color:"white",
    }
    
})
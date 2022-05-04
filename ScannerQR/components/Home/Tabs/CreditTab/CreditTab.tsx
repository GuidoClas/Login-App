import { Dimensions, StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/context";
import { app } from '../../../../firebase';
import Icon from "react-native-vector-icons/FontAwesome5";

export default function CreditTab() {
    const { email } = useContext(UserContext);
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      let users = [];
      
      app.firestore().collection('users').onSnapshot((querySnapshots) => {
        users = querySnapshots.docs.map(doc => doc.data());
        let user = users.find((user) => user.user == email);
        setUser(user);
        setLoading(false);
      }, (err) => {
        setLoading(false);
        console.log(err)
      });

    },[]);

    const handleResetCredits = () => {
      user.creditScore = 0;
      app.firestore().collection('users').doc(user.user).update({
        creditScore: user.creditScore,
        acum: 0,
        acum2: 0,
        acum3: 0
      })
      .then(() => { console.log("Credit Reseted") })
      .catch((err) => console.log(err));
    };
  
  return (
    <View style={styles.container}>
      {loading && <View style={styles.spinnerContainer}>
        <ActivityIndicator style={styles.spinner} size={100} color="lightgrey" />
      </View>}
      <View style={styles.flatlist}>
        <View style={styles.item}>
          <Text style={styles.title}>Usuario:</Text>
          <Text style={styles.text}>{user.user}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Rol:</Text>
          <Text style={styles.text}>{user.role}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Créditos:</Text>
          <Text style={styles.text}>{user.creditScore}</Text>
        </View>
      </View>

      <View style={styles.icon}>
        <Icon.Button
          size={55}
          borderRadius={50}
          name="trash-restore"
          backgroundColor="#d3e6e7"
          onPress={handleResetCredits}
          color='#e09e31'
        >
          <Text style={{ fontSize: 18, color: 'black' }}>
            Reestablecer Créditos
          </Text>
        </Icon.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height*0.8,    
  },
  flatlist: {
    height: Dimensions.get('screen').height * 0.5
  },
  item: {
    backgroundColor: '#d3e6e7',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 50,
    borderColor: '#e09e31',
    borderWidth: 2
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 26,
    color: '#e09e31'
  },
  icon: {
    marginTop: 70
  },
  spinnerContainer: {
    position: 'absolute',
    zIndex: 99,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  spinner: {
      width: '100%',
      height: '100%'
  },
});
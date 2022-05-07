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
      </View>
      <View style={styles.credit}>
        <Text style={styles.titleCredit}>Créditos:</Text>
        <Text style={styles.textCredit}>{user.creditScore}</Text>
      </View>

      <View style={styles.icon}>
        <Icon.Button
          style={{ borderWidth: 4, borderColor: 'red' }}
          size={55}
          borderRadius={30}
          name="trash-restore"
          backgroundColor="#d3e6e7"
          onPress={handleResetCredits}
          color='red'
        >
          <Text style={{ fontSize: 26, color: 'black' }}>
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
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height*0.8,    
  },
  flatlist: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').height * 0.25
  },
  item: {
    backgroundColor: '#d3e6e7',
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
  credit: {
    alignItems: 'center',
    backgroundColor: '#d3e6e7',
    height: Dimensions.get('screen').height * 0.35,
    width: Dimensions.get('screen').width * 1,
    borderWidth: 3,
    borderColor: '#e09e31',
    borderRadius: 30
  },
  titleCredit: {
    textAlign: 'center',
    fontSize: 56,
    color: 'white'
  },
  textCredit: {
    justifyContent: 'center',
    textAlign: 'center',
    top: 30,
    fontSize: 100,
    color: '#e09e31'
  },
  text: {
    textAlign: 'center',
    fontSize: 26,
    color: '#e09e31'
  },
  icon: {
    height: Dimensions.get('screen').height * 0.15,
    width: Dimensions.get('screen').width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
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
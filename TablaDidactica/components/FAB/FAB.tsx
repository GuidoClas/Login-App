import { View, StyleSheet } from 'react-native'
import { FloatingAction } from "react-native-floating-action";

const actions = [
    {
      text: "España",
      icon: require('../../assets/espana.png'),
      name: "bt_espana",
      position: 1
    },
    {
      text: "Portugal",
      icon: require('../../assets/portugal.png'),
      name: "bt_port",
      position: 2
    },
    {
      text: "UK",
      icon: require('../../assets/uk.png'),
      name: "bt_uk",
      position: 3
    },
];

const FAB : React.FunctionComponent = () => {
    
    return (
        <View style={styles.fabContainer}>
            <FloatingAction
                color={'cyan'}
                actions={actions}
                floatingIcon={require('../../assets/uk.png')}
                iconHeight={30}
                iconWidth={30}
                showBackground={false}
                onPressItem={name => {
                console.log(`selected button: ${name}`);
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    fabContainer: {
        //height: 50,
        //paddingTop: 95
    },
});

export default FAB;
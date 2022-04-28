import * as React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

const Profilepage = ({navigation, route}) => {
    return (
        <View style={styles.page}>
            <Image source={require('../../images/logo_withoutBG.png')} style={styles.img} />
            <Text style={styles.text}>eSpitalia</Text>
            <Button title="Edit" onPress={() => navigation.navigate('MyProfileHospitalPage', {name:"hospital name"})}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
        width: 150,
        height: 150,
    },
    text: {
        color: '#1c1bad',
        fontSize: 35,

    }
  });

export default Profilepage;
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const HospitalsCard = ({card, navigation}) => {
  const onPressHospitals = () => {
    navigation.navigate('SpecializationScreen');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPressHospitals}>
      <LinearGradient
        colors={['#1c1bad', '#4b7af2', '#0d369e']}
        style={styles.card_header}>
        <View style={styles.textView}>
          <Text style={styles.name}> {card.hospitalName} </Text>
        </View>
      </LinearGradient>
      <View style={styles.hospital_content}>
        <Image
          style={styles.hospitalImg}
          source={require('../images/andalusiahospital.png')}></Image>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Ionicons
            name={'md-location-sharp'}
            size={30}
            color="#1c1bad"
            style={{margin: 10}}></Ionicons>
          <Text style={styles.cardText}>{card.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 230,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    margin: 4,
    alignSelf: 'center',
  },

  hospital_content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
  },

  hospitalImg: {
    width: 90,
    height: 90,
    // margin: 5,
  },

  card_header: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  place: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    margin: 10,
  },

  cardText: {
    color: '#000',
    fontSize: 15,
    margin: 5,
  },
});

export default HospitalsCard;

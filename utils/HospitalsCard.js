import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const HospitalsCard = ({card, navigation}) => {
  const onPressHospitals = () => {
    navigation.navigate('SpecializationScreen', {
      hospitalID: card.hospitalID,
      hospitalName: card.hospitalName,
      hospitalAddress: card.address,
      fromHospital: true,
      isAllSpecializations: false,
      specializationSeeMore: false,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPressHospitals}>
      <View
        // colors={['#1c1bad', '#4b7af2', '#0d369e']}
        style={styles.card_header}>
        <View style={styles.textView}>
          <Text style={styles.name}> {card.hospitalName} </Text>
        </View>
      </View>
      <View style={styles.hospital_content}>
        <View style={styles.image}>
          <Image
            style={styles.hospitalImg}
            source={require('../images/royalhospital.png')}></Image>
        </View>
        <View style={styles.cardInfo}>
          <Ionicons
            name={'md-location-sharp'}
            size={30}
            color="#1c1bad"
            style={{margin: 10}}></Ionicons>
          <Text style={styles.cardText}>{card.address} </Text>
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
  },

  image: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ff0',
  },
  hospitalImg: {
    width: 90,
    height: 90,
    // alignSelf: 'center',
  },

  card_header: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardInfo: {
    flex: 3,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 2,
    // backgroundColor: '#f0f',
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

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';

const DoctorsCard = ({card, navigation, hospitalName, hospitalAddress}) => {
  const onPress = (id, name, specialization, averageRating) => {
    navigation.navigate('DoctorDetails', {
      drID: id,
      drName: name,
      specialization: specialization,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      averageRating: averageRating,
      // fromSearch: false,
    });
  };

  return (
    console.log(card.rating),
    (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          onPress(card._id, card.name, card.specialization, card.rating)
        }>
        <View style={styles.card_header}>
          <Image
            style={styles.doctorImg}
            source={{
              uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            }}></Image>
          <View style={styles.textView}>
            <Text style={styles.name}>Dr. {card.name}</Text>
            <Text style={styles.speciality}>{card.specialization}</Text>
          </View>
        </View>
        <View style={styles.card_content}>
          <View style={styles.address}>
            <FontAwesome
              name={'hospital-o'}
              size={30}
              color="#1c1bad"
              style={{margin: 10}}></FontAwesome>
            <View style={{flex: 1}}>
              <Text style={styles.hospital}>{hospitalName}</Text>
            </View>
          </View>
          <View style={styles.address}>
            <Ionicons
              name={'location-sharp'}
              size={30}
              color="#1c1bad"
              style={{margin: 10}}></Ionicons>
            <View style={{flex: 1}}>
              <Text style={styles.hospital}>{hospitalAddress}</Text>
            </View>
          </View>
          <View style={styles.customRatingBar}>
            <Rating
              type="custom"
              ratingBackgroundColor="#bfbfbf"
              tintColor="#fff"
              ratingCount={5}
              imageSize={25}
              startingValue={card.rating}
              fractions={1}
              readonly={true}
              style={{
                margin: 5,
                backgroundColor: 'transparent',
                fontSize: 15,
              }}></Rating>
          </View>
        </View>
      </TouchableOpacity>
    )
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

  card_header: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
  },

  doctorImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    margin: '2%',
  },

  textView: {
    flexDirection: 'column',
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  speciality: {
    color: '#fff',
    fontSize: 13,
  },

  card_content: {
    flexDirection: 'column',
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  hospital: {
    color: '#000',
    fontSize: 15,
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default DoctorsCard;

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DoctorsCard = ({
  card,
  maxRating,
  defaultRating,
  navigation,
  hospitalName,
  hospitalAddress,
}) => {
  const onPress = () => {
    navigation.navigate('DoctorDetails');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <FontAwesome
                  name={item <= defaultRating ? 'star' : 'star-o'}
                  size={25}
                  color="#FDCC0D"
                />
                {/* <Text> Rate is {item} / 5</Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // flexDirection:'column',
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

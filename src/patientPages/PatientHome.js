import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PatientHome({navigation}) {
  
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating] = useState([1, 2, 3, 4, 5]);

  const [homepageData, setHomepageData] = useState([]);

  useEffect(() => {
    const displayHomepage = async () => {
      await axios
        .get('http://192.168.1.10:3000/patient/homepage')
        .then(response => setHomepageData(response.data))
        .catch(function (error) {
          console.log(error.message);
        });
    };
    displayHomepage();
  }, []);

  const onPressHospitals = () => {
    navigation.navigate('SpecializationScreen');
  };

  const onPressDoctors = () => {
    navigation.navigate('DoctorDetails');
  };

  const seeAllDoctors = () => {
    navigation.navigate('DoctorList');
  };
  const seeAllHospitals = () => {
    navigation.navigate('HospitalList');
  };

  // const homepage = [
  //   {
  //     key: 1,
  //     drName: 'Alaa Abdelmajied',
  //     speciality: 'Dermatologist',
  //     hName: 'Al Andalusia Hospital',
  //     address: '6 smouha st.',
  //     image: require('../../images/andalusiahospital.png'),
  //   },
  //   {
  //     key: 2,
  //     drName: 'Ali Ghazal',
  //     speciality: 'Psychiatrist',
  //     hName: 'German Hospital',
  //     address: '6 gleem st.',
  //     image: require('../../images/germanhospital.jpg'),
  //   },
  //   {
  //     key: 3,
  //     drName: 'Mayar Adel',
  //     speciality: 'Dentist',
  //     hName: 'Royal Hospital',
  //     address: '6 ibrahmia st.',
  //     image: require('../../images/royalhospital.png'),
  //   },
  //   {
  //     key: 4,
  //     drName: 'Omar Shalaby',
  //     speciality: 'Cardiologist',
  //     hName: 'Alex Hospital',
  //     address: '6 camp shizar st.',
  //     image: require('../../images/alexhospital.png'),
  //   },
  //   {
  //     key: 5,
  //     drName: 'Nadeen Elgazar',
  //     speciality: 'Gynaecologist',
  //     hName: 'ICC Hospital',
  //     address: '6 smouha st.',
  //     image: require('../../images/icchospital.png'),
  //   },
  // ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
        <Text style={styles.headerText}>espitalia</Text>
      </View>
      <View style={styles.headline}>
        <Text style={styles.titleText}>Hospitals</Text>
        <Pressable>
          <Text
            style={{color: '#1c1bad', textDecorationLine: 'underline'}}
            onPress={seeAllHospitals}>
            See all hospitals
          </Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {homepageData.map((card, cardIndex) => {
          return (
            <TouchableOpacity
              style={styles.cards}
              key={cardIndex}
              onPress={onPressHospitals}>
              <View style={styles.card_header}>
                {/* <View style={styles.textView}> */}
                <Text style={styles.name}> {card.hName} </Text>
                {/* </View> */}
              </View>
              <View style={styles.hospital_content}>
                {/* <Image style={styles.hospitalImg} source={card.image}></Image> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name={'location-sharp'}
                    size={25}
                    color="#1c1bad"
                    style={{margin: 10}}></Ionicons>
                  <Text style={styles.cardText}>{card.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.lineStyle} />
      <View style={styles.headline}>
        <Text style={styles.titleText}>Doctors</Text>
        <Pressable>
          <Text
            style={{color: '#1c1bad', textDecorationLine: 'underline'}}
            onPress={seeAllDoctors}>
            See all doctors
          </Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {homepageData.map((card, cardIndex) => {
          return (
            <TouchableOpacity
              style={styles.cards}
              key={cardIndex}
              onPress={onPressDoctors}>
              <View style={styles.card_header}>
                <Image
                  style={styles.doctorImg}
                  source={{
                    uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                  }}></Image>
                <View style={styles.textView}>
                  <Text style={styles.name}>Dr. {card.drName} </Text>
                  <Text style={styles.speciality}>{card.speciality}</Text>
                </View>
              </View>
              <View style={styles.card_content}>
                <View style={styles.place}>
                  <FontAwesome
                    name={'hospital-o'}
                    size={30}
                    color="#1c1bad"
                    style={{margin: 10}}></FontAwesome>
                  <Text style={styles.cardText}>{card.hName}</Text>
                </View>
                <View style={styles.place}>
                  <Ionicons
                    name={'location-sharp'}
                    size={30}
                    color="#1c1bad"
                    style={{margin: 10}}></Ionicons>
                  <Text style={styles.cardText}>{card.address}</Text>
                </View>
                <View style={styles.customRatingBar}>
                  {maxRating.map((item, key) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        key={item}
                        disabled={true}
                        // onPress={() => setDefaultRating(item)}
                      >
                        <FontAwesome
                          name={item <= defaultRating ? 'star' : 'star-o'}
                          size={26}
                          color="#FDCC0D"
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},

  lineStyle: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    backgroundColor: '#000',
  },

  headline: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f0f',
  },

  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },

  cards: {
    width: 250,
    height: 230,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },

  hospital_content: {
    // width:'80%',
    // flexDirection: 'row',
    // justifyContent:'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
    // backgroundColor:'#0f0'
  },
  hospitalImg: {
    width: 90,
    height: 90,
    // margin: 5,
  },
  avatar: {
    width: '40%',
    height: 130,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 20,
    alignSelf: 'stretch',
    position: 'relative',
    marginTop: 40,
    marginRight: 100,
  },

  card_header: {
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  doctorImg: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    // margin: '2%',
  },

  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  speciality: {
    color: '#fff',
    fontSize: 13,
  },

  card_content: {
    height: '100%',
    width: '100%',
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

  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  titleText: {
    color: '#000',
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

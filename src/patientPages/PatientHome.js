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
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';

import {Server_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function PatientHome({navigation}) {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSecializations] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const displayHomepage = async () => {
    await axios
      .get(`${Server_URL}:3000/patient/homepage`)
      .then(response => {
        setHospitals(response.data.hospitals);
        setDoctors(response.data.doctors);
        setSecializations(response.data.specializations);
        setLoadData(false);
        setRefreshing(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setLoadData(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      setLoadData(true);
      displayHomepage();
    }
  }, []);

  useEffect(() => {
    if (isFocused && refreshing) {
      displayHomepage();
    }
  }, [refreshing]);

  const onRefreshing = () => {
    setRefreshing(true);
  };

  const onPressHospital = (id, name, address) => {
    navigation.navigate('SpecializationScreen', {
      hospitalID: id,
      hospitalName: name,
      hospitalAddress: address,
      isAllSpecializations: false,
    });
    console.log(id, name, address);
  };

  const onPressDoctor = (
    id,
    name,
    specialization,
    hospitalName,
    hospitalAddress,
    averageRating,
  ) => {
    navigation.navigate('DoctorDetails', {
      drID: id,
      drName: name,
      specialization: specialization,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      averageRating: averageRating,
      fromSearch: false,
    });
    console.log(
      id,
      name,
      specialization,
      hospitalName,
      hospitalAddress,
      averageRating,
    );
  };

  const onPressSpecialization = speciality => {
    navigation.navigate('DoctorsScreen', {
      speciality: speciality,
      fromHomepage: true,
      isAllDoctors: false,
    });
    console.log(speciality);
  };

  const seeAllHospitals = () => {
    navigation.navigate('HospitalList');
  };
  const seeAllDoctors = () => {
    navigation.navigate('DoctorsScreen', {isAllDoctors: true});
  };
  const seeAllSpecializations = () => {
    navigation.navigate('SpecializationScreen', {
      isAllSpecializations: true,
    });
  };

  return loadData ? (
    <View style={styles.loadingIcon}>
      <ActivityIndicator size="large" color="#0451cc" />
    </View>
  ) : (
    <ScrollView
      vertical={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
      }>
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
            All hospitals
          </Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {hospitals.map((card, cardIndex) => {
          return (
            <TouchableOpacity
              style={styles.cards}
              key={cardIndex}
              onPress={() =>
                onPressHospital(card._id, card.name, card.address)
              }>
              <View style={styles.card_header}>
                <Text style={styles.name}> {card.name} </Text>
              </View>
              <View style={styles.hospital_content}>
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
      {/* <View style={styles.lineStyle} /> */}
      <View style={styles.headline}>
        <Text style={styles.titleText}>Doctors</Text>
        <Pressable>
          <Text
            style={{color: '#1c1bad', textDecorationLine: 'underline'}}
            onPress={seeAllDoctors}>
            All doctors
          </Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {doctors.map((card, cardIndex) => {
          return (
            <TouchableOpacity
              style={styles.cards}
              key={cardIndex}
              onPress={() =>
                onPressDoctor(
                  card._id,
                  card.name,
                  card.speciality,
                  card.hospitalName,
                  card.hospitalAddress,
                  card.averageRating,
                )
              }>
              <View style={styles.card_header}>
                <View style={styles.imageView}>
                  <Image
                    style={styles.doctorImg}
                    source={{
                      uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                    }}></Image>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.name}>Dr. {card.name} </Text>
                  <Text style={styles.speciality}>{card.speciality}</Text>
                </View>
              </View>
              <View style={styles.doctor_content}>
                <View style={styles.place}>
                  <FontAwesome
                    name={'hospital-o'}
                    size={30}
                    color="#1c1bad"
                    style={{margin: 10}}></FontAwesome>
                  <Text style={styles.cardText}>{card.hospitalName}</Text>
                </View>
                <View style={styles.place}>
                  <Ionicons
                    name={'location-sharp'}
                    size={30}
                    color="#1c1bad"
                    style={{margin: 10}}></Ionicons>
                  <Text style={styles.cardText}>{card.hospitalAddress}</Text>
                </View>
                <View style={styles.customRatingBar}>
                  <Rating
                    type="custom"
                    ratingBackgroundColor="#bfbfbf"
                    tintColor="#fff"
                    ratingCount={5}
                    imageSize={25}
                    startingValue={card.averageRating}
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
          );
        })}
      </ScrollView>
      <View style={styles.headline}>
        <Text style={styles.titleText}>Specializations</Text>
        <Pressable>
          <Text
            style={{color: '#1c1bad', textDecorationLine: 'underline'}}
            onPress={seeAllSpecializations}>
            All specializations
          </Text>
        </Pressable>
      </View>
      <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
        {specializations.map((card, cardIndex) => {
          return (
            <TouchableOpacity
              style={styles.specializationCard}
              key={cardIndex}
              onPress={() => onPressSpecialization(card)}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome
                  name={'stethoscope'}
                  size={40}
                  color="#1c1bad"
                  style={{margin: 10}}></FontAwesome>
              </View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={styles.cardText}>{card}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScrollView>
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
    textAlign: 'center',
  },

  speciality: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },

  textView: {
    width: '98%',
    marginRight: 10,
    flex: 2,
    alignSelf: 'center',
  },

  imageView: {
    flex: 0.5,
    alignSelf: 'center',
    marginLeft: 10,
  },

  doctor_content: {
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
    flex:1,
  },

  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  specializationCard: {
    // width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    // margin: '1%',
    margin: 3,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },

  titleText: {
    color: '#000',
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  loadingIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList, Text} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import {Server_URL} from '@env';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default function Search({navigation}) {
  const [search, setSearch] = useState('');
  const [doctorsResult, setDoctorsResult] = useState([]);
  const [doctorSeeMore, setDoctorSeeMore] = useState(false);
  const [hospitalsResult, setHospitalsResult] = useState([]);
  const [hospitalSeeMore, setHospitalSeeMore] = useState(false);
  const [specializationsResult, setSpecializationsResult] = useState([]);
  const [specializationSeeMore, setSpecializationSeeMore] = useState(false);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (!isFocused) {
  //     setSearch('');
  //   }
  // }, [isFocused])

  const updateSearch = search => {
    setSearch(search);
    if (search.length > 0) {
      generalSearch(search);
    } else {
      setDoctorsResult([]);
      setDoctorSeeMore(false);
      setHospitalsResult([]);
      setHospitalSeeMore(false);
      setSpecializationsResult([]);
      setSpecializationSeeMore(false);
    }
  };

  const generalSearch = search => {
    axios
      .get(`${Server_URL}:3000/patient/search/${search}`)
      .then(response => {
        setDoctorsResult(response.data.doctors);
        setDoctorSeeMore(response.data.doctorSeeMore);
        setHospitalsResult(response.data.hospitals);
        setHospitalSeeMore(response.data.hospitalSeeMore);
        setSpecializationsResult(response.data.specializations);
        setSpecializationSeeMore(response.data.specializationsSeeMore);
        // console.log(response.data);
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'No hospitals or doctors or specializations found') {
          setDoctorsResult([]);
          setDoctorSeeMore(false);
          setHospitalsResult([]);
          setHospitalSeeMore(false);
          setSpecializationsResult([]);
          setSpecializationSeeMore(false);
          // console.log(err);
        }
      });
  };

  const onPressDr = (id, name) => {
    navigation.navigate('DoctorDetails', {
      drID: id,
      drName: name,
      fromSearch: true,
    });
    console.log(id, name);
  };

  const onPressHosp = (id, name, address) => {
    navigation.navigate('SpecializationScreen', {
      hospitalID: id,
      hospitalName: name,
      hospitalAddress: address,
      fromHospital: true,
      isAllSpecializations: false,
      specializationSeeMore: false,
    });
    console.log(id, name);
  };

  const onPressSpec = specialization => {
    navigation.navigate('DoctorsScreen', {
      speciality: specialization,
      fromSpecialization: true,
      isAllDoctors: false,
      doctorSeeMore: false,
      fromHospitalThenSpec: false,
    });
  };

  const seeMoreDoctors = () => {
    navigation.navigate('DoctorsScreen', {
      doctorSeeMore: true,
      targetSearch: search,
      fromSpecialization: false,
      isAllDoctors: false,
      doctorSeeMore: true,
      fromHospitalThenSpec: false,
    });
    console.log(search, doctorSeeMore);
  };

  const seeMoreHospitals = () => {
    navigation.navigate('HospitalList', {
      hospitalSeeMore: true,
      targetSearch: search,
    });
    console.log(search, hospitalSeeMore);
  };

  const seeMoreSpecializations = () => {
    navigation.navigate('SpecializationScreen', {
      targetSearch: search,
      fromHospital: false,
      isAllSpecializations: false,
      specializationSeeMore: true,
    });
    console.log(search, specializationSeeMore);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme={true}
        placeholder="search for doctor, hospital or specialization"
        onChangeText={value => updateSearch(value)}
        value={search}
        fontSize={15}
        containerStyle={{backgroundColor: '#f0f0f0'}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
      />
      <FlatList
        keyExtractor={item => item._id}
        data={doctorsResult}
        ListHeaderComponent={() => (
          <View style={styles.flatListHeader}>
            <Text style={styles.titleText}>Doctors</Text>
            {doctorSeeMore ? (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={seeMoreDoctors}>
                <Text style={{color: '#fff', fontSize: 15}}>See More</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.searchCard}
              onPress={() => onPressDr(item._id, item.name)}>
              <View
                style={{justifyContent: 'center', alignItems: 'center'}}></View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={styles.searchText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 18,
              alignSelf: 'center',
              margin: 15,
            }}>
            No results found
          </Text>
        }
      />

      <FlatList
        keyExtractor={item => item._id}
        data={hospitalsResult}
        ListHeaderComponent={() => (
          <View style={styles.flatListHeader}>
            <Text style={styles.titleText}>Hospitals</Text>
            {hospitalSeeMore ? (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={seeMoreHospitals}>
                <Text style={{color: '#fff', fontSize: 15}}>See More</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.searchCard}
              onPress={() => onPressHosp(item._id, item.name, item.address)}>
              <View
                style={{justifyContent: 'center', alignItems: 'center'}}></View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                <Text style={styles.searchText}>{item.name}</Text>
                <Text style={styles.searchText}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 18,
              alignSelf: 'center',
              margin: 15,
            }}>
            No results found
          </Text>
        }
      />
      <FlatList
        keyExtractor={item => item._id}
        data={specializationsResult}
        ListHeaderComponent={() => (
          <View style={styles.flatListHeader}>
            <Text style={styles.titleText}>Specializations</Text>
            {specializationSeeMore ? (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={seeMoreSpecializations}>
                <Text style={{color: '#fff', fontSize: 15}}>See More</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.searchCard}
              onPress={() => onPressSpec(item.name)}>
              <View
                style={{justifyContent: 'center', alignItems: 'center'}}></View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={styles.searchText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 18,
              alignSelf: 'center',
              margin: 15,
            }}>
            No results found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContent: {
    flexDirection: 'row',
    marginTop: 10,
  },

  header: {
    marginBottom: 5,
    height: '11%',
    backgroundColor: '#1c1bad',
  },

  Image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    // marginTop:10,
  },

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },

  iconBtnSearch: {
    alignSelf: 'center',
  },

  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },

  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  searchCard: {
    alignSelf: 'center',
    width: '95%',
    paddingVertical: 5,
    margin: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  flatListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  seeMoreButton: {
    flex: 1,
    margin: 5,
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // notificationList: {
  //   marginTop: 0,
  //   padding: 0,
  // },

  specializationBox: {
    paddingTop: '2%',
    paddingBottom: '2%',
    // marginTop: 5,
    margin: '1%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },

  searchText: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },

  titleText: {
    color: '#000',
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 4,
  },
});

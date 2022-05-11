import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import { Server_URL } from '@env';
import axios from 'axios';

export default function Search({ navigation }) {
  const [search, setSearch] = useState('');
  const [doctorsResult, setDoctorsResult] = useState([]);
  const [doctorSeeMore, setDoctorSeeMore] = useState(false);
  const [hospitalsResult, setHospitalsResult] = useState([]);
  const [hospitalSeeMore, setHospitalSeeMore] = useState(false);
  const [specializationsResult, setSpecializationsResult] = useState([]);
  const [specializationSeeMore, setSpecializationSeeMore] = useState(false);

  const updateSearch = (search) => {
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

  const generalSearch = (search) => {
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


  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme={true}
        placeholder="search for doctor, hospital or specialization"
        onChangeText={(value) => updateSearch(value)}
        value={search}
        fontSize={15}
        containerStyle={{ backgroundColor: '#f0f0f0' }}
        inputContainerStyle={{ borderRadius: 50, backgroundColor: '#fff' }}
      />
      <FlatList
        keyExtractor={item => item._id}
        data={doctorsResult}
        ListHeaderComponent={() =>
          <View style={styles.flatListHeader}>
            <Text style={{ flex: 4 }}>Doctors</Text>
            {doctorSeeMore ? <TouchableOpacity style={styles.seeMoreButton}>
              <Text>See More</Text>
            </TouchableOpacity> : null}
          </View>
        } renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.specializationCard
            }>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={styles.speciality}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text>No Results</Text>}
      />

      <FlatList
        keyExtractor={item => item._id}
        data={hospitalsResult}
        ListHeaderComponent={() =>
          <View style={styles.flatListHeader}>
            <Text style={{ flex: 4 }}>Hospitals</Text>
            {hospitalSeeMore ? <TouchableOpacity style={styles.seeMoreButton}>
              <Text>See More</Text>
            </TouchableOpacity> : null}
          </View>
        } renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.specializationCard
            }>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={styles.speciality}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text>No Results</Text>}
      />
      <FlatList
        keyExtractor={item => item._id}
        data={specializationsResult}
        ListHeaderComponent={() =>
          <View style={styles.flatListHeader}>
            <Text style={{ flex: 4 }}>Specializations</Text>
            {specializationSeeMore ? <TouchableOpacity style={styles.seeMoreButton}>
              <Text>See More</Text>
            </TouchableOpacity> : null}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.specializationCard
            }>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={styles.speciality}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text>No Results</Text>}
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
  flatListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  seeMoreButton: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: "#f00f",
    alignItems: 'center',
    justifyContent: "center"
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

  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },

  speciality: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },

  search: {
    borderRadius: 20,
    height: 50,
  },
});

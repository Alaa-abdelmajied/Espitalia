import React, {useState, useEffect} from 'react';
import {View, FlatList, Pressable, Text, ActivityIndicator} from 'react-native';
import DoctorsCard from '../../utils/DoctorsCard';
import { SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Server_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

export default function Doctors({ navigation, route }) {
  const {
    hospitalID,
    specialization,
    hospitalName,
    hospitalAddress,
    isAllDoctors,
    speciality,
    fromHomepage,
    fromSearch,
  } = route.params;

  const [doctors, setDoctors] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      console.log(Server_URL);
      if (fromHomepage || fromSearch) {
        const getSpecDoctors = async () => {
          await axios
            .get(
              `${Server_URL}:3000/patient/searchSpecialization/${speciality}`,
            )
            .then(response => {
              setDoctors(response.data);
              console.log(response.data);
              setLoadData(false);
            })
            .catch(function (error) {
              console.log(error.message);
              setLoadData(false);
            });
        };
        getSpecDoctors();
      } else if (isAllDoctors) {
        const seeAllDoctors = async () => {
          await axios
            .get(`${Server_URL}:3000/patient/allDoctors`)
            .then(response => {
              setDoctors(response.data);
              setLoadData(false);
            })
            .catch(function (error) {
              console.log(error.message);
              setLoadData(false);
            });
        };
        seeAllDoctors();
      } else {
        const getDoctors = async () => {
          console.log(Server_URL);

          await axios
            .get(
              `${Server_URL}:3000/patient/pressOnHospitalThenSpecialization/${hospitalID}/${specialization}`,
            )
            .then(response => {
              setDoctors(response.data);
              setLoadData(false);
            })
            .catch(function (error) {
              console.log(error.message);
              setLoadData(false);
            });
        };
        getDoctors();
      }
      console.log('done');
    }
  }, []);

  const [search, setSearch] = useState('');
  const searchDoctor = search => {
    axios
      .get(`${Server_URL}:3000/patient/searchDoctors/${search}`)
      .then(response => {
        setAllHospitals(response.data);
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'No specializations found') {
          setAllHospitals([]);
        }
      });
  };
  const updateSearch = search => {
    setSearch(search);
    if (search.length > 0) {
      searchDoctor(search);
    } else {
      setDoctors();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={{ flex: 1, alignSelf: 'center', marginLeft: 5 }} onPress={() => navigation.goBack()}>
          <Ionicons
            name={'arrow-back'}
            size={30}
            color="#1c1bad"></Ionicons>
        </Pressable>
        <SearchBar
          lightTheme={true}
          placeholder="search"
          onChangeText={updateSearch}
          value={search}
          containerStyle={{ flex: 12, backgroundColor: '#f0f0f0' }}
          inputContainerStyle={{ borderRadius: 50, backgroundColor: '#fff' }}
        />
      </View>
      <FlatList
        data={doctors}
        keyExtractor={item => {
          return item._id;
        }}
        renderItem={({ item }) => {
          return (
            <DoctorsCard
              card={item}
              navigation={navigation}
              hospitalName={
                fromHomepage || fromSearch
                  ? item.hospitalName
                  : isAllDoctors
                    ? item.doctorHospitalName
                    : hospitalName
              }
              hospitalAddress={
                fromHomepage || fromSearch
                  ? item.hospitalAddress
                  : isAllDoctors
                    ? item.doctorHospitalAddress
                    : hospitalAddress
              }
            />
          );
        }}
        ListEmptyComponent={
          loadData ? (
            <View>
              <ActivityIndicator size="large" color="#0451cc" />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#000',
                margin: '10%',
              }}>
              No doctors found :(
            </Text>
          )
        }
      />
    </View>
  );
}

import React, {useState, useEffect} from 'react';
import {View, FlatList, Pressable, Text} from 'react-native';
import DoctorsCard from '../../utils/DoctorsCard';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import {Server_URL} from '@env';

export default function Doctors({navigation, route}) {
  const {
    hospitalID,
    specialization,
    hospitalName,
    hospitalAddress,
    isAllDoctors,
    speciality,
    fromHomepage,
    // fromSearch,
  } = route.params;

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log(Server_URL);
    if (fromHomepage) {
      const getSpecDoctors = async () => {
        await axios
          .get(`${Server_URL}:3000/patient/searchSpecialization/${speciality}`)
          .then(response => {
            setDoctors(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error.message);
          });
      };
      getSpecDoctors();
    } else if (isAllDoctors) {
      const seeAllDoctors = async () => {
        await axios
          .get(`${Server_URL}:3000/patient/allDoctors`)
          .then(response => setDoctors(response.data))
          .catch(function (error) {
            console.log(error.message);
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
          })
          .catch(function (error) {
            console.log(error.message);
          });
      };
      getDoctors();
    }
  }, []);

  const [search, setSearch] = useState('');
  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
      <SearchBar
        lightTheme={true}
        placeholder="search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{backgroundColor: '#f0f0f0'}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
      />
      <FlatList
        data={doctors}
        keyExtractor={item => {
          return item._id;
        }}
        renderItem={({item}) => {
          return (
            <DoctorsCard
              card={item}
              navigation={navigation}
              hospitalName={
                fromHomepage
                  ? item.hospitalName
                  : isAllDoctors
                  ? item.doctorHospitalName
                  : hospitalName
              }
              hospitalAddress={
                fromHomepage
                  ? item.hospitalAddress
                  : isAllDoctors
                  ? item.doctorHospitalAddress
                  : hospitalAddress
              }
            />
          );
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              color: '#000',
              margin: '10%',
            }}>
            No doctors found :(
          </Text>
        }
      />
    </View>
  );
}

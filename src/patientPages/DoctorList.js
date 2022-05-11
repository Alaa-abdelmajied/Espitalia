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
  } = route.params;
  // const [allDoctors, setAllDoctors] = useState([]);

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    console.log(Server_URL);

    if (isAllDoctors) {
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

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

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
      {/* <ScrollView>
        {doctors.map((card, cardIndex) => {
          return (
            <DoctorsCard
              card={card}
              maxRating={maxRating}
              defaultRating={defaultRating}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>  */}
      <FlatList
        data={doctors}
        keyExtractor={item => {
          return item._id;
        }}
        renderItem={({item}) => {
          return (
            <DoctorsCard
              card={item}
              maxRating={maxRating}
              defaultRating={defaultRating}
              navigation={navigation}
              hospitalName={
                isAllDoctors ? item.doctorHospitalName : hospitalName
              }
              hospitalAddress={
                isAllDoctors ? item.doctorHospitalAddress : hospitalAddress
              }
            />
          );
        }}
      />
    </View>
  );
}

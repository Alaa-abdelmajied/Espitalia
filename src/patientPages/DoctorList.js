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
        await axios
          .get(
            `http://192.168.1.10:3000/patient/pressOnHospitalThenSpecialization/${hospitalID}/${specialization}`,
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

  // useEffect(() => {
  //   const getDoctors = async () => {
  //     console.log(hospitalName, hospitalAddress);
  //     await axios
  //       .get(
  //         `http://192.168.1.10:3000/patient/pressOnHospitalThenSpecialization/${hospitalID}/${specialization}`,
  //       )
  //       .then(response => {
  //         setDoctors(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error.message);
  //       });
  //   };
  //   getDoctors();
  // }, []);

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  // const doctors = [
  //   {
  //     key: 1,
  //     drName: 'Alaa Abdelmajied',
  //     speciality: 'Dermatologist',
  //     hName: 'Al Andalusia Hospital',
  //     address: '15 el midan st. - smouha',
  //     color: '#1c1bad',
  //   },
  //   {
  //     key: 2,
  //     drName: 'Mayar Adel',
  //     speciality: 'Dentist',
  //     hName: 'Royal Hospital',
  //     address: '17 abdelqader basha st.',
  //     color: '#0d589e',
  //   },
  //   {
  //     key: 3,
  //     drName: 'Omar Shalaby',
  //     speciality: 'Cardiologist',
  //     hName: 'Alex Hospital',
  //     address: '12 camp shizar st.',
  //     color: '#0d789e',
  //   },
  //   {
  //     key: 4,
  //     drName: 'Nadeen Elgazar',
  //     speciality: 'Gynaecologist',
  //     hName: 'ICC Hospital',
  //     address: '3 smouha st.',
  //     color: '#0d899e',
  //   },
  //   {
  //     key: 5,
  //     drName: 'Maram Ghazal',
  //     speciality: 'Cardiologist',
  //     hName: 'Alex Hospital',
  //     address: '6 camp shizar st.',
  //     color: '#0d789e',
  //   },
  //   {
  //     key: 6,
  //     drName: 'Omar Radwan',
  //     speciality: 'Dentist',
  //     hName: 'Alex Hospital',
  //     address: '5 camp shizar st.',
  //     color: '#0d789e',
  //   },
  //   {
  //     key: 7,
  //     drName: 'Verginia Ehab',
  //     speciality: 'Psychiatrist',
  //     hName: 'Alex Hospital',
  //     address: '5 camp shizar st.',
  //     color: '#0d789e',
  //   },
  //   {
  //     key: 8,
  //     drName: 'Omar Hisham',
  //     speciality: 'Dentist',
  //     hName: 'Al Andalusia Hospital',
  //     address: '15 el midan st. - smouha',
  //     color: '#0d789e',
  //   },
  //   {
  //     key: 9,
  //     drName: 'Ali Ghazal',
  //     speciality: 'Psychiatrist',
  //     hName: 'German Hospital',
  //     address: '6 gleem st.',
  //     color: '#0d369e',
  //   },
  // ];

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

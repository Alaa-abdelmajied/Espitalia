import React, {useState, useEffect} from 'react';
import {View, FlatList, Pressable, Text, ActivityIndicator} from 'react-native';
import DoctorsCard from '../../utils/DoctorsCard';
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Server_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function Doctors({navigation, route}) {
  const {
    hospitalID,
    specialization,
    hospitalName,
    hospitalAddress,
    isAllDoctors,
    speciality,
    fromSpecialization,
    doctorSeeMore,
    fromHospitalThenSpec,
    targetSearch,
  } = route.params;

  const [doctors, setDoctors] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  const getDoctors = async () => {
    if (
      fromHospitalThenSpec &&
      !fromSpecialization &&
      !isAllDoctors &&
      !doctorSeeMore
    ) {
      console.log(Server_URL);
      console.log('id===>', hospitalID, 'spec====>', specialization);
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
    } else if (
      fromSpecialization &&
      !isAllDoctors &&
      !doctorSeeMore &&
      !fromHospitalThenSpec
    ) {
      await axios
        .get(`${Server_URL}:3000/patient/doctorInSpecialization/${speciality}`)
        .then(response => {
          setDoctors(response.data);
          console.log(response.data);
          setLoadData(false);
        })
        .catch(function (error) {
          console.log(error.message);
          setLoadData(false);
        });
    } else if (
      isAllDoctors &&
      !fromHospitalThenSpec &&
      !doctorSeeMore &&
      !fromSpecialization
    ) {
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
    } else if (
      doctorSeeMore &&
      !isAllDoctors &&
      !fromHospitalThenSpec &&
      !fromSpecialization
    ) {
      await axios
        .get(`${Server_URL}:3000/patient/searchDoctors/${targetSearch}`)
        .then(response => {
          setDoctors(response.data);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No doctors with that name found') {
            setDoctors([]);
          }
        });
    }
  };

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      getDoctors();
    }
  }, []);

  const searchDoctor = search => {
    if (isAllDoctors && !fromSpecialization && !fromHospitalThenSpec) {
      axios
        .get(`${Server_URL}:3000/patient/searchDoctors/${search}`)
        .then(response => {
          setDoctors(response.data);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No doctors with that name found') {
            setDoctors([]);
          }
        });
    } else if (!isAllDoctors && fromSpecialization && !fromHospitalThenSpec) {
      axios
        .get(
          `${Server_URL}:3000/patient/searchDoctorInSpecialization/${speciality}/${search}`,
        )
        .then(response => {
          setDoctors(response.data);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No doctors with that name found') {
            setDoctors([]);
          }
        });
    } else if (!isAllDoctors && !fromSpecialization && fromHospitalThenSpec) {
      axios
        .get(
          `${Server_URL}:3000/patient/searchDoctorInSpecInHosp/${hospitalID}/${specialization}/${search}`,
        )
        .then(response => {
          setDoctors(response.data);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No doctors with that name found') {
            setDoctors([]);
          }
        });
    }
  };
  const updateSearch = search => {
    setSearch(search);
    if (search.length > 0) {
      searchDoctor(search);
    } else {
      getDoctors();
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{flex: 1, alignSelf: 'center', marginLeft: 5}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#1c1bad"></Ionicons>
        </Pressable>
        {!doctorSeeMore ? (
          <SearchBar
            lightTheme={true}
            placeholder="search"
            onChangeText={updateSearch}
            value={search}
            containerStyle={{flex: 12, backgroundColor: '#f0f0f0'}}
            inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
          />
        ) : null}
      </View>

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
                fromHospitalThenSpec ? hospitalName : item.doctorHospitalName
              }
              hospitalAddress={
                fromHospitalThenSpec
                  ? hospitalAddress
                  : item.doctorHospitalAddress
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

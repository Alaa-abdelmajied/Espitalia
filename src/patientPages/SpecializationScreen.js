import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {Server_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function Speciality({navigation, route}) {
  const [specialization, setSpecialization] = useState([]);
  // const [allSpecializations, setAllSpecializations] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();
  const {
    hospitalID,
    hospitalName,
    hospitalAddress,
    isAllSpecializations,
    specializationSeeMore,
    targetSearch,
    // fromHomepage,
  } = route.params;

  const getSpecializations = () => {
    if (!isAllSpecializations && !specializationSeeMore) {
      axios
        .get(`${Server_URL}:3000/patient/pressOnHospital/${hospitalID}`)
        .then(response => {
          console.log(response.data);
          setSpecialization(response.data);
          setLoadData(false);
        })
        .catch(function (error) {
          console.log(error.message);
          setLoadData(false);
        });
    } else if (specializationSeeMore) {
      axios
        .get(
          `${Server_URL}:3000/patient/searchAllSpecializations/${targetSearch}`,
        )
        .then(response => {
          setSpecialization(response.data.specializations);
          console.log(response.data.specializations);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No specializations found') {
            setSpecialization([]);
          }
        });
    } else {
      axios
        .get(`${Server_URL}:3000/patient/allSpecializations`)
        .then(response => {
          console.log(response.data);
          setSpecialization(response.data);
          setLoadData(false);
        })
        .catch(function (error) {
          console.log(error.message);
          setLoadData(false);
        });
    }
  };

  // const seeMoreSpecializationsResult = () => {
  //   axios
  //     .get(
  //       `${Server_URL}:3000/patient/searchAllSpecializations/${targetSearch}`,
  //     )
  //     .then(response => {
  //       setSpecialization(response.data.specializations);
  //       console.log(response.data.specializations);
  //     })
  //     .catch(function (error) {
  //       const err = error.response.data;
  //       if (err == 'No specializations found') {
  //         setSpecialization([]);
  //       }
  //     });
  // };

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      // if (specializationSeeMore) {
      //   console.log(search);
      // } else {
      getSpecializations();
      // }
    }
  }, []);

  const specSearch = search => {
    axios
      .get(`${Server_URL}:3000/patient/searchAllSpecializations/${search}`)
      .then(response => {
        setSpecialization(response.data.specializations);
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'No specializations found') {
          setSpecialization([]);
        }
      });
  };

  const updateSearch = search => {
    setSearch(search);
    if (search.length > 0) {
      specSearch(search);
    } else {
      getSpecializations();
    }
  };

  const onPressSpecInHosp = item => {
    navigation.navigate('DoctorsScreen', {
      specialization: item,
      hospitalID: hospitalID,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      isAllDoctors: false,
      fromHomepage: false,
    });
    console.log(item, hospitalID, hospitalName, hospitalAddress);
  };

  const onPressSpec = item => {
    navigation.navigate('DoctorsScreen', {
      speciality: item,
      isAllDoctors: false,
      fromHomepage: true,
    });
    console.log(item);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{flex: 1, alignSelf: 'center', marginLeft: 5}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#1c1bad"></Ionicons>
        </Pressable>
        {!specializationSeeMore ? (
          <SearchBar
            lightTheme={true}
            placeholder="search for specialization"
            containerStyle={{flex: 12, backgroundColor: '#f0f0f0'}}
            onChangeText={value => updateSearch(value)}
            value={search}
            inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
          />
        ) : null}
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={specialization}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.specializationCard}
              // onPress={() => onPress(!isAllSpecializations ? item : item.name)}
              onPress={
                !isAllSpecializations && !specializationSeeMore
                  ? () => onPressSpecInHosp(item)
                  : () => onPressSpec(item.name)
              }>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome
                  name={'stethoscope'}
                  size={40}
                  color="#1c1bad"
                  style={{margin: 10}}></FontAwesome>
              </View>
              {!isAllSpecializations && !specializationSeeMore ? (
                <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text style={styles.speciality}>{item}</Text>
                </View>
              ) : (
                <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text style={styles.speciality}>{item.name}</Text>
                </View>
              )}
            </TouchableOpacity>
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
              No specializations found :(
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center',
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    // marginTop:10,
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

  specializationContainer: {
    flexDirection: 'row',
    width: '98%',
    justifyContent: 'center',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    margin: '3%',
  },

  speciality: {
    fontSize: 20,
    color: '#000',
  },
});

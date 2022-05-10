import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Server_URL} from "@env";

export default function Speciality({navigation, route}) {
  const [specialization, setSpecialization] = useState([]);
  const {hospitalID, hospitalName, hospitalAddress} = route.params;

  useEffect(() => {
    const getSpecializations = async () => {
      await axios
        .get(`${Server_URL}:3000/patient/pressOnHospital/${hospitalID}`)
        .then(response => {
          setSpecialization(response.data);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No specialzations found') {
            //alert worng email or password
            Alert.alert(err);
            console.log(error.message);
          } else if (err == 'No hospitals found') {
          }
        });
    };
    getSpecializations();
  }, []);

  // const [search, setSearch] = useState('');
  // const updateSearch = search => {
  //   setSearch(search);
  // };

  // useEffect(() => {
  // const searchSpecialization = text => {
  //   axios
  //     .get(`http://192.168.1.10:3000/patient/searchSpecialization/${text}`)
  //     .then(response => setSearch(response.data))
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // };

  const onPress = (item) => {
    navigation.navigate('DoctorsScreen', {
      hospitalID: hospitalID,
      specialization: item,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      isAllDoctors: false,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme={true}
        placeholder="search"
        containerStyle={{backgroundColor: '#f0f0f0'}}
        // onChangeText={searchSpecialization}
        // value={search}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={specialization}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.specializationCard}
              onPress={() => onPress(item)}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome
                  name={'stethoscope'}
                  size={40}
                  color="#1c1bad"
                  style={{margin: 10}}></FontAwesome>
              </View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={styles.speciality}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

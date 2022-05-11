import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import HospitalsCard from '../../utils/HospitalsCard';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import {Server_URL} from '@env';

export default function Hospitals({navigation}) {
  const [allHospitals, setAllHospitals] = useState([]);

  useEffect(() => {
    const seeAllHospitals = async () => {
      await axios
        .get(`${Server_URL}:3000/patient/allHospitals`)
        .then(response => setAllHospitals(response.data))
        .catch(function (error) {
          console.log(error.message);
        });
    };
    seeAllHospitals();
  }, []);

  const [search, setSearch] = useState('');
  const updateSearch = search => {
    setSearch(search);
  };


  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <SearchBar
        lightTheme={true}
        placeholder="search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{backgroundColor: '#f0f0f0'}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
      />
      {/* <ScrollView>
        {hospitals.map(card => {
          return <HospitalsCard card={card} navigation={navigation} />;
        })}
      </ScrollView> */}
      <FlatList
        data={allHospitals}
        keyExtractor={item => {
          return item.hospitalID;
        }}
        renderItem={({item}) => {
          return <HospitalsCard card={item} navigation={navigation} />;
        }}
      />
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, Text, ActivityIndicator } from 'react-native';
import HospitalsCard from '../../utils/HospitalsCard';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { Server_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';


export default function Hospitals({ navigation }) {

  const [allHospitals, setAllHospitals] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      const seeAllHospitals = async () => {
        await axios
          .get(`${Server_URL}:3000/patient/allHospitals`)
          .then(response => {
            setAllHospitals(response.data);
            setLoadData(false);
          })
          .catch(function (error) {
            console.log(error.message);
            setLoadData(false);
          });
      };
      seeAllHospitals();
    }
  }, []);

  const [search, setSearch] = useState('');
  const updateSearch = search => {
    setSearch(search);
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <SearchBar
        lightTheme={true}
        placeholder="search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{ backgroundColor: '#f0f0f0' }}
        inputContainerStyle={{ borderRadius: 50, backgroundColor: '#fff' }}
      />

      <FlatList
        data={allHospitals}
        keyExtractor={item => {
          return item.hospitalID;
        }}
        renderItem={({ item }) => {
          return <HospitalsCard card={item} navigation={navigation} />;
        }}
        ListEmptyComponent={
          loadData ? <View>
            <ActivityIndicator size="large" color="#0451cc" />
          </View> :
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#000',
                margin: '10%',
              }}>
              No hospitals found :(
            </Text>
        }
      />
    </View>
  );
}

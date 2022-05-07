import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import HospitalsCard from '../../utils/HospitalsCard';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';

export default function Hospitals({navigation}) {
  const [allHospitals, setAllHospitals] = useState([]);

  useEffect(() => {
    const seeAllHospitals = async () => {
      await axios
        .get('http://192.168.1.10:3000/patient/allHospitals')
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

  // const hospitals = [
  //   {
  //     key: 1,
  //     hName: 'Al Andalusia Hospital',
  //     address: '15 el midan st. - smouha',
  //     image: require('../../images/andalusiahospital.png'),
  //   },
  //   {
  //     key: 2,
  //     hName: 'Royal Hospital',
  //     address: '17 abdelqader basha st.',
  //     image: require('../../images/royalhospital.png'),
  //   },
  //   {
  //     key: 3,
  //     hName: 'Alex Hospital',
  //     address: '12 camp shizar st.',
  //     image: require('../../images/alexhospital.png'),
  //   },
  //   {
  //     key: 4,
  //     hName: 'ICC Hospital',
  //     address: '3 smouha st.',
  //     image: require('../../images/icchospital.png'),
  //   },
  //   {
  //     key: 5,
  //     hName: 'Alex Hospital',
  //     address: '6 camp shizar st.',
  //     image: require('../../images/alexhospital.png'),
  //   },
  //   {
  //     key: 6,
  //     hName: 'Alex Hospital',
  //     address: '5 camp shizar st.',
  //     image: require('../../images/alexhospital.png'),
  //   },
  //   {
  //     key: 7,
  //     hName: 'Alex Hospital',
  //     address: '5 camp shizar st.',
  //     image: require('../../images/andalusiahospital.png'),
  //   },
  //   {
  //     key: 8,
  //     hName: 'Al Andalusia Hospital',
  //     address: '15 el midan st. - smouha',
  //     image: require('../../images/andalusiahospital.png'),
  //   },
  //   {
  //     key: 9,
  //     hName: 'German Hospital',
  //     address: '6 gleem st.',
  //     image: require('../../images/andalusiahospital.png'),
  //   },
  // ];

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

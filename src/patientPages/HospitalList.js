import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import HospitalsCard from '../../utils/HospitalsCard';
import {SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Server_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function Hospitals({navigation,route}) {
  const {hospitalSeeMore, targetSearch} = route.params;
  const [allHospitals, setAllHospitals] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  const seeAllHospitals = async () => {
    if (hospitalSeeMore) {
      axios
        .get(`${Server_URL}:3000/patient/searchHospitals/${targetSearch}`)
        .then(response => {
          setAllHospitals(response.data);
        })
        .catch(function (error) {
          const err = error.response.data;
          if (err == 'No Hospitals with that name found') {
            setAllHospitals([]);
          }
        });
    } else {
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
    }
  };

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      seeAllHospitals();
    }
  }, []);

  const [search, setSearch] = useState('');
  const searchHospital = search => {
    axios
      .get(`${Server_URL}:3000/patient/searchHospitals/${search}`)
      .then(response => {
        setAllHospitals(response.data);
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'No Hospitals with that name found') {
          setAllHospitals([]);
        }
      });
  };

  const updateSearch = search => {
    setSearch(search);
    if (search.length > 0) {
      searchHospital(search);
    } else {
      setAllHospitals();
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{flex: 1, alignSelf: 'center', marginLeft: 5}}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#1c1bad"></Ionicons>
        </Pressable>
        {!hospitalSeeMore ? (
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
        data={allHospitals}
        keyExtractor={item => {
          return item.hospitalID;
        }}
        renderItem={({item}) => {
          return <HospitalsCard card={item} navigation={navigation} />;
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
              No hospitals found :(
            </Text>
          )
        }
      />
    </View>
  );
}

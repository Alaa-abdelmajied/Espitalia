import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Server_URL} from '@env';
import axios from 'axios';

export default function Search({navigation}) {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
    // generalSearch(search);
  };

  const [searchResult, setSearchResult] = useState([]);

  const generalSearch = search => {
    axios
      .get(`${Server_URL}:3000/patient/searchSpecialization/${search}`)
      .then(response => {
        setSearchResult(response.data);
        console.log(search);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme={true}
        placeholder="search for doctor, hospital or specialization"
        onChangeText={generalSearch}
        value={search}
        fontSize={15}
        containerStyle={{backgroundColor: '#f0f0f0'}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
      />
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.specializationCard}
              // onPress={() => onPress(item)}
            >
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

  formContent: {
    flexDirection: 'row',
    marginTop: 10,
  },

  header: {
    marginBottom: 5,
    height: '11%',
    backgroundColor: '#1c1bad',
  },

  Image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    // marginTop:10,
  },

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },

  iconBtnSearch: {
    alignSelf: 'center',
  },

  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },

  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },

  // notificationList: {
  //   marginTop: 0,
  //   padding: 0,
  // },

  specializationBox: {
    paddingTop: '2%',
    paddingBottom: '2%',
    // marginTop: 5,
    margin: '1%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
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

  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },

  speciality: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },

  search: {
    borderRadius: 20,
    height: 50,
  },
});

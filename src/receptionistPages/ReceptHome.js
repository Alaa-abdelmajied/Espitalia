import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';

export default function ContactsView({navigation, route}) {
  // const data = ["Dermatology (Skin)", "Dentistry (Teeth)", "Psychiatry (Mental-Emotional or Behavioral Disorders)", "Pediatrics and NewBorn (Child)", "Neurology (Brain & Nerves)"];
  const [specializations, setSpecializations] = useState([]);
  // const [dataChanged, setDataChanged] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSpecializations().then(setRefreshing(false));
  }, []);

  var token;
  const getSpecializations = async () => {
    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    // console.log("..",route.params);
    // console.log(token);
    console.log('Homepage:', Server_URL);
    console.log('fetching data...');
    axios
      .get(`${Server_URL}:3000/receptionist/GetSpecializations`, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(function (response) {
        setSpecializations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSpecializations();
  }, []);
  const specializationSearch = async search => {
    const token = JSON.parse(
      await EncryptedStorage.getItem(Token_Secret),
    ).token;
    // console.log(token);
    axios
      .get(`${Server_URL}:3000/receptionist/searchSpecializations/${search}`, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(response => {
        setSpecializations(response.data);
      })
      .catch(function (error) {
        const err = error.response.data;
        if (err == 'No specializations found') {
          setSpecializations([]);
        }
      });
  };
  const updateSearch = search => {
    console.log(search);
    if (search.length > 0) {
      specializationSearch(search);
    } else {
      getSpecializations();
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.formContent}> */}
      {/* <View style={styles.inputContainer}> */}
      {/* <TextInput
            style={styles.inputs}
            useref={'txtPassword'}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={value => updateSearch(value)}
          /> */}
      <TextInput
        placeholder="🔍Search"
        style={styles.input}
        onChangeText={value => updateSearch(value)}
      />
      {/* </View> */}
      {/* </View> */}

      <FlatList
        style={styles.notificationList}
        data={specializations}
        keyExtractor={item => {
          return item.toString();
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DoctorsListPage', {name: item})
              }>
              <View style={styles.notificationBox}>
                <Text style={styles.name}>{item}</Text>
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
    // backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 10,
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
  input: {
    height: 40,
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    fontSize: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    color: 'black',
    elevation: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    height: '100%',
    marginTop: 0,
    padding: 0,
  },
  notificationBox: {
    margin: 10,
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 4,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },
});

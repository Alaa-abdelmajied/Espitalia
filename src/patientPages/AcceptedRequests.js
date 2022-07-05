import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Server_URL, Token_Secret } from '@env';
import Item from '../../utils/ItemCard';
import { useIsFocused } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function AcceptedRequests({ navigation }) {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();


  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      getRequests();
    } else {
      setBloodRequests([]);
    }
  }, [isFocused]);

  const getRequests = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      await axios
        .get(`${Server_URL}:3000/patient/acceptedBloodRequests`, {
          headers: {
            'x-auth-token': token,
          },
        })
        .then(response => {
          setBloodRequests(response.data);
          setLoadData(false);
        })
        .catch(function (error) {
          console.log(error.message);
          setLoadData(false);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ flex: 1, alignSelf: 'center', marginLeft: 5 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={30} color="#fff"></Ionicons>
        </TouchableOpacity>
        <View
          style={{ flex: 12, flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            style={styles.image}
            source={require('../../images/app_logo-removebg-preview.png')}></Image>
          <Text style={styles.headerText}>espitalia</Text>
        </View>
      </View>
      <FlatList
        data={bloodRequests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item item={item} />}
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
              No blood requests accepted :)
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
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },

  appointmentsCard: {
    flexDirection: 'column',
    width: '95%',
    height: 230,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    overflow: 'hidden',
  },

  infoView: {
    flex: 1,
    flexDirection: 'column',
    height: '90%',
    alignSelf: 'center',
    // backgroundColor: '#fff',
    // marginTop:'2%',
    // marginBottom: '5%',
    justifyContent: 'center',
    margin: '1%',
  },
  infoText: {
    color: '#000',
    margin: 10,
    fontSize: 15,
  },

  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  },
  buttonText: {
    color: '#fff',
    margin: 15,
    fontSize: 15,
  },

  button: {
    backgroundColor: '#0d259e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 160,
    color: '#fff',
  },

  // modal: {
  //   height: 350,
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 15,
  //   width: '80%',
  //   marginTop: '30%',
  //   // margin: 300,
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   shadowColor: '#1c1bad',
  //   shadowOpacity: 1,
  //   shadowOffset: {
  //     width: 10,
  //     height: 15,
  //   },
  //   elevation: 10,
  //   overflow: 'hidden',
  //   padding: 5,
  // },

  // modalButton: {
  //   backgroundColor: '#1c1bad',
  //   borderRadius: 5,
  //   width: 150,
  //   height: 50,
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   // marginBottom: 20,
  // },

  // modalInput: {
  //   height: '50%',
  //   width: '95%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   borderRadius: 15,
  // },

  // modalText: {
  //   fontSize: 15,
  //   color: '#fff',
  //   textAlign: 'center',
  // },
});

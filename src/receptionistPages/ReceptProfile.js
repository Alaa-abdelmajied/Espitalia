import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Animated,
  Alert,
  BackHandler,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

export default function UserProfileView({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [myData, setMyData] = useState({});
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPersonalData().then(setRefreshing(false));
  }, []);

  var token;
  const getPersonalData = async () => {
    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    console.log('Profile:', Server_URL);
    axios
      .get(`${Server_URL}:3000/receptionist/getMyData`, {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(function (response) {
        setMyData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  const onPressLogout = async () => {
    try {
      await EncryptedStorage.removeItem(Token_Secret);
      await EncryptedStorage.removeItem(Credintials_Secret);
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomePage' }],
      });
    } catch (err) {
      Alert.alert('Error', err.message, [
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
    }
  };

  return (
    <ScrollView
      // style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={{
              margin: 5,
              alignSelf: 'flex-end',
              backgroundColor: '#fff',
              padding: 10,
              position: 'absolute',
              right: 10,
              top: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#e2372a',
            }}
            onPress={onPressLogout}>
            <Text style={{ fontSize: 15, color: '#e2372a', fontWeight: 'bold' }}>
              Logout
            </Text>
          </TouchableOpacity>
          <View>
            <Image
              style={[styles.avatar]}
              // source={require('../../images/Recept_black.png')}
              source={require('../../images/Recept_black.png')}
            />
          </View>

          <Text style={styles.name}>{myData.name}</Text>
          {/* <Text style={styles.userInfo}> Receptionist at : Icc Hospital</Text> */}
        </View>
      </View>
      {/* <View style={styles.body}> */}
      <View style={styles.card}>
        <Text style={styles.title}>Personal Information</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            justifyContent: 'center',
          }}>
          <Ionicons name={'mail'} size={20} color={'#000'}></Ionicons>
          <Text style={styles.mainText}> {myData.email}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            justifyContent: 'center',
          }}>
          <FontAwesome name={'phone'} size={20} color={'#000'}></FontAwesome>
          <Text style={styles.mainText}>{myData.phoneNumber}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            justifyContent: 'center',
          }}>
          <Ionicons name={'key'} size={20} color={'#000'}></Ionicons>
          <Pressable
            onPress={() => {
              navigation.navigate('ChangePassword', {
                profileChangePassword: true,
                type: 'receptionist'
              });
            }}>
            <Text
              style={
                [styles.mainText,
                { textDecorationLine: 'underline' }]
              }>
              Change Password
            </Text>
          </Pressable>
        </View>
        <Text style={styles.mainText}> - Work hours: { }</Text>
        <View style={{marginBottom: 1000, height: 200}}>
          {myData._id
            ? myData.workingDays.map((card, cardIndex) => {
              return (
                <View
                  key={cardIndex.toString()}
                  style={{
                    margin: 5,
                    flexDirection: 'row',
                    borderRadius: 25,
                    justifyContent: 'space-evenly',
                    padding: 10,
                    elevation: 3,
                  }}>
                  <Text style={{ color: '#000', fontSize: 20 }}>
                    Day: {card.day}
                  </Text>
                  <Text style={{ color: '#000', fontSize: 20 }}>
                    From: {card.from}
                  </Text>
                  <Text style={{ color: '#000', fontSize: 20 }}>
                    To: {card.to}
                  </Text>
                </View>
              );
            })
            : null}
        </View>
        {/* <View style={{ height:100 }}><Text>yudtyfv</Text></View> */}
      </View>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  header: {
    backgroundColor: '#1c1bad',
    height: 250,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '900',
  },
  userInfo: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 500,
  },
  item: {
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  mainText: {
    margin: 3,
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    color: '#000000',
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#000000',
  },

  card: {
    // backgroundColor: "#f2f2f5",
    borderRadius: 10,
    padding: 10,
    height: 450,
    marginTop: 10,
    marginBottom: 80,
  },
  cardTittle: {
    color: '#000000',
    fontSize: 22,
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 18,
    color: '#000000',
    margin: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 150,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1c1bad',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
});

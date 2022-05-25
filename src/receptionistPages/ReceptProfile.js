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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';

export default function UserProfileView() {
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
          'x-auth-token': token
        }
      })
      .then(function (response) {
        setMyData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  useEffect(() => {
    getPersonalData();
  }, []);

  return (
    <ScrollView
      // style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar}
            source={require('../../images/Recept_black.png')} />

          <Text style={styles.name}>{myData.name}</Text>
          {/* <Text style={styles.userInfo}> Receptionist at : Icc Hospital</Text> */}
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Profile Information</Text>
          {/* <Text style={styles.cardInfo}> - Karim Ahmed Saleh</Text> */}
          {/* <Text style={styles.cardInfo}> - Graduated from: ..................</Text> */}
          <Text style={styles.cardInfo}> - Phone:    {myData.phoneNumber}</Text>
          <Text style={styles.cardInfo}> - Email:      {myData.email}</Text>
          {/* <Text style={styles.cardInfo}> - From: Alexandria , Egypt</Text> */}
          <Text style={styles.cardInfo}> - Work hours: { }</Text>
          {myData._id ? myData.workingDays.map((card, cardIndex) => {
            return (
              <Animated.View
                key={cardIndex.toString()}
                style={{ margin: 5, flexDirection: 'row', borderRadius: 25, justifyContent: 'space-evenly', padding: 10, elevation: 3 }}
              >
                <Text style={{ color: '#000', fontSize: 20 }}>
                  Day: {card.day}
                </Text>
                <Text style={{ color: '#000', fontSize: 20 }}>
                  From: {card.from}
                </Text>
                <Text style={{ color: '#000', fontSize: 20 }}>
                  To: {card.to}
                </Text>
              </Animated.View>
            );
          }) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70
  },
  header: {
    backgroundColor: "#003da5",
    height: 250
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    // borderWidth: 4,
    padding: 10,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: '900',
  },
  userInfo: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: '600',
  },
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: 500,

  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    color: "#000000"
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
    color: "#000000",
  },

  card: {
    backgroundColor: "#f2f2f5",
    borderRadius: 10,
    padding: 10,
    height: 450,
    marginTop: 10,
  },
  cardTittle: {
    color: "#000000",
    fontSize: 22,
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 18,
    color: "#000000",
    margin: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 150,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#003da5",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff"

  }
});

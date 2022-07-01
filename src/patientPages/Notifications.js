import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  SectionList,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import Dialog from 'react-native-dialog';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';
import {useIsFocused} from '@react-navigation/native';

export default function Notification({navigation}) {
  const [notifications, setNotifications] = useState([]);
  const [skipNumber, setSkipNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  const getNotifications = async () => {
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      await axios
        .get(`${Server_URL}:3000/patient/getNotification`, {
          headers: {
            'x-auth-token': token,
          },
        })
        .then(response => {
          setNotifications(response.data);
          setRefreshing(false);
          setLoadData(false);
        })
        .catch(function (error) {
          console.log(error.message);
          setRefreshing(false);
          setLoadData(false);
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      getNotifications();
    } else {
      setNotifications([]);
      setRefreshing(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && refreshing) {
      getNotifications();
    }
  }, [refreshing]);

  const onRefreshing = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        onRefresh={onRefreshing}
        refreshing={refreshing}
        ListEmptyComponent={
          loadData ? (
            <View>
              <ActivityIndicator size="large" color="#0451cc" />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                margin: 20,
              }}>
              No notifications
            </Text>
          )
        }
        renderItem={({item}) => (
          <TouchableOpacity style={styles.notificationsCard}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
              }}>
              <Text
                style={{color: '#1c1bad', fontSize: 17, textAlign: 'center'}}>
                {item.title}
              </Text>
              <Text style={{color: '#000', fontSize: 13, textAlign: 'center'}}>
                {/* {new Date(item.date).toLocaleDateString() +
                  ' ' +
                  new Date(item.date).toLocaleTimeString()} */}
                {new Date(item.date).toLocaleString()}
              </Text>
            </View>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', fontSize: 17, textAlign: 'center'}}>
                {item.body}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    // padding: 15,
    // backgroundColor: 'white',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  notificationsCard: {
    // alignItems: 'center',
    // marginTop: 5,
    paddingTop: 9,
    paddingBottom: 9,
    margin: 4,
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

  textContainer: {
    height: 100,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    width: '98%',
    borderRadius: 15,
    // backgroundColor: '#ff0f',
  },
});

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Server_URL, Token_Secret} from '@env';
import Item from '../../utils/ItemCard';
import {useIsFocused} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function DonateBlood({navigation}) {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [skipNumber, setSkipNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <FlatList
        data={bloodRequests}
        keyExtractor={item => {
          return item.id;
        }}
        // onRefresh={onRefreshing}
        refreshing={refreshing}
        // onEndReached={onEndReachedHandler}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => <Item item={item} />}
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
  header: {
    height: '8%',
    backgroundColor: '#1c1bad',
    justifyContent: 'center',
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

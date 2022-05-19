import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import { Server_URL } from '@env';
import Item from '../../utils/ItemCard';


export default function DonateBlood({ navigation }) {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [skipNumber, setSkipNumber] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted && !refreshing) {
      console.log("load use effect");
      getRequests(skipNumber);
    }
  }, [skipNumber]);

  useEffect(() => {
    if (isMounted && refreshing) {
      console.log("refresh use effect");
      getRequests(0);
    }
  }, [refreshing]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    }
  }, []);

  const getRequests = async (skipNumber) => {
    console.log("skip Number:", skipNumber);
    await axios
      .get(`${Server_URL}:3000/patient/getBloodRequests/${skipNumber}`)
      .then((response) => {
        if (loadMore) {
          setBloodRequests(bloodRequests => [...bloodRequests, ...response.data]);
          setLoadMore(false);
        } else if (refreshing) {
          setBloodRequests(response.data);
          setRefreshing(false);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const checkForUpdates = async () => {
    await axios
      .get(`${Server_URL}:3000/patient/isBloodReqUpdated/${currentDate}`)
      .then((response) => {
        setCurrentDate(new Date());
        setSkipNumber(response.data.newEntries + bloodRequests.length);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const onEndReachedHandler = () => {
    setLoadMore(true);
    checkForUpdates();
    console.log(currentDate);
  }

  const onRefreshing = () => {
    setCurrentDate(new Date());
    setRefreshing(true);
    setSkipNumber(0);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bloodRequests}
        keyExtractor={item => {
          return item.id;
        }}
        onRefresh={onRefreshing}
        refreshing={refreshing}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={0.35}
        renderItem={({ item }) => (
          <Item
            item={item}
          />
        )}
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
});

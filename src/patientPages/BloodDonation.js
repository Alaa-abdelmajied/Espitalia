import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Server_URL } from '@env';
import Item from '../../utils/ItemCard';
import { useIsFocused } from '@react-navigation/native';


export default function DonateBlood({ navigation }) {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [skipNumber, setSkipNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const isFocused = useIsFocused();

  //first time the page is opened 
  //and when the page is closed
  useEffect(() => {
    setLoadData(true);
    if (isFocused) {
      getRequests(skipNumber);
    } else {
      setSkipNumber(0);
      setBloodRequests([]);
      setRefreshing(false);
    }
  }, [isFocused]);

  //load more when bottom is reached
  useEffect(() => {
    if (isFocused) {
      getRequests(skipNumber);
    }
  }, [skipNumber]);

  //refreshing
  useEffect(() => {
    if (isFocused && refreshing) {
      getRequests(0);
    }
  }, [refreshing])

  const getRequests = async (skipNumber) => {
    console.log("skip Number:", skipNumber);
    await axios
      .get(`${Server_URL}:3000/patient/getBloodRequests/${skipNumber}`)
      .then((response) => {
        if (skipNumber == 0) {
          setBloodRequests(response.data);
        } else {
          setBloodRequests(bloodRequests => [...bloodRequests, ...response.data]);
        }
        setRefreshing(false);
        setLoadData(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setRefreshing(false);
        setLoadData(false);
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
    // setLoadMore(true);
    checkForUpdates();
    console.log(currentDate);
  }

  const onRefreshing = () => {
    setCurrentDate(new Date());
    setRefreshing(true);
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
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <Item
            item={item}
          />
        )}
        ListEmptyComponent={
          loadData ? <View>
            <ActivityIndicator size="large" color="#0451cc" />
          </View> :
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: '#000',
                margin: '10%',
              }}>
              No blood donation requests :)
            </Text>
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
});

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  RefreshControl,
  Animated,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';


import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Server_URL, Token_Secret, Credintials_Secret } from '@env';
import { useEffect } from 'react';

export default function EventsView() {
  const [bloodRequests, setBloodRequests] = useState([{}]);
  const [oldBloodRequests, setOldBloodRequests] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBloodRequests().then(getOldBloodRequests().then(setRefreshing(false)));
  }, []);

  var token;

  const getBloodRequests = async () => {
    console.log(Server_URL);
    console.log('getting reqs.');

    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    axios({
      method: 'get',
      url: `${Server_URL}:3000/receptionist/getBloodRequests`,
      headers: {
        'x-auth-token': token
      }
    })
      .then(function (response) {
        // console.log(response.data);
        setBloodRequests(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getBloodRequests();
    getOldBloodRequests();
  }, []);

  const getOldBloodRequests = async () => {
    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    axios({
      method: 'get',
      url: `${Server_URL}:3000/receptionist/getOldBloodRequests`,
      headers: {
        'x-auth-token': token
      }
    })
      .then(function (response) {
        // console.log(response.data);
        setOldBloodRequests(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const finalizeRequest = async (id) => {
    //TODO: remove from bloodRequests and add to oldBloodRequests
    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    console.log(id);
    axios({
      method: 'put',
      url: `${Server_URL}:3000/receptionist/finalizeBloodRequest`,
      headers: {
        'x-auth-token': token
      },
      data: {
        id: id
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteRequest = async (id) => {
    token = JSON.parse(await EncryptedStorage.getItem(Token_Secret)).token;
    console.log(id);
    axios({
      method: 'delete',
      url: `${Server_URL}:3000/receptionist/DropBloodRequest`,
      headers: {
        'x-auth-token': token
      },
      data: {
        id: id
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  return (
    <ScrollView style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginRight: 10 }}>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Icon style={styles.addButton} name='plus' />
          <Text style={{ fontSize: 18, color: '#fff', marginLeft: 10 }}>Make Blood Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Blood Requests</Text>
        {bloodRequests.length != 0 ? bloodRequests.map((item, index) => {
          return (
            <View style={styles.doctorCard} key={index}>
              <View style={[styles.doctorView, { flexDirection: "column" }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <View>
                    <Text style={styles.doctorText}>{item.date}</Text>
                    <Text style={styles.doctorText}>{item.bloodType}</Text>


                  </View>
                  <View style={{ marginRight: 5 }}>
                    {item.PatientIDs != null ? <Text style={{ fontSize: 25 }}>{item.PatientIDs.length}</Text> : null}
                  </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      finalizeRequest(item._id);
                      getBloodRequests();
                      getOldBloodRequests();
                    }
                    }
                  >
                    <Icon style={styles.newDay} name='check-square-o' />
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose, { backgroundColor: "#f00" }]}
                    onPress={() => {
                      deleteRequest(item._id);
                      getBloodRequests();
                      getOldBloodRequests();
                    }}
                  >
                    <Icon style={styles.newDay} name='trash' />
                  </Pressable>
                </View>

              </View>
            </View>
          )
        }) : null}
        <Text style={{ fontSize: 25 }}>Old Blood Requests</Text>
        {oldBloodRequests.map((item, index) => {
          return (
            <View style={styles.doctorCard} key={index}>
              <View style={[styles.doctorView, { flexDirection: "column" }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <View>
                    <Text style={styles.doctorText}>{item.date}</Text>
                    <Text style={styles.doctorText}>{item.bloodType}</Text>


                  </View>
                  <View style={{ marginRight: 5 }}>
                    {item.PatientIDs != null ? <Text style={{ fontSize: 25 }}>{item.PatientIDs.length}</Text> : null}
                  </View>

                </View>
              </View>
            </View>
          )
        })}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
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
  touchableOpacity: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    // width: 'auto',
    height: 50,
    borderRadius: 100,
    // right: 40,
    // top: 40,
    elevation: 10,

  },
  addButton: {
    fontSize: 30,
    color: 'white',
  },
  doctorCard: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'gray',
    margin: 5,
    marginBottom: 10,
    elevation: 5,
  },
  doctorView: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  doctorText: {
    fontSize: 15,
    color: 'black'
  },
  icon: {
    color: 'black',
    fontSize: 30,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  newDay: {
    fontSize: 20,
    color: 'white',

  }
});

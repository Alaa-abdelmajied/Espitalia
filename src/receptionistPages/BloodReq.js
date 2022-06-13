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
  RefreshControl,
  Animated,
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

const data = [
  { id: 1, day: 1, month: 'Aug' },
  { id: 2, day: 2, month: 'Sep' },
  { id: 3, day: 3, month: 'Sep' },
  { id: 4, day: 4, month: 'Sep' },
  { id: 5, day: 5, month: 'Sep' },
  { id: 6, day: 6, month: 'Sep' },
  { id: 7, day: 7, month: 'Sep' },
  { id: 8, day: 8, month: 'Sep' },
  { id: 9, day: 9, month: 'Sep' },
];


export default function EventsView() {
  const [bloodRequests, setBloodRequests] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBloodRequests().then(setRefreshing(false));
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
  }, []);

  const finalizeRequest = async (id) => {
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
        // console.log(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <View style={styles.modalTitle}>
              <Text style={styles.text}>Enter</Text>
            </View>
            <View style={styles.modalBody}>
              {/* beaker and calender */}
              <TextInput style={styles.inputFeilds}
                placeholder='Comments'></TextInput>
            </View>

            <View style={styles.modalButton}>
              <Button title='Save' onPress={() => setShowModal(false)}></Button>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ alignItems: 'flex-end', paddingTop: 20, paddingRight: 20 }}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'grey' : 'blue',
            }, styles.addButton
          ]}
          onPress={() => setShowModal(true)}>
          <Icon5 style={styles.newDay} name='plus' />
        </Pressable>
      </View>


      {bloodRequests.length != 0 ? bloodRequests.map((item, cardIndex) => {
        return (
          <View >
            <View style={styles.eventBox}>
              <View style={styles.eventContent}>
                <Text style={styles.userName}>Request Donation</Text>
                <Text style={styles.description}>Date: {item.date}</Text>
                <Text style={styles.description}>Blood type :{item.bloodType}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    disabled={!item.isVisible}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? 'grey' : 'blue',
                      }, styles.addButton, styles.button, styles.buttonClose
                    ]}
                    onPress={() => {
                      finalizeRequest(item._id);
                    }
                    }
                  >
                    <Icon style={styles.newDay} name='check' />
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose, { backgroundColor: "#f00" }]}
                    onPress={() => {

                    }}
                  >
                    <Icon style={styles.newDay} name='close' />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        );
      }) : <Text>Not Found</Text>}
      {/* <FlatList
        // enableEmptySections={true}
        style={styles.eventList}
        data={bloodRequests}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item) => {
          return item._id;
        }}
        renderItem={({ item }) => {
          return (
            <View visible={item.isVisible}>
              <View style={styles.eventBox}>
                <View style={styles.eventContent}>
                  <Text style={styles.userName}>Request Donation</Text>
                  <Text style={styles.description}>Date: {item.date}</Text>
                  <Text style={styles.description}>Blood type :{item.bloodType}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Pressable
                      disabled={!item.isVisible}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'grey' : 'blue',
                        }, styles.addButton, styles.button, styles.buttonClose
                      ]}
                      onPress={() => {
                        finalizeRequest(item._id);
                      }
                      }
                    >
                      <Icon style={styles.newDay} name='check' />
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose, { backgroundColor: "#f00" }]}
                      onPress={() => {

                      }}
                    >
                      <Icon style={styles.newDay} name='close' />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )
        }} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
    marginBottom: 60,
  },
  eventList: {
    marginTop: 20,
  },
  eventBox: {
    padding: 10,
    paddingTop: 0,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  eventDate: {
    flexDirection: 'column',
  },
  eventDay: {
    fontSize: 50,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventMonth: {
    fontSize: 16,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  eventTime: {
    fontSize: 18,
    color: "#151515",
  },
  userName: {
    fontSize: 16,
    color: "#151515",
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  modalTitle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalBody: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFeilds: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 50,
    color: 'white',
    //fontWeight:600,
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
    fontSize: 25,
    color: 'white',
  },
  addButton: {
    backgroundColor: '#1c1bad',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 10,
  },
});

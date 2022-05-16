import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret} from '@env';

export default function Profile({navigation}) {
  const [personalData, setPersonalData] = useState('');
  const [oldAppointments, setOldAppointments] = useState([]);

  useEffect(() => {
    const getPersonalData = async () => {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        console.log(token);
        await axios
          .get(`${Server_URL}:3000/patient/getPatient/${token}`)
          .then(response => {
            setPersonalData(response.data);
            console.log(response.data.name);
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } catch (err) {
        Alert.alert('Error', err.code, [
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
      }
    };
    getPersonalData();
  }, []);

  useEffect(() => {
    const getOldAppointments = async () => {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        await axios
          .get(`${Server_URL}:3000/patient/oldAppointment/${token}`)
          .then(response => setOldAppointments(response.data))
          .catch(function (error) {
            console.log(error.message);
          });
      } catch (err) {
        Alert.alert('Error', err.code, [
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
      }
    };
    getOldAppointments();
  }, []);

  const onPressReport = id => {
    navigation.navigate('Report', {
      appointmentID: id,
    });
  };

  const onPressLogout = async () => {
    console.log('I got clicked :)');
    try {
      const token = JSON.parse(
        await EncryptedStorage.getItem(Token_Secret),
      ).token;
      axios
        .post(`${Server_URL}:3000/patient/logout`, {
          token: token,
        })
        .then(async function (response) {
          try {
            await EncryptedStorage.removeItem(Token_Secret);
            navigation.reset({
              index: 0,
              routes: [{name: 'WelcomePage'}],
            });
          } catch (err) {
            Alert.alert('Error', err.code, [
              {text: 'Exit', onPress: () => BackHandler.exitApp()},
            ]);
          }
        })
        .catch(function (error) {
          const err = error.response.data;
          //alert err.msg
        });
    } catch (err) {
      Alert.alert('Error', err.code, [
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  onPressEdit = () => {
    navigation.navigate('EditProfile', {
      name: personalData.name,
      email: personalData.email,
      age: personalData.age,
      phoneNumber: personalData.phoneNumber,
    });
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.logoutModal}>
          <FontAwesome
            name={'close'}
            size={20}
            color={'#fff'}
            onPress={() => setShowModal(false)}></FontAwesome>
          <Pressable onPress={onPressLogout}>
            <Text style={{fontSize: 15, color: '#fff'}}>Logout</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('ChangePassword', {
                profileChangePassword: true,
              }),
                setShowModal(false);
            }}>
            <Text style={{fontSize: 15, color: '#fff'}}>Change Password</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
      />
      <View
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15}}>
        <TouchableOpacity style={{margin: 5}} onPress={onPressLogout}>
          {/* <Text>Logout</Text> */}
          <Ionicons
            name="ellipsis-vertical"
            size={30}
            color="#fff"
            onPress={() => setShowModal(true)}></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{personalData.name}</Text>
          <Text style={styles.subtitle}>BASIC DATA</Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={onPressEdit}>
            <FontAwesome name="edit" size={25} color="#000"></FontAwesome>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                alignSelf: 'center',
                marginHorizontal: 5,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <View style={styles.description}>
            <Text style={styles.mainText}>Email: {personalData.email}</Text>
            <Text style={styles.mainText}>
              Phone number: {personalData.phoneNumber}
            </Text>
            <Text style={styles.mainText}>Age: 22</Text>
            <Text style={styles.mainText}>Blood Type: A+</Text>
            <Text style={styles.mainText}>Diabetic: No</Text>
            <Text style={styles.mainText}>Diabetic: No</Text>
            <Text style={styles.mainText}>Blood Pressure Problems: No</Text>
          </View>
          <View style={styles.lineStyle} />
          <Text style={styles.subtitle}>OLD RESERVATIONS</Text>
          {oldAppointments.map(item => {
            return (
              <TouchableOpacity
                style={styles.appointmentsCard}
                key={item.appointmentID}
                onPress={() => onPressReport(item.appointmentID)}>
                <Text style={styles.infoText}>
                  Hospital Name: {item.hospitalName}
                </Text>
                <Text style={styles.infoText}>Doctor Name: {item.drName} </Text>
                <Text style={styles.infoText}>
                  Specialization: {item.specialization}
                </Text>
                <Text style={styles.infoText}>Date: {item.date} </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1c1bad',
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 40,
  },
  mainText: {
    margin: 3,
    color: '#000',
    fontSize: 18,
  },

  name: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#1c1bad',
    margin: 5,
    // marginTop: 10,
    // marginBottom: 5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    //marginTop:10,
    // marginRight: 200,
    // textAlign: 'center',
    alignContent: 'center',
    // alignItems: 'flex-start'
  },
  lineStyle: {
    width: 300,
    borderWidth: 0.5,
    borderColor: '#000',
    margin: '2%',
    backgroundColor: '#000',
  },

  appointmentsCard: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'flex-start',
    // marginBottom: 10,
    width: '95%',
    height: 230,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignSelf: 'center',
    // marginLeft: 10,
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    overflow: 'hidden',
    // margin: '2%'
  },

  infoView: {
    flex: 1,
    flexDirection: 'column',
    height: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // marginTop:'2%',
    // marginBottom: '5%',
    justifyContent: 'center',
    margin: '1%',
    // borderRadius: 5,
  },
  infoText: {
    color: '#000',
    margin: 10,
    fontSize: 15,
  },

  logoutModal: {
    height: 130,
    backgroundColor: '#1c1bad',
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor: '#fff',
    width: 135,
    margin: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 10,
  },
});

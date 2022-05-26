import React, {useState, useEffect} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Server_URL, Token_Secret, Credintials_Secret} from '@env';
// import NestedListView, { NestedRow } from 'react-native-nested-listview';



export default function UpcomingReservations() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const getUpcomingAppointments = async () => {
      try {
        const token = JSON.parse(
          await EncryptedStorage.getItem(Token_Secret),
        ).token;
        await axios
          .get(`${Server_URL}:3000/doctor/doctorUpcomingAppointments`, {
            headers: {
              'x-auth-token': token,
            },
          })
          .then(response => {
            setUpcomingAppointments(response.data);
            console.log(response.data);
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
    getUpcomingAppointments();
  }, []);

  const [activeSections, setActiveSections] = useState([]);

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
        flexDirection="row">
        {/* <Text style={{color: '#000', fontSize: 18}}>Date: </Text> */}
        <Text style={styles.headerText}>
          {section.date} ( {section.from}-{section.to} )
        </Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        {section.patients.map(name => (
          <Text style={{color: '#000', fontSize: 15}}>{name}</Text>
        ))}
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_}>
        <Image
          style={styles.Image}
          source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <ScrollView>
        <Pressable onPress={() => console.log(patients)}>
          <Text>press me</Text>
        </Pressable>
        <Text style={styles.title}>Upcoming appointments</Text>
        <Accordion
          activeSections={activeSections}
          sections={upcomingAppointments}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
          renderAsFlatList={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header_: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center',
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    // marginTop:10,
  },
  pageHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    backgroundColor: '#00ffff',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    margin: 10,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    //textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#0d159e',
  },
  content: {
    padding: 20,
    backgroundColor: '#f0f',
  },
  active: {
    backgroundColor: '#F5FCFF',

    // backgroundColor: 'rgba(100,255,255,1)',
  },
  inactive: {
    backgroundColor: '#fff',

    // backgroundColor: 'rgba(245,252,255,1)',
  },
});

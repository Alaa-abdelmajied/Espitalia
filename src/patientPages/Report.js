import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';


export default function Report({ navigation }) {

  const [details, setDetails] = useState(
    {
      specialization: 'ramad', doctor: 'ahmed', hospital: "anbatakla", date: "5/8/2000",
      diagnosis: "hiihbdjfksshvdbmsvcn SNC nbsssss,nbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsssssnbsnbsssssnbsssssnbsssssvssssnbsssssnbsssssnbsssssnbsssssvs hbjfvjvgmgcgnfcxgfxfbzfdxf jgvchc bm hbjhnvnkvjmjghcjfthxrsytstyjhbjkslrbgkalhbgklebgjklbrgjwlllrkkjjtklgvngcxfgjd dfadbdf",
      prescription: "jhbjhvfbajkvjvrjekager abhgjbvfv wefvejgbelkgwefvejgbelkgbwefvejgbelkgbwefvejgbelkgbwefvejgbelkgbwefvejgbelkgbwefvejgbelkgbwefvejgbelkgbwefvejgbelkgbb,dgblsgbdsmgb.mdbg,mdb"
    }
  )


  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.Image} source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.infoText}>Doctor Name: {details.doctor} </Text>
        <Text style={styles.infoText}> Hospital Name: {details.hospital} </Text>
        <Text style={styles.infoText}>Specialization : {details.specialization} </Text>
        <Text style={styles.infoText}>date : {details.date} </Text>
      </View>
      <View style={styles.lineStyle} />
      <Text style={styles.title}>Diagnosis </Text>
      <View style={styles.appointmentsCard}>
        <ScrollView>
          <Text style={styles.infoText}>{details.diagnosis} </Text>
        </ScrollView>
      </View>
      <Text style={styles.title}>Prescription </Text>
      <View style={styles.appointmentsCard}>
        <ScrollView>
          <Text style={styles.infoText}>{details.prescription} </Text>
        </ScrollView>
      </View>
    </View>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  appointmentsCard: {
    flexDirection: 'column',
    width: '95%',
    height: 180,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignSelf: 'center',
    margin: '1.5%',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    overflow: 'hidden',
  },

  title: {
    fontSize: 20,
    color: "#0d259e",
    marginLeft: '3%',
    fontWeight: 'bold'

  },

  infoText: {
    color: '#000',
    margin: 10,
    fontSize: 15,
  },

  header: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center'
  },
  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },

  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#000',
    margin: '2%',
    backgroundColor: '#000'
  },

})

import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';


export default function notification({ navigation }) {

    const [details, setDetails] = useState(
        { specialization: 'ramad', doctor: 'ahmed', hospital: "anbatakla",date:"5/8/2000",
        diagnosis:"hiihbdjfksshvdbmsvcn SNC nbsssss,s hbjfvjvgmgcgnfcxgfxfbzfdxf jgvchc bm hbjhnvnkvjmjghcjfthxrsytstyjhbjkslrbgkalhbgklebgjklbrgjwlllrkkjjtklgvngcxfgjd dfadbdf",
         prescription:"jhbjhvfbajkvjvrjekager abhgjbvfv wefvejgbelkgb,dgblsgbdsmgb.mdbg,mdb"}
        )


    return(
        
    <View>
         <View style={{alignItems:'center'}}>
              <Text style={styles.infoText}>Doctor Name: {details.doctor} </Text>
              <Text style={styles.infoText}> Hospital Name: {details.hospital} </Text>
              <Text style={styles.infoText}>Specialization : {details.specialization} </Text>
              <Text style={styles.infoText}>date : {details.date} </Text>
          </View>
          <View style={styles.appointmentsCard}>
            <Text style={styles.infoText}>Diagnosis </Text>
            <Text style={styles.infoText}>{details.diagnosis} </Text>
          
          </View>
          <View style={styles.appointmentsCard}>
          <Text style={styles.infoText}>Prescription </Text>
            <Text style={styles.infoText}>{details.prescription} </Text>
          </View>
     </View>
         
        
    
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
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
      elevation: 5,
      overflow: 'hidden',
    },
  
  
    infoView: {
      flex: 1,
      flexDirection: 'column',
      height: '90%',
      alignSelf: 'center',
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
      backgroundColor: '#0d159e',
      justifyContent: 'center'
    },
  
    
  })
  
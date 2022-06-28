import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';



export default function NotificationsView() {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
    // height: 700,
  },
  
  // notificationBox: {
  //   padding: 10,
  //   marginTop: 5,
  //   marginBottom: 5,
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   borderRadius: 5,
  // },

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
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    flex:2,
    fontSize: 18,
    color: '#3498db',
    margin: 5,
    // marginLeft: 10,
  },
});

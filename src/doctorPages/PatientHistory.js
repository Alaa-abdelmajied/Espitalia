import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  SectionList,
  Image
} from 'react-native';

export default function PatientHistory() {

  const DATA = [
    {
      title: 'Title 1',
      data: ['Doctor details', 'Report', 'Prescription'],
    },
    {
      title: 'Title 2',
      data: ['Doctor details', 'Report', 'Prescription'],
    },
    {
      title: 'Title 3',
      data: ['Doctor details', 'Report', 'Prescription'],
    },
    {
      title: 'Title 4',
      data: ['Doctor details', 'Report', 'Prescription'],
    },
  ]
  // const [Refreshing, setRefreshing] = useState(false);

  // const onRefresh = () => {
  //     setRefreshing(true);
  //     setRefreshing(false);
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header_}>
        <Image style={styles.Image} source={require('../../images/app_logo-removebg-preview.png')}></Image>
      </View>
      <SectionList
        keyExtractor={(item, index) => index.toString()}
        sections={DATA}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item}</Text>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{section.title}</Text>
          </View>
        )}

      // refreshControl={
      //     <RefreshControl
      //         refreshing={Refreshing}
      //         onRefresh={onRefresh}
      //         colors={['#ff00ff']}
      //     />
      // }
      />
    </View>

  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  header_: {
    height: '8%',
    backgroundColor: '#0d159e',
    justifyContent: 'center'
  },

  Image: {
    width: 50,
    height: 50,
    alignSelf: 'center'
    // marginTop:10,
  },
  item: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#0d159e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 25,
    // fontStyle: 'italic',
    margin: 10,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    // fontStyle: 'italic',
    margin: 10,
  },
});
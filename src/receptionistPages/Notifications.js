import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

const data = [
  { id: 1, description: "Aly accepted your first blood request.AB+ at Andalusia Hospital." },
  { id: 2, description: "Myriam ignored your first blood request.AB+ at Andalusia Hospital." },
  { id: 3, description: "Carlie accepted your second blood request.A+ at Andalusia Hospital." },
  // {id:4, description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
  // {id:5, description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
  // {id:6, description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
  // {id:7, description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"},
  // {id:8, description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"},
  // {id:9, description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"},
]

export default function NotificationsView() {

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.notificationList}
        enableEmptySections={true}
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.notificationBox}>
              <Image style={styles.icon}
                source={{ uri: 'https://img.icons8.com/clouds/100/000000/groups.png' }} />

              <Text style={styles.description}>{item.description}</Text>
            </View>
          )
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC'
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
    height: 700,
  },
  notificationBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 5,
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10,
  },
});

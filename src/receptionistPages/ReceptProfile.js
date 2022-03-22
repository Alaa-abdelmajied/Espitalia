import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
} from 'react-native';

export default function UserProfileView() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

          <Text style={styles.name}>Karim Ahmed </Text>
          <Text style={styles.userInfo}> Receptionist at : Icc Hospital</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTittle}>Profile Information</Text>
          <Text style={styles.cardInfo}> - Karim Ahmed Saleh</Text>
          <Text style={styles.cardInfo}> - Graduated from: ..................</Text>
          <Text style={styles.cardInfo}> - Phone numebr: .................</Text>
          <Text style={styles.cardInfo}> - From: Alexandria , Egypt</Text>
          <Text style={styles.cardInfo}> - Work hours: 8am ... 6pm</Text>
          <Text style={styles.cardInfo}> - Email: karimahmed@gamil.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003da5",
    height: 250
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: '900',
  },
  userInfo: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#ffffff",
    height: 500,

  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    color: "#000000"
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#000000",
  },

  card: {
    backgroundColor: "#f2f2f5",
    borderRadius: 10,
    padding: 10,
    height: 450,
    marginTop: 10,
  },
  cardTittle: {
    color: "#000000",
    fontSize: 22,
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 18,
    color: "#000000",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 150,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#003da5",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff"

  }
});

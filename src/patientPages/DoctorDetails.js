import React, { useRef } from "react";
import { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const appointments = [
  { key: 1, date: 'Thurs. 9/3/2022', from: '14:00', to: '16:00', color: "#0d259e" },
  { key: 2, date: 'Sat. 11/3/2022', from: '11:00', to: '17:00', color: "#0d259e" },
  { key: 3, date: 'Sun. 12/3/2022', from: '11:00', to: '17:00', color: "#0d259e" },
  { key: 4, date: 'Tues. 14/3/2022', from: '16:00', to: '19:00', color: "#0d259e" },
  { key: 5, date: 'Wed.: 15/3/2022', from: '16:00', to: '19:00', color: "#0d259e" },
]

const review = [
  { key: 1, reviewer_name: 'Maram Ghazal', date: '9/3/2022', review: 'Hello, this is my first review, why dont you try to add some important features like telegeram like: separete tabs for audio, video and photo' },
  { key: 2, reviewer_name: 'Alaa Abdelmajied', date: '11/3/2022', review: 'Hello, this is my first review, why dont you try to add some important features like telegeram' },
  { key: 3, reviewer_name: 'Mayar Adel', date: '12/3/2022', review: 'Hello, this is my first review' },
  { key: 4, reviewer_name: 'Nadeen Elgazar', date: '14/3/2022', review: 'I dont like this style btw' },
  { key: 5, reviewer_name: 'Omar Shalaby', date: '15/3/2022', review: 'This is too much scrolling' },
]

export default function ProfileScreen() {

  const scrollX = useRef(new Animated.Value(0)).current;

  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);


  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
          <View style={styles.body}>
            {/* <View style={styles.bodyContent}> */}
            <Text style={styles.dr_name}>Dr Alaa</Text>
            <Text style={styles.info}>Dermatologist</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
            <View style={styles.customRatingBar}>
              {
                maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity activeOpacity={0.7}
                      key={key}
                      onPress={() => setDefaultRating(item)}>
                      <FontAwesome name={item <= defaultRating ? "star" : "star-o"} size={25} color="#FDCC0D" />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>
        {/* <View style={styles.scheduleContainer}> */}
        <View style={styles.appointmentsContainer}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >

            {appointments.map((card, cardIndex) => {
              return (
                <Animated.View
                  style={{ width: windowWidth, }}
                  key={cardIndex}
                >
                  <View style={styles.scheduleCard} key={cardIndex}>
                    <View style={styles.dateHeader} ><Text style={{ color: '#fff', fontSize: 20 }}>{card.date}</Text></View>
                    <View style={{ margin: 30, alignItems: 'center' }}>
                      <Text style={{ color: '#000', fontSize: 20 }}>From: {card.from}</Text>
                      <Text style={{ color: '#000', fontSize: 20 }}>To: {card.to}</Text>
                    </View>
                    <Pressable style={styles.bookButton} >
                      <Text style={{ color: '#fff' }} >Book</Text>
                    </Pressable>
                  </View>
                </Animated.View>
              );
            })}

          </ScrollView>
        </View>

        {/* for the dots */}
        <View style={styles.indicatorContainer} >
          {
            appointments.map((card, cardIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (cardIndex - 1),
                  windowWidth * (cardIndex),
                  windowWidth * (cardIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp",

              })

              return (
                <Animated.View style={[styles.normalDots, { width }, { backgroundColor: card.color }]} key={cardIndex} />
              );
            })
          }
        </View>
        {/* </View> */}
        <View style={styles.reviewsArea}>
          <Text style={styles.title}>Ratings and Reviews</Text>
          {review.map((reviewCard, cardIndex) => {
            return (
              <View style={{
                backgroundColor: '#fff', width: '95%', margin: 5, justifyContent: 'center', alignSelf: 'center', borderRadius: 10, shadowColor: '#000000',
                shadowOffset: { width: -2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 2,
              }}>
                <View style={{ height: 150, width: '97%', alignSelf: 'center' }} key={cardIndex}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.name}>{reviewCard.reviewer_name}</Text>
                    <Text style={styles.name}>{reviewCard.date}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    marginLeft: '3%'
                  }}>
                    {
                      maxRating.map((item, key) => {
                        return (
                          <TouchableOpacity activeOpacity={0.7}
                            key={key}
                            onPress={() => setDefaultRating(item)}>
                            <FontAwesome name={item <= defaultRating ? "star" : "star-o"} size={25} color="#FDCC0D" />
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                  <Text style={styles.review}>{reviewCard.review}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ backgroundColor: '#FDCC0D', width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.title}>Comments Section - To be continued</Text></View>
      </View>
    </ScrollView >
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#fff000'
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: "#fff0f0",

  },

  header: {
    // flex: 1,
    backgroundColor: "#0d259e",
    height: 150,

  },
  avatar: {
    // flex: 1,
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
  },

  body: {
    flexDirection: 'column',
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#ff0ff0',
  },


  // bodyContent: {
  //   // flex: 1,
  //   // flexDirection: 'column',
  //   alignItems: 'center',
  //   // backgroundColor: '#f0ff7f',
  //   // padding: 30,
  //   // marginTop:150,
  // },

  name: {
    fontSize: 20,
    color: "#000",
    marginLeft: '3%'
    // marginTop: 10,
    // textAlign: 'center'
  },

  dr_name: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
  },

  info: {
    fontSize: 16,
    color: "#0d259e",
    marginTop: 10,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    textAlign: 'center'
  },

  review: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5
  },

  // scheduleContainer:
  // {
  //   height: 280,
  //   margin: '2%',
  //   flexDirection: 'column',
  //   // backgroundColor: '#ff0fff',
  //   // justifyContent: 'space-evenly'
  // },

  appointmentsContainer: {
    height: 280,
    // backgroundColor: '#ff0',
    // marginTop: -50,
    // alignItems: 'center'
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
    // backgroundColor: '#ff0fff',
  },

  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  scheduleCard: {
    flex: 1,
    margin: 8,
    width: 200,
    height: 250,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 35,
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  dateHeader: {
    backgroundColor: '#0d259e',
    height: '25%',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookButton: {
    width: 100,
    paddingTop: '6%',
    paddingBottom: '6%',
    borderRadius: 30,
    backgroundColor: '#0d259e',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff'
  },

  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,

  },

  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },

  title: {
    // textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    marginTop: 15,
    marginLeft: 10
  },

  reviewsArea: {
    width: '100%',
    // backgroundColor:'#f0f'
  }

});


import React, {useRef, useState, useEffect} from 'react';
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
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';
import axios from 'axios';
import {Server_URL} from '@env';

export default function ProfileScreen({route}) {

  const {drID, drName, speciality, hospitalName, averageRating} = route.params;
  const [comments, setComments] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      await axios
        .get(`${Server_URL}:3000/patient/doctor/${drID}`)
        .then(response => {
          setComments(response.data.reviewDetails);
          setSchedule(response.data.scheduleDetails);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getReviews();
  }, []);

  const OnPress = () => {
    console.log('reviews:', comments);
    console.log('avg rating:', averageRating);
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 300;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          />
          <View style={styles.body}>
            {/* <View style={styles.bodyContent}> */}
            <Text style={styles.dr_name}>{drName}</Text>
            <Text style={styles.speciality}>{speciality}</Text>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name={'location-sharp'}
                size={25}
                color="#1c1bad"
                style={{margin: 5}}></Ionicons>
              <Text style={styles.description}>{hospitalName}</Text>
            </View>
            <View style={styles.customRatingBar}>
              <Rating
                type="custom"
                ratingBackgroundColor="#bfbfbf"
                tintColor="#f0f0f0"
                ratingCount={5}
                imageSize={30}
                startingValue={averageRating}
                fractions={1}
                readonly={true}></Rating>
              <Text style={styles.text}>{averageRating}/5</Text>
            </View>
          </View>
        </View>
        <View style={styles.appointmentsContainer}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}>
            {schedule.map((card, cardIndex) => {
              return (
                <Animated.View style={{width: windowWidth}} key={cardIndex}>
                  <View style={styles.scheduleCard}>
                    <View style={styles.dateHeader}>
                      <Text style={{color: '#fff', fontSize: 20}}>
                        {card.date}
                      </Text>
                    </View>
                    <View style={{margin: 30, alignItems: 'center'}}>
                      <Text style={{color: '#000', fontSize: 20}}>
                        From: {card.from}
                      </Text>
                      <Text style={{color: '#000', fontSize: 20}}>
                        To: {card.to}
                      </Text>
                    </View>
                    <Pressable style={styles.bookButton} onPress={OnPress}>
                      <Text style={{color: '#fff'}}>Book</Text>
                    </Pressable>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {schedule.map((card, cardIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (cardIndex - 1),
                  windowWidth * cardIndex,
                  windowWidth * (cardIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  style={[
                    styles.normalDots,
                    {width},
                    {backgroundColor: '#1c1bad'},
                  ]}
                  key={cardIndex}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.reviewsArea}>
          <Text style={styles.title}>Ratings and Reviews</Text>
          {comments.map((reviewCard, cardIndex) => {
            return (
              <View key={cardIndex} style={styles.commentsCard}>
                <View style={{height: 150, width: '97%', alignSelf: 'center'}}>
                  <Text style={styles.text}>{reviewCard.name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Rating
                      type="custom"
                      ratingBackgroundColor="#bfbfbf"
                      tintColor="#fff"
                      ratingCount={5}
                      imageSize={25}
                      startingValue={reviewCard.rate}
                      fractions={1}
                      readonly={true}
                      style={{
                        marginRight: 10,
                      }}></Rating>
                    <Text style={styles.text}>{reviewCard.date}</Text>
                  </View>
                  <Text style={styles.text}>{reviewCard.review}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#1c1bad',
    height: 150,
  },
  avatar: {
    // flex: 1,
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#fff',
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

  text: {
    fontSize: 19,
    color: '#000',
    margin: 1,
  },

  dr_name: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
  },

  speciality: {
    fontSize: 16,
    color: '#1c1bad',
    margin: 5,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    color: '#000',
    margin: 5,
    textAlign: 'center',
  },

  review: {
    fontSize: 19,
    color: '#000',
    marginLeft: 5,
  },

  appointmentsContainer: {
    height: 280,
    flexDirection: 'column',
    // backgroundColor: '#ff0',
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 35,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  dateHeader: {
    backgroundColor: '#1c1bad',
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
    backgroundColor: '#1c1bad',
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#fff',
    color: '#fff',
  },

  commentsCard: {
    backgroundColor: '#fff',
    width: '95%',
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  customRatingBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },

  starImg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'bold',
    color: '#000',
    margin: 15,
  },

  reviewsArea: {
    width: '100%',
  },
});

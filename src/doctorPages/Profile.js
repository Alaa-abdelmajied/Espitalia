import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    TouchableOpacity
} from 'react-native';

export default function UserProfileView() {
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

                    <Text style={styles.name}>Karim Ahmed </Text>
                    <Text style={styles.userInfo}> Doctor at : Icc Hospital</Text>
                    <View style={styles.customRatingBar}>
                        {
                            maxRating.map((item, key) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7}
                                        key={item}
                                        onPress={() => setDefaultRating(item)}>
                                        <Image style={styles.starImg} source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }}></Image>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTittle}>Profile Information</Text>
                    <Text style={styles.cardInfo}> - Karim Ahmed Saleh</Text>
                    <Text style={styles.cardInfo}> - Graduated from: ..................</Text>
                    <Text style={styles.cardInfo}> - Phone numebr: .................</Text>
                    <Text style={styles.cardInfo}> - From: Alexandria , Egypt</Text>
                    <Text style={styles.cardInfo}> - Work hours: 8am ={'>'} 6pm</Text>
                    <Text style={styles.cardInfo}> - Email: karimahmed@gamil.com</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#003da5",
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
        // borderRadius: 10,
        padding: 10,
        flexGrow:1,
        // height: 400,
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
    }
});
import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import styles from '../Style/Styles';
import { environment } from '../../environments/environments';
import axios from 'axios';
import { useGetToken } from '../../CustomHook/useGetToken';
import Icon from 'react-native-vector-icons/FontAwesome5';
import imgArr from '../../Img';

function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}
export const Categori = [
    {
        id: 1, name: 'Sports', backgroundColor: '#FFFF99', icon: 'basketball-ball', iconColor: '#F48B36', data: [
            { id: 1, name: 'SportsNum1', backgroundColor: 'red' },
            { id: 2, name: 'SportsNum2', backgroundColor: '#9FC5E8' },
            { id: 3, name: 'SportsNum3', backgroundColor: '#2986CC' },
        ]
    },
    {
        id: 2, name: 'Travel', backgroundColor: '#9FC5E8', icon: 'plane', iconColor: 'black', data: [
            { id: 1, name: 'TravelNum1', backgroundColor: 'red' },
            { id: 2, name: 'TravelNum2', backgroundColor: '#FFFF99' },
            { id: 3, name: 'TravelNum3', backgroundColor: '#2986CC' },
        ]
    },
    {
        id: 3, name: 'Music', backgroundColor: 'red', icon: 'guitar', iconColor: '#F6F26B', data: [
            { id: '1', name: 'MusicNum1', backgroundColor: '#4EED44' },
            { id: '2', name: 'MusicNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'MusicNum3', backgroundColor: '#2986CC' },
        ]
    },
    {
        id: 4, name: 'Gaming', backgroundColor: '#2986CC', icon: 'gamepad', iconColor: '#FCE5CD', data: [
            { id: '1', name: 'GamingNum1', backgroundColor: '#4EED44' },
            { id: '2', name: 'GamingNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'GamingNum3', backgroundColor: 'red' },
        ]
    },
    {
        id: 5, name: 'Photo', backgroundColor: '#4EED44', icon: 'camera', iconColor: '#EAD1DC', data: [
            { id: '1', name: 'PhotoNum1', backgroundColor: '#F4CCCC' },
            { id: '2', name: 'PhotoNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'PhotoNum3', backgroundColor: 'red' },
        ]
    },
    {
        id: 6, name: 'Food', backgroundColor: '#F4CCCC', icon: 'utensils', iconColor: '#9FC5E8', data: [
            { id: '1', name: 'FoodNum1', backgroundColor: '#4EED44' },
            { id: '2', name: 'FoodNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'FoodNum3', backgroundColor: 'red' },
        ]
    },
];

export const DetailData = [
    {
        id: 1,
        Sports: [
            { id: 1, name: 'SportsNum1', backgroundColor: 'red' },
            { id: 2, name: 'SportsNum2', backgroundColor: '#9FC5E8' },
            { id: 3, name: 'SportsNum3', backgroundColor: '#2986CC' },
        ]
    },
    {
        id: 2,
        Travel: [
            { id: 1, name: 'TravelNum1', backgroundColor: 'red' },
            { id: 2, name: 'TravelNum2', backgroundColor: '#FFFF99' },
            { id: 3, name: 'TravelNum3', backgroundColor: '#2986CC' },
        ]
    },
    {
        id: 3,
        Music: [
            { id: '1', name: 'MusicNum1', backgroundColor: '#4EED44' },
            { id: '2', name: 'MusicNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'MusicNum3', backgroundColor: '#2986CC' },
        ]
    },
    {
        id: 4,
        Gaming: [
            { id: '1', name: 'GamingNum1', backgroundColor: '#4EED44' },
            { id: '2', name: 'GamingNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'GamingNum3', backgroundColor: 'red' },
        ],
    },
    {
        id: 5,
        Photo: [
            { id: '1', name: 'PhotoNum1', backgroundColor: '#F4CCCC' },
            { id: '2', name: 'PhotoNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'PhotoNum3', backgroundColor: 'red' },
        ],
    },
    {
        id: 6,
        Food: [
            { id: '1', name: 'FoodNum1', backgroundColor: '#4EED44' },
            { id: '2', name: 'FoodNum2', backgroundColor: '#FFFF99' },
            { id: '3', name: 'FoodNum3', backgroundColor: 'red' },
        ],
    }

]
const chunkArray = (arr: any, chunkSize: any) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

const images = imgArr.map((img, index) => {
    return img
});

const Categories = ({ navigation }: any) => {
    const sportsData = Categori;
    // console.log(sportsData);
    const Token = useGetToken();
    const [Detail, setDetail] = useState(null);

    const [loading, setLoading] = useState(false);
    const showLoading = () => {
        setLoading(true);
    };
    const hideLoading = () => {
        setLoading(false);
    };

    const categoriesPerRow = 2; // Number of categories per row
    const categorizedItems = chunkArray(Categori, categoriesPerRow);

    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{ height: '100%' }}>
                {loading && <LoadingAnimation />}
                <View style={[styles.headerForm, styles.styleView]}>
                    <Text style={styles.textLogin}>Thể loại</Text>
                </View>
                <View style={[styles.bodyForm]}>
                    <ScrollView>
                        {categorizedItems.map((rowCategories, rowIndex) => (
                            <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2%' }}>
                                {rowCategories.map((category: any) => (
                                    <TouchableOpacity
                                        key={category.id}
                                        onPress={() => setDetail(category.id)}
                                        style={{ borderRadius: 15, width: '48%', height: 150, backgroundColor: category.backgroundColor }}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Icon name={category.icon} style={{ fontSize: 50, color: category.iconColor, justifyContent: 'center', paddingEnd: '6%', paddingTop: '10%' }} />
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 30 }}>{category.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                        <View style={{ marginTop: '3%' }}>
                            <Text style={{ fontSize: 20 }}>Recent Posts</Text>
                            <View style={{ marginBottom: '3%' }}>
                                <Text style={{ fontSize: 30, fontWeight: "bold", color: 'black' }} >{Categori.find((category) => category.id === Detail)?.name || ''}</Text>
                            </View>
                            {Detail && (
                                <ScrollView style={{ borderRadius: 15, width: '100%', height: '100%'}}>
                                {/* <ScrollView style={{ borderRadius: 15, width: '100%', height: '100%', backgroundColor: Categori.find((category) => category.id === Detail)?.backgroundColor || 'white', marginBottom: '2%' }}> */}
                                    {imgArr.map((img, index) => (
                                        <ImageBackground
                                            key={index}
                                            source={img}
                                            style={{
                                                flex: 1,
                                                width: '100%',
                                                height: 150,
                                                justifyContent: 'flex-end',
                                                paddingBottom: '10%',
                                                marginBottom: '2%',
                                            }}
                                        >
                                            {/* <Text style={{ fontSize: 20, color: 'white', padding: '2%' }}>
                                                Image {index + 1}
                                            </Text> */}
                                        </ImageBackground>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground >
    )
}
export default Categories;
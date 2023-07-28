import React, { useRef } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, ScrollView, SafeAreaView, Animated, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Style/Styles';
const Home = ({ navigation }: any) => {
    const onClickBack = () => {
        navigation.navigate('Login')
    };
    const scrollX = useRef(new Animated.Value(0)).current;
    const img1 = require("../../Img/New2.jpg");
    const img2 = require("../../Img/New4.jpg");
    const img3 = require("../../Img/New5.jpg");
    // const images = new Array(10).fill(img1);
    
    const images = new Array(10).fill(null).map((_, index) => {
        switch (index % 2) {
            case 0:
                return img1;
            case 1:
                return img2;
            default:
                return img3;
        }
    });
    const { width: windowWidth } = useWindowDimensions();
    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{ height: '100%' }}>
                <View>
                    <View>
                        <TouchableOpacity onPress={onClickBack}>
                            <Icon name="arrow-left" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.headerForm, styles.styleView]}>
                        <Text style={[styles.textLogin]}>Màn hình chính</Text>
                    </View>
                    <View style={[styles.bodyForm]}>
                        <View style={styles.scrollContainer}>
                            <ScrollView
                                horizontal={true}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event([
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                x: scrollX,
                                            },
                                        },
                                    },
                                ])}
                                scrollEventThrottle={1}>
                                {images.map((image, imageIndex) => {
                                    return (
                                        <View style={{ width: (windowWidth - windowWidth * 16 / 100), height: '100%' }} key={imageIndex}>
                                            <ImageBackground source={image} style={styles.card}>

                                            </ImageBackground>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                            <View style={styles.iconScroll}>
                                {images.map((image, imageIndex) => {
                                    const width = scrollX.interpolate({
                                        inputRange: [
                                            windowWidth * (imageIndex - 1),
                                            windowWidth * imageIndex,
                                            windowWidth * (imageIndex + 1),
                                        ],
                                        outputRange: [8, 16, 8],
                                        extrapolate: 'clamp',
                                    });
                                    return (
                                        <Animated.View
                                            key={imageIndex}
                                            style={[styles.normalDot, { width }]}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default Home;
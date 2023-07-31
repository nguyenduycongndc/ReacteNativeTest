import React, { useRef } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, ScrollView, SafeAreaView, Animated, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Style/Styles';
import imgArr from '../../Img';
const Home = ({ navigation }: any) => {
    // const onClickBack = () => {
    //     navigation.navigate('Login')
    // };
    const scrollX = useRef(new Animated.Value(0)).current;
    
    
    const images = imgArr.map((img, index) =>{
        return img
    })
    const { width: windowWidth } = useWindowDimensions();
    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{ height: '100%' }}>
                <View>
                    {/* <View>
                        <TouchableOpacity onPress={onClickBack}>
                            <Icon name="arrow-left" size={30} />
                        </TouchableOpacity>
                    </View> */}
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
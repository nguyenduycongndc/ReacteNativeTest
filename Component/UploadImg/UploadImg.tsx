
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, ScrollView, SafeAreaView, Animated, useWindowDimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Style/Styles';
import imgArr from '../../Img';
import DocumentPicker from 'react-native-document-picker';
const UploadImg = ({ navigation }: any) => {

    const [images, setImages] = useState([]);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);

    const { width: windowWidth } = useWindowDimensions();

    const openMultiDocumentPicker = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: true,
            });

            const selectedImages = results.map((result) => ({ uri: result.uri, name: result.name, size: result.size, type: result.type }));
            setImages(selectedImages);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
            } else {
                console.log('DocumentPicker Error: ', err);
            }
        }
    };
    const openDetailImg = () => {

    }

    const imageWidth = windowWidth - windowWidth * 16 / 100

    const onClickDeleteImg = (indexImg: any) => {
        setImages(
            images.filter((_, index) => index !== indexImg)
        )
        // const x = imageWidth / (images.length - 1) * indexImg
        if (indexImg > 0) {
            const x = imageWidth * (indexImg - 1)
            scrollViewRef.current?.scrollTo(x)
        }
    }

    const imagesTop = images.map((img, index) => {
        return img
    });
    // const imagesTop = images.length != 0 ? images.map((img, index) => {
    //     return img
    // }) : imgArr.map((img, index) =>{
    //     return img
    // });
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
                        <Text style={[styles.textLogin]}>Màn hình UploadFile</Text>
                    </View>
                    <View style={[styles.bodyForm]}>
                        <View style={styles.scrollContainer}>
                            {imagesTop.length < 1 ?
                                <View style={styles.cardNull}>
                                    <TouchableOpacity onPress={openMultiDocumentPicker}>
                                        <Text style={{ color: "white", }}>Hình ảnh</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <ScrollView
                                    ref={scrollViewRef}
                                    horizontal={true}
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={true}
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
                                    {imagesTop.map((image, imageIndex) => {
                                        return (
                                            <View style={{ width: imageWidth, height: '100%' }} key={imageIndex}>
                                                <View style={styles.viewCard}>
                                                    <ImageBackground source={image} style={styles.card}>
                                                        <View style={styles.deleteCard}>
                                                            <TouchableOpacity onPress={() => onClickDeleteImg(imageIndex)} style={styles.deleteCard}>
                                                                <Icon name="times" size={30} color={'red'} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            }
                            <View style={styles.iconScroll}>
                                {imagesTop.map((image, imageIndex) => {
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
                        <View>
                            {/* {images.map((image, index) => (
                                <TouchableOpacity onPress={openDetailImg}>
                                    <Image key={index} source={image} style={{ width: 200, height: 200 }} />
                                </TouchableOpacity>
                            ))} 
                            <TouchableOpacity style={styles.buttonLogin} onPress={openMultiDocumentPicker}>
                                <Text>Select Images</Text>
                            </TouchableOpacity>*/}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default UploadImg;
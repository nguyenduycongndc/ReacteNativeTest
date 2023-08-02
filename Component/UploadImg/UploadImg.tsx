
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, ScrollView, SafeAreaView, Animated, useWindowDimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Style/Styles';
import DocumentPicker from 'react-native-document-picker';
import { environment } from '../../environments/environments';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UploadImg = () => {
    const [images, setImages] = useState([]);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);

    const { width: windowWidth } = useWindowDimensions();

    const openMultiDocumentPicker = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            });

            const selectedImages = results.map((item) => ({ uri: item.uri, name: item.name, type: item.type }));
            setImages(results);
            setFromData(results);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
            } else {
                console.log('DocumentPicker Error: ', err);
            }
        }
    };
    const [Token, setToken] = useState("");
    const handleSetToken = async () => {
        try {
            const token = await AsyncStorage.getItem('Token') || '';
            setToken(JSON.parse(token as string));
        } catch (error) {
            console.log({ error });
        }
    };
    useEffect(() => {
        handleSetToken();
    }, []);

    const formDataRef = useRef(new FormData());


    const setFromData = (results: any) => {
        // results.forEach((image: any, index: any) => {
        //     formDataRef.current.append(`Name`, image.name);
        //     formDataRef.current.append(`Path`, image.uri); // Use the appropriate server path here
        //     formDataRef.current.append(`File`, image);
        // });
        const imageUri = 'https://hpconnect.vn/wp-content/uploads/2020/02/hinh-anh-hoa-hong-dep-3-1-1068x801.jpg';
        formDataRef.current.append('File', {
            uri: imageUri,
            type: 'image/jpeg', // Thay đổi loại ảnh nếu cần
            name: 'hinh-anh-hoa-hong-dep-3-1-1068x801.jpg', // Thay đổi tên file nếu cần
        });
        formDataRef.current.append(`Name`, 'hinh-anh-hoa-hong-dep-3-1-1068x801.jpg');
        formDataRef.current.append(`Path`, imageUri); // Use the appropriate server path here

    };
    const configurationObject = {
        method: 'post',
        url: `${environment.apiUrl}File/UploadFile`,
        data: formDataRef.current,
        headers: { "Content-Type": 'multipart/form-data', 'Authorization': `${Token}` },
    };
    const upLoadFileImg = async () => {
        // await axios(configurationObject)
        await axios.post(`${environment.apiUrl}File/UploadFile`, formDataRef.current, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${Token}`,
            }
        })
            .then(response => {
                console.log(response.data);
                if (response.data.token != null) {

                } else {
                    console.error("Error");
                }
            })
            .catch(error => {
                console.error({ error });
            });
    };

    const imageWidth = windowWidth - windowWidth * 16 / 100;

    const onClickDeleteImg = (indexImg: any) => {
        setImages(
            images.filter((_, index) => index !== indexImg)
        )
        // const x = imageWidth / (images.length - 1) * indexImg
        if (indexImg > 0) {
            const x = imageWidth * (indexImg - 1)
            scrollViewRef.current?.scrollTo(x)
        }
    };

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
                                    ], { useNativeDriver: false })}
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
                                            imageWidth * (imageIndex - 1),
                                            imageWidth * imageIndex,
                                            imageWidth * (imageIndex + 1),
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
                            ))}  */}
                            {
                                imagesTop.length < 1 ?
                                    <TouchableOpacity disabled={true} style={styles.buttonLogout} onPress={() => upLoadFileImg()}>
                                        <Text>Upload Images</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.buttonLogin} onPress={upLoadFileImg}>
                                        <Text>Upload Images</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default UploadImg;
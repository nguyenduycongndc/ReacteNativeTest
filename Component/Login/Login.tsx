import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { environment } from '../../environments/environments';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
};
const Login = ({ navigation }: any) => {
    const [UserName, SetUserName] = useState("user1");
    //user1
    const [PassWord, SetPassWord] = useState("123456");
    //123456

    const [loading, setLoading] = useState(false);
    const [Token, setToken] = useState("");
    const [RequireUserName, setRequireUserName] = useState(false);
    const [RequirePassWord, setRequirePassWord] = useState(false);
    const [ShowAndHide, setShowAndHide] = useState(false);


    const onClickShowAndHide = () => {
        setShowAndHide((ShowAndHide) => !ShowAndHide);
    };
    const showLoading = () => {
        setLoading(true);
    };
    const hideLoading = () => {
        setLoading(false);
    };
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Đăng nhập thành công!',
        });
    };
    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Đăng nhập thất bại!',
        });
    };
    const configurationObject = {
        method: 'post',
        url: `${environment.apiUrl}Login/LoginUser`,
        data: { userName: UserName, passWord: PassWord, },
    };

    // const onClickLogin = async () => {
    //     const response = await fetch(`${environment.apiUrl}Login/LoginUser`, {
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             userName: UserName,
    //             passWord: PassWord,
    //         }),
    //         method: "POST",
    //     })
    //     console.log({ response });
    // }
    const checkValidator = () => {
        let isValid = true;
        if (UserName == "") {
            isValid = false;
            setRequireUserName(true)
        };
        if (PassWord == "") {
            setRequirePassWord(true)
            isValid = false;
        };
        return isValid;
    };
    const onClickLogin = async () => {
        // await axios.post(`${environment.apiUrl}Login/LoginUser`, {
        //     userName: UserName,
        //     passWord: PassWord,
        // })
        const isValid = checkValidator();
        if (isValid) {
            showLoading();
            await axios(configurationObject)
                .then(response => {
                    if (response.data.token != null) {
                        setToken(response.data.token);
                        showToast();
                        hideLoading();
                        // navigation.navigate('Root');
                        navigation.navigate('TabRouter');
                    } else {
                        showToastError();
                        hideLoading();
                        console.error("Error");
                    }
                })
                .catch(error => {
                    console.error({ error });
                    hideLoading();
                });
        }
    };

    const onChangeUserName = (value: string) => {
        SetUserName(value);
    };
    const onChangePassWord = (value: string) => {
        SetPassWord(value);
    };

    const onClickRegisterScreen = () => {
        navigation.navigate('Register')
    };

    const onClickForgotPassWord = () => {
        navigation.navigate('SendOTP')
    };
    const handleSaveToStorage = async () => {
        try {
            if (Token.length > 0) {
                await AsyncStorage.setItem('Token', JSON.stringify(Token))
            }
        } catch (error) {
            console.log({ error });
        }
    };


    useEffect(() => {
        handleSaveToStorage()
    }, [Token])
    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{height:'100%'}}>
                {loading && <LoadingAnimation />}
                <View style={[styles.headerForm, styles.styleView]}>
                    <Text style={styles.textLogin}>Đăng Nhập</Text>
                </View>
                <ScrollView>
                    <View style={[styles.bodyForm]}>
                        <View>
                            <Text style={styles.textFormLogin}>Tài khoản</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View style={[styles.viewIcon]}>
                                <Icon name="user" />
                            </View>
                            <View>
                                <TextInput placeholder='Nhập tài khoản' editable={!loading} value={UserName} onChangeText={onChangeUserName} />
                            </View>
                        </View>
                        {(RequireUserName && UserName.length < 1) ? (
                            <View>
                                <Text style={{ color: 'red' }}>Tài khoản không được để trống!</Text>
                            </View>
                        ) : (
                            null
                        )}
                        <View style={{ marginTop: "2%" }}>
                            <Text style={[styles.textFormLogin]}>Mật khẩu</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="lock" />
                                </View>
                                <TextInput style={{ flex: 1 }} autoCorrect={false} secureTextEntry={!ShowAndHide} editable={!loading} placeholder='Nhập mật khẩu' value={PassWord} onChangeText={onChangePassWord} />
                            </View>
                            <TouchableOpacity onPress={onClickShowAndHide}>
                                <Icon name="eye" />
                            </TouchableOpacity>
                        </View>
                        {(RequirePassWord && PassWord.length < 1) ? (
                            <View>
                                <Text style={{ color: 'red' }}>Mật khẩu không được để trống!</Text>
                            </View>
                        ) : (
                            null
                        )}
                        <TouchableOpacity onPress={onClickForgotPassWord}>
                            <Text style={styles.forgotPassWord}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLogin} onPress={onClickLogin}>
                            <Text style={{ color: "white", fontSize: 20 }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={[styles.footerForm, styles.styleView]}>
                    <View style={styles.viewRow}>
                        <Text>Bạn chưa có mật khẩu? </Text>
                        <TouchableOpacity disabled={loading} onPress={onClickRegisterScreen}>
                            <Text style={styles.textRegister}>Tạo mới tài khoản tại đây</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}>Designed by NDC</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default Login;
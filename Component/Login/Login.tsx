import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ImageBackground, ActivityIndicator } from 'react-native';
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
}
const Login = ({ navigation }: any) => {
    const [UserName, SetUserName] = useState("user1");
    //user1
    const [PassWord, SetPassWord] = useState("123456");
    //123456

    const [loading, setLoading] = useState(false);
    const [Token, setToken] = useState("");
    const [RequireUserName, setRequireUserName] = useState(false);
    const [RequirePassWord, setRequirePassWord] = useState(false);

    
    const showLoading = () => {
        setLoading(true);
    }
    const hideLoading = () => {
        setLoading(false);
    }
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Đăng nhập thành công!',
        });
    }
    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Đăng nhập thất bại!',
        });
    }
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

    const onClickLogin = async () => {
        // await axios.post(`${environment.apiUrl}Login/LoginUser`, {
        //     userName: UserName,
        //     passWord: PassWord,
        // })
        if (UserName == "") {
            setRequireUserName(true)
        }
        if (PassWord == "") {
            setRequirePassWord(true)
        }
        console.log(RequireUserName);
        console.log(RequirePassWord);
        showLoading();
        await axios(configurationObject)
            .then(response => {
                console.log(response.data);
                if (response.data.token != null) {
                    setToken(response.data.token);
                    showToast();
                    hideLoading();
                    navigation.navigate('Root');
                    console.log(Token)
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
        console.log({ UserName, PassWord })
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
            {loading && <LoadingAnimation />}
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={styles.textLogin}>Đăng Nhập</Text>
            </View>
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
                    <View style={[styles.viewIcon]}>
                        <Icon name="lock" />
                    </View>
                    <View>
                        <TextInput autoCorrect={false} secureTextEntry={true} editable={!loading} placeholder='Nhập mật khẩu' value={PassWord} onChangeText={onChangePassWord} />
                    </View>
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
                <Pressable style={styles.buttonLogin}>
                    <TouchableOpacity onPress={onClickLogin}>
                        <Text style={{ color: "white", fontSize: 20 }}>Đăng nhập</Text>
                    </TouchableOpacity>
                </Pressable >
            </View>
            <View style={[styles.footerForm, styles.styleView]}>
                <View style={styles.viewRow}>
                    <Text>Bạn chưa có mật khẩu? </Text>
                    <TouchableOpacity disabled={loading} onPress={onClickRegisterScreen}>
                        <Text style={styles.textRegister}>Tạo mới tài khoản tại đây</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textRegister}>Designed by NDC</Text>
            </View>
        </ImageBackground>
    )
}
export default Login;
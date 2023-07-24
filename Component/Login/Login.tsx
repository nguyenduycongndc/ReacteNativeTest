import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ImageBackground, ActivityIndicator } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { environment } from '../../environments/environments';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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
    const [PassWord, SetPassWord] = useState("123456");

    const [loading, setLoading] = useState(false);

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
        showLoading();
        await axios(configurationObject)
            .then(response => {
                console.log(response.data);
                if (response.data.token != null) {
                    showToast();
                    hideLoading();
                    navigation.navigate('Root');
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
    }

    const onChangeUserName = (value: string) => {
        SetUserName(value);
    };
    const onChangePassWord = (value: string) => {
        SetPassWord(value);
    };

    const onClickRgisterScreen = () => {
        navigation.navigate('Register')
    }

    const onClickForgotPassWord = () => {
        navigation.navigate('SendOTP')
    }

    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            {loading && <LoadingAnimation />}
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={styles.textLogin}>Login</Text>
            </View>
            <View style={[styles.bodyForm]}>
                <View>
                    <Text style={styles.textFormLogin}>UserName</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="user" />
                    </View>
                    <View>
                        <TextInput placeholder='This UserName' editable={!loading} value={UserName} onChangeText={onChangeUserName} />
                    </View>
                </View>
                <View style={{ marginTop: "2%" }}>
                    <Text style={[styles.textFormLogin]}>PassWord</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="lock" />
                    </View>
                    <View>
                        <TextInput autoCorrect={false} secureTextEntry={true} editable={!loading} placeholder='This PassWord' value={PassWord} onChangeText={onChangePassWord} />
                    </View>
                </View>
                <TouchableOpacity onPress={onClickForgotPassWord}>
                    <Text style={styles.forgotPassWord}>Forgot PassWord?</Text>
                </TouchableOpacity>
                <Pressable style={styles.buttonLogin}>
                    <TouchableOpacity onPress={onClickLogin}>
                        <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
                    </TouchableOpacity>
                </Pressable >
            </View>
            <View style={[styles.footerForm, styles.styleView]}>
                <View style={styles.viewRow}>
                    <Text>Don't have a account? </Text>
                    <TouchableOpacity disabled={loading} onPress={onClickRgisterScreen}>
                        <Text style={styles.textRegister}>REGISTER HERE</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textRegister}>Designed by NDC</Text>
            </View>
        </ImageBackground>
    )
}
export default Login;
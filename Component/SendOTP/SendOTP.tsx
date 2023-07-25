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

const SendOTP = ({ navigation }: any) => {
    const [Email, SetEmail] = useState("useremail@gmail.com");
    const [OTP, SetOTP] = useState("");
    const [Show, SetShow] = useState(false);
    const [PassWordNew, SetPassWordNew] = useState("");
    const [ConfirmPassWord, SetConfirmPassWord] = useState("");
    const [loading, setLoading] = useState(false);

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Vui lòng kiểm tra mã OTP đã gửi đến email!!!',
            //   text2: 'This is some something 👋'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Thất bại! Vui lòng kiểm tra lại địa chỉ email? ',
            //   text2: 'This is some something 👋'
        });
    }


    const onChangeEmail = (value: string) => {
        SetEmail(value);
    };
    const onChangeOTP = (value: string) => {
        SetOTP(value);
    };
    const onChangePassWordNew = (value: string) => {
        SetPassWordNew(value);
    };
    const onChangeConfirmPassWord = (value: string) => {
        SetConfirmPassWord(value);
    };

    const showLoading = () => {
        setLoading(true);
    }
    const hideLoading = () => {
        setLoading(false);
    }

    const onClickSendOTP = async () => {
        showLoading();
        await axios.post(`${environment.apiUrl}Login/SendOTP`, null, { params: { email: Email } })
            .then(response => {
                if (response.data.data === true) {
                    showToast();
                    SetShow(true);
                    hideLoading();
                } else {
                    showToastError();
                    SetShow(false);
                    hideLoading();
                }
                console.log(response.data);
            })
            .catch(error => {
                console.error({ error });
                hideLoading();
            });
    };
    const onClickBack = () => {
        navigation.navigate('Login')
    };

    const onClickChangePassWord = async () => {
        showLoading();
        await axios.post(`${environment.apiUrl}Login/ForgotPassWord`, {
            Email: Email,
            OTP: OTP,
            PassWordNew: PassWordNew,
            ConfirmPassWord: ConfirmPassWord
        })
            .then(response => {
                if (response.data.data === true) {
                    hideLoading();
                    navigation.navigate('Login');
                } else {
                    hideLoading();
                    null;
                }
                console.log(response.data);
                hideLoading();
            })
            .catch(error => {
                console.error({ error });
                hideLoading();
            });
    };
    return (
        <ImageBackground source={require('../../Img/New7.jpg')} style={{ flex: 1 }}>
            {loading && <LoadingAnimation />}
            <View>
                <TouchableOpacity onPress={onClickBack}>
                    <Icon name="arrow-left" size={30} />
                </TouchableOpacity>
            </View>
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={[styles.textLogin, styles.colorTextWhite]}>Quên mật khẩu</Text>
            </View>
            <View style={[styles.bodyForm]}>
                <View style={{ marginTop: "2%" }}>
                    <Text style={[styles.textFormLogin]}>Địa chỉ email</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="envelope" />
                    </View>
                    <View>
                        <TextInput placeholder='Nhập địa chỉ email' editable={!loading} value={Email} onChangeText={onChangeEmail} />
                    </View>
                </View>
                {
                    Show ? (
                        <View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>Mã OTP</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="hashtag" />
                                </View>
                                <View>
                                    <TextInput placeholder='Nhập mã OTP' editable={!loading} value={OTP} onChangeText={onChangeOTP} />
                                </View>
                            </View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>Mật khẩu mới</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="lock" />
                                </View>
                                <View>
                                    <TextInput secureTextEntry={true} editable={!loading} placeholder='Nhập mật khẩu mới' value={PassWordNew} onChangeText={onChangePassWordNew} />
                                </View>
                            </View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>Nhập lại mật khẩu</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="lock" />
                                </View>
                                <View>
                                    <TextInput secureTextEntry={true} editable={!loading} placeholder='Nhập lại mật khẩu' value={ConfirmPassWord} onChangeText={onChangeConfirmPassWord} />
                                </View>
                            </View>
                            <Pressable style={styles.buttonLogin}>
                                <TouchableOpacity onPress={onClickChangePassWord} activeOpacity={0.1} disabled={loading}>
                                    <Text style={{ color: "white", fontSize: 20 }}>Gửi</Text>
                                </TouchableOpacity>
                            </Pressable >
                        </View>
                    ) : (
                        <Pressable style={styles.buttonLogin}>
                            <TouchableOpacity onPress={onClickSendOTP} activeOpacity={0.1} disabled={loading}>
                                <Text style={{ color: "white", fontSize: 20 }}>Gửi mã OTP</Text>
                            </TouchableOpacity>
                        </Pressable >
                    )
                }

            </View>
        </ImageBackground>
    )
}
export default SendOTP;
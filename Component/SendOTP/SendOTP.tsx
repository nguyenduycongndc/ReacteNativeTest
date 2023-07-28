import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
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
    //useremail@gmail.com
    const [OTP, SetOTP] = useState("");
    const [Show, SetShow] = useState(false);
    const [PassWordNew, SetPassWordNew] = useState("");
    const [ConfirmPassWord, SetConfirmPassWord] = useState("");
    const [loading, setLoading] = useState(false);

    const [RequireOTP, setRequireOTP] = useState(false);
    const [RequireEmail, setRequireEmail] = useState(false);
    const [RequirePassWordNew, setRequirePassWordNew] = useState(false);
    const [RequireConfirmPassWord, setRequireConfirmPassWord] = useState(false);

    const [ShowAndHide, setShowAndHide] = useState(false);
    const [ShowAndHideConfirm, setShowAndHideConfirm] = useState(false);


    const onClickShowAndHide = () => {
        setShowAndHide((ShowAndHide) => !ShowAndHide);
    }

    const onClickShowAndHideConfirm = () => {
        setShowAndHideConfirm((ShowAndHideConfirm) => !ShowAndHideConfirm);
    }
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
    const checkValidatorEmail = () => {
        let isValidEmail = true;
        if (Email == "") {
            isValidEmail = false;
            setRequireEmail(true)
        };
        return isValidEmail;
    }
    const checkValidator = () => {
        let isValid = true;
        if (Email == "") {
            isValid = false;
            setRequireEmail(true)
        };
        if (OTP == "") {
            setRequireOTP(true)
            isValid = false;
        };
        if (PassWordNew == "") {
            setRequirePassWordNew(true)
            isValid = false;
        };
        if (ConfirmPassWord == "") {
            setRequireConfirmPassWord(true)
            isValid = false;
        };
        return isValid;
    }
    const onClickSendOTP = async () => {
        const isValidEmail = checkValidatorEmail();
        if (isValidEmail) {
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
        }
    };
    const onClickBack = () => {
        navigation.navigate('Login')
    };

    const onClickChangePassWord = async () => {
        const isValid = checkValidator();
        if (isValid) {
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
        // showLoading();
        // await axios.post(`${environment.apiUrl}Login/ForgotPassWord`, {
        //     Email: Email,
        //     OTP: OTP,
        //     PassWordNew: PassWordNew,
        //     ConfirmPassWord: ConfirmPassWord
        // })
        //     .then(response => {
        //         if (response.data.data === true) {
        //             hideLoading();
        //             navigation.navigate('Login');
        //         } else {
        //             hideLoading();
        //             null;
        //         }
        //         console.log(response.data);
        //         hideLoading();
        //     })
        //     .catch(error => {
        //         console.error({ error });
        //         hideLoading();
        //     });
    };
    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{ height: '100%' }}>
                {loading && <LoadingAnimation />}
                <View>
                    <TouchableOpacity onPress={onClickBack}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.headerForm, styles.styleView]}>
                    <Text style={[styles.textLogin, styles.colorTextWhite]}>Quên mật khẩu</Text>
                </View>
                <ScrollView>
                    <View style={[styles.bodyForm]}>
                        <View style={{ marginTop: "2%" }}>
                            <Text style={[styles.textFormLogin]}>Địa chỉ email</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View style={[styles.viewIcon]}>
                                <Icon name="envelope" />
                            </View>
                            <View>
                                <TextInput placeholder='Nhập địa chỉ email' keyboardType="email-address" editable={!loading} value={Email} onChangeText={onChangeEmail} />
                            </View>
                        </View>
                        {(RequireEmail && Email.length < 1) ? (
                            <View>
                                <Text style={{ color: 'red' }}>Địa chỉ email không được để trống!</Text>
                            </View>
                        ) : (
                            null
                        )}
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
                                            <TextInput placeholder='Nhập mã OTP' keyboardType="numeric" editable={!loading} value={OTP} onChangeText={onChangeOTP} />
                                        </View>
                                    </View>
                                    {(RequireOTP && OTP.length < 1) ? (
                                        <View>
                                            <Text style={{ color: 'red' }}>Mã OTP không được để trống!</Text>
                                        </View>
                                    ) : (
                                        null
                                    )}
                                    <View style={{ marginTop: "2%" }}>
                                        <Text style={[styles.textFormLogin]}>Mật khẩu mới</Text>
                                    </View>
                                    <View style={[styles.viewRowInput]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={[styles.viewIcon]}>
                                                <Icon name="lock" />
                                            </View>
                                            <TextInput style={{ flex: 1 }} autoCorrect={false} secureTextEntry={!ShowAndHide} editable={!loading} placeholder='Nhập mật khẩu mới' value={PassWordNew} onChangeText={onChangePassWordNew} />
                                        </View>
                                        <TouchableOpacity onPress={onClickShowAndHide}>
                                            <Icon name="eye" />
                                        </TouchableOpacity>
                                    </View>
                                    {(RequirePassWordNew && PassWordNew.length < 1) ? (
                                        <View>
                                            <Text style={{ color: 'red' }}>Mật khẩu không được để trống!</Text>
                                        </View>
                                    ) : (
                                        null
                                    )}
                                    <View style={{ marginTop: "2%" }}>
                                        <Text style={[styles.textFormLogin]}>Nhập lại mật khẩu</Text>
                                    </View>
                                    <View style={[styles.viewRowInput]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={[styles.viewIcon]}>
                                                <Icon name="lock" />
                                            </View>
                                            <TextInput style={{ flex: 1 }} autoCorrect={false} secureTextEntry={!ShowAndHideConfirm} editable={!loading} placeholder='Nhập lại mật khẩu' value={ConfirmPassWord} onChangeText={onChangeConfirmPassWord} />
                                        </View>
                                        <TouchableOpacity onPress={onClickShowAndHideConfirm}>
                                            <Icon name="eye" />
                                        </TouchableOpacity>
                                    </View>
                                    {(RequireConfirmPassWord && ConfirmPassWord.length < 1) ? (
                                        <View>
                                            <Text style={{ color: 'red' }}>Mật khẩu không được để trống!</Text>
                                        </View>
                                    ) : (
                                        null
                                    )}
                                    <TouchableOpacity style={styles.buttonLogin} onPress={onClickChangePassWord} activeOpacity={0.1} disabled={loading}>
                                        <Text style={{ color: "white", fontSize: 20 }}>Gửi</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.buttonLogin} onPress={onClickSendOTP} activeOpacity={0.1} disabled={loading}>
                                    <Text style={{ color: "white", fontSize: 20 }}>Gửi mã OTP</Text>
                                </TouchableOpacity>
                            )
                        }

                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default SendOTP;
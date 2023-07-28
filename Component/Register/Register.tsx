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
const Register = ({ navigation }: any) => {
    const [UserName, SetUserName] = useState("");
    const [PassWord, SetPassWord] = useState("");
    const [Email, SetEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [RequireUserName, setRequireUserName] = useState(false);
    const [RequirePassWord, setRequirePassWord] = useState(false);
    const [RequireEmail, setRequireEmail] = useState(false);
    const [ShowAndHide, setShowAndHide] = useState(false);
    const onClickShowAndHide = () => {
        setShowAndHide((ShowAndHide) => !ShowAndHide);
    }

    const showLoading = () => {
        setLoading(true);
    }
    const hideLoading = () => {
        setLoading(false);
    }

    const onChangeUserName = (value: string) => {
        SetUserName(value);
    };
    const onChangePassWord = (value: string) => {
        SetPassWord(value);
    };
    const onChangeEmail = (value: string) => {
        SetEmail(value);
    };
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Thành công!',
        });
    }
    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Thất bại!',
        });
    }
    const checkValidator = () => {
        let isValid = true;
        if (UserName == "") {
            isValid = false;
            setRequireUserName(true)
        };
        if (PassWord == "") {
            isValid = false;
            setRequirePassWord(true)
        };
        if (Email == "") {
            isValid = false;
            setRequireEmail(true)
        };
        return isValid;
    }

    const onClickRegister = async () => {
        const isValid = checkValidator();
        if (isValid) {
            showLoading();
            await axios.post(`${environment.apiUrl}Login/Register`, {
                userName: UserName,
                passWord: PassWord,
                email: Email
            })
                .then(response => {
                    hideLoading();
                    showToast();
                    navigation.navigate('Login');
                    console.log(response.data);
                })
                .catch(error => {
                    hideLoading();
                    showToastError();
                    console.error({ error });
                });
            console.log({ UserName, PassWord, Email });
        }
    };
    const onClickBack = () => {
        navigation.navigate('Login')
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
                    <Text style={[styles.textLogin, styles.colorTextWhite]}>Tạo mới tài khoản</Text>
                </View>
                <ScrollView>
                    <View style={[styles.bodyForm]}>
                        <View>
                            <Text style={[styles.textFormLogin]}>Tài khoản</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View style={[styles.viewIcon]}>
                                <Icon name="user" />
                            </View>
                            <View>
                                <TextInput placeholder='Nhập tài khoản' value={UserName} onChangeText={onChangeUserName} />
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
                        <View style={{ marginTop: "2%" }}>
                            <Text style={[styles.textFormLogin]}>Địa chỉ email</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View style={[styles.viewIcon]}>
                                <Icon name="envelope" />
                            </View>
                            <View>
                                <TextInput placeholder='Nhập địa chỉ email' value={Email} onChangeText={onChangeEmail} />
                            </View>
                        </View>
                        {(RequireEmail && Email.length < 1) ? (
                            <View>
                                <Text style={{ color: 'red' }}>Địa chỉ email không được để trống!</Text>
                            </View>
                        ) : (
                            null
                        )}
                        <TouchableOpacity onPress={onClickRegister} style={styles.buttonLogin}>
                            <Text style={{ color: "white", fontSize: 20 }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default Register;
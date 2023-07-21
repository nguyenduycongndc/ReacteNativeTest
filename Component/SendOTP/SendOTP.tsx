import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { environment } from '../../environments/environments';
import axios from 'axios';

const SendOTP = ({ navigation }: any) => {
    const [Email, SetEmail] = useState("useremail@gmail.com");
    const [OTP, SetOTP] = useState("");
    const [Show, SetShow] = useState(false);
    const [PassWordNew, SetPassWordNew] = useState("");
    const [ConfirmPassWord, SetConfirmPassWord] = useState("");

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

    const onClickSendOTP = async () => {
        await axios.post(`${environment.apiUrl}Login/SendOTP`, null, { params: { email: Email } })
            .then(response => {
                if (response.data.data === true) {
                    SetShow(true);
                } else {
                    SetShow(false);
                }
                console.log(response.data);
            })
            .catch(error => {
                console.error({ error });

            });
    };
    const onClickBack = () => {
        navigation.navigate('Login')
    };

    const onClickChangePassWord = async () => {
        await axios.post(`${environment.apiUrl}Login/ForgotPassWord`, { 
            Email: Email,
            OTP: OTP,
            PassWordNew: PassWordNew,
            ConfirmPassWord: ConfirmPassWord
        })
            .then(response => {
                response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.error({ error });

            });
    };
    return (
        <ImageBackground source={require('../../Img/New7.jpg')} style={{ flex: 1 }}>
            <View>
                <TouchableOpacity onPress={onClickBack}>
                    <Icon name="arrow-left" size={30} />
                </TouchableOpacity>
            </View>
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={[styles.textLogin, styles.colorTextWhite]}>Forgot PassWord</Text>
            </View>
            
                <View style={{ marginTop: "2%" }}>
                    <Text style={[styles.textFormLogin]}>Email</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="envelope" />
                    </View>
                    <View>
                        <TextInput placeholder='This Email' value={Email} onChangeText={onChangeEmail} />
                    </View>
                </View>
                {
                    Show ? (
                        <View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>OTP</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="hashtag" />
                                </View>
                                <View>
                                    <TextInput placeholder='This OTP' value={OTP} onChangeText={onChangeOTP} />
                                </View>
                            </View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>PassWord New</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="lock" />
                                </View>
                                <View>
                                    <TextInput secureTextEntry={true} placeholder='This PassWord New' value={PassWordNew} onChangeText={onChangePassWordNew} />
                                </View>
                            </View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>Confirm PassWord</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="lock" />
                                </View>
                                <View>
                                    <TextInput secureTextEntry={true} placeholder='This Confirm PassWord' value={ConfirmPassWord} onChangeText={onChangeConfirmPassWord} />
                                </View>
                            </View>
                            <Pressable style={styles.buttonLogin}>
                                <TouchableOpacity onPress={onClickChangePassWord} activeOpacity={0.1}>
                                    <Text style={{ color: "white", fontSize: 20 }}>Send</Text>
                                </TouchableOpacity>
                            </Pressable >
                        </View>
                    ) : (
                        <Pressable style={styles.buttonLogin}>
                            <TouchableOpacity onPress={onClickSendOTP} activeOpacity={0.1}>
                                <Text style={{ color: "white", fontSize: 20 }}>SendOTP</Text>
                            </TouchableOpacity>
                        </Pressable >
                    )
                }

            </View>
        </ImageBackground>
    )
}
export default SendOTP;
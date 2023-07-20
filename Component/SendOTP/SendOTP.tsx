import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { environment } from '../../environments/environments';
import axios from 'axios';

const SendOTP = ({ navigation }: any) => {
    const [Email, SetEmail] = useState("");
    const onChangeEmail = (value: string) => {
        SetEmail(value);
    };

    // const configurationObject = {
    //     method: 'post',
    //     url: `${environment.apiUrl}Login/SendOTP`,
    //     Param: { email: Email },
    // };
    const onClickSendOTP = async () => {
        await axios.post(`${environment.apiUrl}Login/SendOTP`,{email: Email})
        .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error({ error });

            });
        console.log({ Email });
    };
    const onClickBack = () => {
        navigation.navigate('Login')
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
                <Pressable style={styles.buttonLogin}>
                    <TouchableOpacity onPress={onClickSendOTP}>
                        <Text style={{ color: "white", fontSize: 20 }}>SendOTP</Text>
                    </TouchableOpacity>
                </Pressable >
        </ImageBackground>
    )
}
export default SendOTP;
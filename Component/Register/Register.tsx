import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { environment } from '../../environments/environments';
import axios from 'axios';

const Register = ({ navigation }: any) => {
    const [UserName, SetUserName] = useState("");
    const [PassWord, SetPassWord] = useState("");
    const [Email, SetEmail] = useState("");
    const onChangeUserName = (value: string) => {
        SetUserName(value);
    };
    const onChangePassWord = (value: string) => {
        SetPassWord(value);
    };
    const onChangeEmail = (value: string) => {
        SetEmail(value);
    };
    const onClickRegister = () => {
        console.log({ UserName, PassWord, Email });
    };
    const onClickBack = () => {
        navigation.navigate('Login')
    };

    return (
        <ImageBackground source={require('../../Img/New5.jpg')} style={{ flex: 1 }}>
            <View>
                <TouchableOpacity onPress={onClickBack}>
                    <Icon name="arrow-left" size={30} />
                </TouchableOpacity>
            </View>
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={[styles.textLogin, styles.colorTextWhite]}>Register</Text>
            </View>
            <View style={[styles.bodyForm]}>
                <View>
                    <Text style={[styles.textFormLogin]}>UserName</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="user" />
                    </View>
                    <View>
                        <TextInput placeholder='This UserName' value={UserName} onChangeText={onChangeUserName} />
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
                        <TextInput secureTextEntry={true} placeholder='This PassWord' value={PassWord} onChangeText={onChangePassWord} />
                    </View>
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
                    <TouchableOpacity onPress={onClickRegister}>
                        <Text style={{ color: "white", fontSize: 20 }}>Save</Text>
                    </TouchableOpacity>
                </Pressable >
            </View>
        </ImageBackground>
    )
}
export default Register;
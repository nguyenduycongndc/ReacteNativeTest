import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { environment } from '../../environments/environments';
import axios from 'axios';

const Login = () => {

    const [UserName, SetUserName] = useState("user1");
    const [PassWord, SetPassWord] = useState("123456");

    const configurationObject = {
        method: 'post',
        url: `${environment.apiUrl}Login/LoginUser`,
        data: { userName: UserName, passWord: PassWord, },
      };

    // const onClickLogin = async() => {
    const onClickLogin = () => {
        // const response = await fetch(`${environment.apiUrl}Login/LoginUser`, {
        //     headers:{
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         userName: UserName,
        //         passWord: PassWord,
        //     }),
        //     method: "POST",
        // })
        // console.log({response});
        
        axios.post(`${environment.apiUrl}Login/LoginUser`, {
            userName: UserName,
            passWord: PassWord,
        })
        // axios(configurationObject)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error({error});
                
            });
        console.log({ UserName, PassWord })
    }
    const onChangeUserName = (value: string) => {
        SetUserName(value);
    };
    const onChangePassWord = (value: string) => {
        SetPassWord(value);
    };

    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
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
                <TouchableOpacity>
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
                    <TouchableOpacity>
                        <Text style={styles.textRegister}>REGISTER HERE</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textRegister}>Designed by NDC</Text>
            </View>
        </ImageBackground>
    )
}
export default Login;
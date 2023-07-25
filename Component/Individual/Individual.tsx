import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}


const Individual = ({ navigation }: any) => {
   

    const [loading, setLoading] = useState(false);
    const showLoading = () => {
        setLoading(true);
    };
    const hideLoading = () => {
        setLoading(false);
    };
    const onClickChangePassWord = () => {
        navigation.navigate('ChangePassWord')
    };
    const onClickDetailUser = () => {
        navigation.navigate('DetailUser')
    };
    const onClickLogout = async() => {
        AsyncStorage.clear();
        navigation.navigate('Login')
    };
    return (
        <ImageBackground source={require('../../Img/New11.jpg')} style={{ flex: 1 }}>
            {loading && <LoadingAnimation />}
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={[styles.textLogin, styles.textStyleHeader]}>Cá nhân</Text>
            </View>
            <View style={[styles.bodyForm]}>
                <View style={{ flexDirection: "row", borderBottomWidth: 1, justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={[styles.textStyle]}>Chi tiết người dùng</Text>
                    <TouchableOpacity disabled={loading} onPress={onClickDetailUser}>
                        <Text style={[styles.textStyle]}>|***</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", borderBottomWidth: 1, justifyContent: 'space-between' }}>
                    <Text style={[styles.textStyle]}>Đổi mật khẩu</Text>
                    <TouchableOpacity disabled={loading} onPress={onClickChangePassWord}>
                        <Text style={[styles.textStyle]}>|***</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.footerForm, styles.styleView, styles.StyleFooterIndividual]}>
                <Pressable style={styles.buttonLogout}>
                    <TouchableOpacity onPress={onClickLogout}>
                        <Text style={{ color: "white", fontSize: 20 }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </Pressable >
            </View>
        </ImageBackground>
    )
}
export default Individual;
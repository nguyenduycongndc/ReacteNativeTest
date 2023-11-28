import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import styles from '../Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from '../../environments/environments';
import axios from 'axios';
import { useGetToken } from '../../CustomHook/useGetToken';

function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}


const Individual = ({ navigation }: any) => {
    // const [Token, setToken] = useState("");

    // const handleSetToken = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('Token') || '';
    //         setToken(JSON.parse(token as string));
    //     } catch (error) {
    //         console.log({ error });
    //     }
    // }
    // useEffect(() => {
    //     handleSetToken();
    // }, [])


    const Token = useGetToken();
    const configurationObject = {
        method: 'GET',
        url: `${environment.apiUrl}User/DetailUser`,
        headers: { 'Authorization': `${Token}` },
    };

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
        showLoading();
        axios(configurationObject)
            .then(response => {
                if (response.data != null) {
                    hideLoading();
                    navigation.navigate('DetailUser', { data: response.data.data })
                } else {
                    hideLoading();
                    console.error("Error");
                }
            })
            .catch(error => {
                hideLoading();
                console.error({ error });
            });
    };
    const onClickLogout = async () => {
        AsyncStorage.clear();
        navigation.navigate('Login')
    };
    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{height:'100%'}}>
                {loading && <LoadingAnimation />}
                <View style={[styles.headerForm, styles.styleView]}>
                    <Text style={[styles.textLogin]}>Cá nhân</Text>
                </View>
                <View style={[styles.bodyForm]}>
                    <ScrollView>
                        <View style={{ flexDirection: "row", borderBottomWidth: 1, justifyContent: 'space-between', marginBottom: 20, borderBottomColor: "grey", }}>
                            <Text>Chi tiết người dùng</Text>
                            <TouchableOpacity disabled={loading} onPress={onClickDetailUser}>
                                <Text>|***</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", borderBottomWidth: 1, justifyContent: 'space-between', marginBottom: 20, borderBottomColor: "grey", }}>
                            <Text>Đổi mật khẩu</Text>
                            <TouchableOpacity disabled={loading} onPress={onClickChangePassWord}>
                                <Text>|***</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <View style={[styles.footerForm, styles.styleView, styles.StyleFooterIndividual]}>
                    <TouchableOpacity style={styles.buttonLogout} onPress={onClickLogout}>
                        <Text style={{ color: "white", fontSize: 20 }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground >
    )
}
export default Individual;
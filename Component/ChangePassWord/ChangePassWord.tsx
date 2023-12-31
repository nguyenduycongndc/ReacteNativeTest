import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../../environments/environments';
import Toast from 'react-native-toast-message';
import { useGetToken } from '../../CustomHook/useGetToken';

function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}


const ChangePassWord = ({ navigation }: any) => {

    const [PassWordOld, SetPassWordOld] = useState("");
    //123456
    const [PassWordNew, SetPassWordNew] = useState("");
    //1234567
    const [ConfirmPassWordNew, SetConfirmPassWordNew] = useState("");
    //1234567

    const [RequirePassWordOld, setRequirePassWordOld] = useState(false);
    const [RequirePassWordNew, setRequirePassWordNew] = useState(false);
    const [RequireConfirmPassWord, setConfirmPassWord] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ShowAndHideOld, setShowAndHideOld] = useState(false);
    const [ShowAndHideNew, setShowAndHideNew] = useState(false);
    const [ShowAndHideConfirm, setShowAndHideConfirm] = useState(false);


    const onClickShowAndHideOld = () => {
        setShowAndHideOld((ShowAndHideOld) => !ShowAndHideOld);
    };

    const onClickShowAndHideNew = () => {
        setShowAndHideNew((ShowAndHideNew) => !ShowAndHideNew);
    };

    const onClickShowAndHideConfirm = () => {
        setShowAndHideConfirm((ShowAndHideConfirm) => !ShowAndHideConfirm);
    };
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
    const showLoading = () => {
        setLoading(true);
    }
    const hideLoading = () => {
        setLoading(false);
    }
    const onChangePassWordOld = (value: string) => {
        SetPassWordOld(value);
    };
    const onChangePassWordNew = (value: string) => {
        SetPassWordNew(value);
    };
    const onChangeConfirmPassWord = (value: string) => {
        SetConfirmPassWordNew(value);
    };
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Thay đổi mật khẩu thành công!',
        });
    };
    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Thay đổi mật khẩu thất bại!',
        });
    };
    const checkValidator = () => {
        let isValid = true;
        if (PassWordOld == "") {
            isValid = false;
            setRequirePassWordOld(true)
        };
        if (PassWordNew == "") {
            isValid = false;
            setRequirePassWordNew(true)
        };
        if (ConfirmPassWordNew == "") {
            isValid = false;
            setConfirmPassWord(true)
        };
        return isValid;
    }
    const onClickBack = () => {
        navigation.navigate('Individual')
    };

    const configurationObject: AxiosRequestConfig = {
        method: 'PUT',
        url: `${environment.apiUrl}User/ChangePassWord`,
        headers: { 'Authorization': `${Token}` },
        data: { PassWordOld: PassWordOld, PassWordNew: PassWordNew, ConfirmPassWordNew: ConfirmPassWordNew },
    };
    const onClickChangePassWord = async () => {
        const isValid = checkValidator();
        if (isValid) {
            showLoading();
            await axios(configurationObject)
                .then(response => {
                    console.log(response.data);
                    if (response.data != null) {
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
        };

    }
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
                    <Text style={styles.textLogin}>Thay đổi mật khẩu</Text>
                </View>
                <ScrollView >
                    <View style={[styles.bodyForm]}>
                        <View>
                            <Text style={styles.textFormLogin}>Mật khẩu cũ</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.viewIcon]}>
                                    <Icon name="lock" />
                                </View>
                                <TextInput style={{ flex: 1 }} autoCorrect={false} secureTextEntry={!ShowAndHideOld} placeholder='Nhập mật khẩu cũ' editable={!loading} value={PassWordOld} onChangeText={onChangePassWordOld} />
                            </View>
                            {(ShowAndHideOld) ?
                                (<TouchableOpacity onPress={onClickShowAndHideOld}>
                                    <Icon name="eye-slash" />
                                </TouchableOpacity>)
                                : (<TouchableOpacity onPress={onClickShowAndHideOld}>
                                    <Icon name="eye" />
                                </TouchableOpacity>)
                            }
                        </View>
                        {(RequirePassWordOld && PassWordOld.length < 1) ? (
                            <View>
                                <Text style={{ color: 'red' }}>Mật khẩu cũ không được để trống!</Text>
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
                                <TextInput style={{ flex: 1 }} autoCorrect={false} secureTextEntry={!ShowAndHideNew} editable={!loading} placeholder='Nhập mật khẩu mới' value={PassWordNew} onChangeText={onChangePassWordNew} />
                            </View>
                            {(ShowAndHideNew) ?
                                (<TouchableOpacity onPress={onClickShowAndHideNew}>
                                    <Icon name="eye-slash" />
                                </TouchableOpacity>)
                                : (<TouchableOpacity onPress={onClickShowAndHideNew}>
                                    <Icon name="eye" />
                                </TouchableOpacity>)
                            }
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
                                <TextInput style={{ flex: 1 }} autoCorrect={false} secureTextEntry={!ShowAndHideConfirm} editable={!loading} placeholder='Nhập mật khẩu mới' value={ConfirmPassWordNew} onChangeText={onChangeConfirmPassWord} />
                            </View>
                            {(ShowAndHideConfirm) ?
                                (<TouchableOpacity onPress={onClickShowAndHideConfirm}>
                                    <Icon name="eye-slash" />
                                </TouchableOpacity>)
                                : (<TouchableOpacity onPress={onClickShowAndHideConfirm}>
                                    <Icon name="eye" />
                                </TouchableOpacity>)
                            }
                        </View>
                        {(RequireConfirmPassWord && ConfirmPassWordNew.length < 1) ? (
                            <View>
                                <Text style={{ color: 'red' }}>Mật khẩu không được để trống!</Text>
                            </View>
                        ) : (
                            null
                        )}
                        <TouchableOpacity style={styles.buttonLogin} onPress={onClickChangePassWord}>
                            <Text style={{ color: "white", fontSize: 20 }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </SafeAreaView>
        </ImageBackground>
    )
}
export default ChangePassWord;
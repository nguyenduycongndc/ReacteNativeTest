import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const [PassWordOld, SetPassWordOld] = useState("123456");
const [PassWordNew, SetPassWordNew] = useState("1234567");
const [ConfirmPassWord, SetConfirmPassWord] = useState("1234567");

const [RequirePassWordOld, setRequirePassWordOld] = useState(false);
const [RequirePassWordNew, setRequirePassWordNew] = useState(false);
const [RequireConfirmPassWord, setConfirmPassWord] = useState(false);

function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}
const onClickChangePassWord = () =>{
    
}
const ChangePassWord = ({ navigation }: any) => {

    const [loading, setLoading] = useState(false);
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
    return (
        <ImageBackground source={require('../../Img/New11.jpg')} style={{ flex: 1 }}>
            {loading && <LoadingAnimation />}
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={styles.textLogin}>Thay đổi mật khẩu</Text>
            </View>
            <View style={[styles.bodyForm]}>
                <View>
                    <Text style={styles.textFormLogin}>Mật khẩu cũ</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="lock" />
                    </View>
                    <View>
                        <TextInput placeholder='Nhập mật khẩu cũ' editable={!loading} value={PassWordOld} onChangeText={onChangePassWordOld} />
                    </View>
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
                    <View style={[styles.viewIcon]}>
                        <Icon name="lock" />
                    </View>
                    <View>
                        <TextInput autoCorrect={false} secureTextEntry={true} editable={!loading} placeholder='Nhập mật khẩu mới' value={PassWordNew} onChangeText={onChangePassWordNew} />
                    </View>
                </View>
                {(RequirePassWordNew && PassWordNew.length < 1) ? (
                    <View>
                        <Text style={{ color: 'red' }}>Mật khẩu không được để trống!</Text>
                    </View>
                ) : (
                    null
                )}
                <Pressable style={styles.buttonLogin}>
                    <TouchableOpacity onPress={onClickChangePassWord}>
                        <Text style={{ color: "white", fontSize: 20 }}>Lưu</Text>
                    </TouchableOpacity>
                </Pressable >
            </View>
        </ImageBackground>
    )
}
export default ChangePassWord;
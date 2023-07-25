import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}

const DetailUser = () => {

    const [loading, setLoading] = useState(false);
    const showLoading = () => {
        setLoading(true);
    }
    const hideLoading = () => {
        setLoading(false);
    }

    return (
        <ImageBackground source={require('../../Img/New11.jpg')} style={{ flex: 1 }}>
            {loading && <LoadingAnimation />}
            <View style={[styles.headerForm, styles.styleView]}>
                <Text style={[styles.textLogin, styles.colorTextWhite]}>Chi tiết người dùng</Text>
            </View>
            <View style={[styles.bodyForm]}>
                <View style={{ marginTop: "2%" }}>
                    <Text style={[styles.textFormLogin]}>Tên người dùng</Text>
                </View>
                <View style={[styles.viewRowInput]}>
                    <View style={[styles.viewIcon]}>
                        <Icon name="user" />
                    </View>
                    <View>
                        <TextInput placeholder='Tên người dùng' editable={!loading} />
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: "2%" }}>
                        <Text style={[styles.textFormLogin]}>Địa chỉ email</Text>
                    </View>
                    <View style={[styles.viewRowInput]}>
                        <View style={[styles.viewIcon]}>
                            <Icon name="envelope" />
                        </View>
                        <View>
                            <TextInput placeholder='Nhập địa chỉ email' editable={!loading} />
                        </View>
                    </View>
                    <View style={{ marginTop: "2%" }}>
                        <Text style={[styles.textFormLogin]}>Quyền</Text>
                    </View>
                    <View style={[styles.viewRowInput]}>
                        <View style={[styles.viewIcon]}>
                            <Icon name="lock" />
                        </View>
                        <View>
                            <TextInput secureTextEntry={true} editable={!loading} placeholder='Quyền' />
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}
export default DetailUser;
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import styles from '../Style/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RouteProp, useRoute } from '@react-navigation/native';


type DataDetailUser = {
    id: number,
    fullName: string,
    userName: string,
    isActive: boolean,
    email?: string,
    roleId: number,
    role: string,
    description: string,
}
type ParamList = {
    DetailUser: { data: DataDetailUser };
};
function LoadingAnimation() {
    return (
        <View style={styles.syleLoading}>
            <ActivityIndicator size="large" />
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}

const DetailUser = ({ navigation }: any) => {
    const route = useRoute<RouteProp<ParamList, 'DetailUser'>>();
    const DetailUserData = route.params.data;
    const onClickBack = () => {
        navigation.navigate('Individual')
    };
    const [loading, setLoading] = useState(false);
    const showLoading = () => {
        setLoading(true);
    }
    const hideLoading = () => {
        setLoading(false);
    }
    return (
        <ImageBackground source={require('../../Img/New3.jpg')} style={{ flex: 1 }}>
            <SafeAreaView style={{height:'100%'}}>
                {loading && <LoadingAnimation />}
                <View>
                    <TouchableOpacity onPress={onClickBack}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.headerForm, styles.styleView]}>
                    <Text style={[styles.textLogin]}>Chi tiết người dùng</Text>
                </View>
                <View style={[styles.bodyForm]}>
                    <ScrollView >
                        <View style={{ marginTop: "2%" }}>
                            <Text style={[styles.textFormLogin]}>Tên người dùng</Text>
                        </View>
                        <View style={[styles.viewRowInput]}>
                            <View>
                                <TextInput editable={false} value={DetailUserData.fullName} style={{ color: 'black', fontSize: 18 }} />
                            </View>
                        </View>
                        <View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>Địa chỉ email</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View>
                                    <TextInput editable={false} value={DetailUserData.email} style={{ color: 'black', fontSize: 18 }} />
                                </View>
                            </View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={[styles.textFormLogin]}>Quyền</Text>
                            </View>
                            <View style={[styles.viewRowInput]}>
                                <View>
                                    <TextInput editable={false} value={DetailUserData.role} style={{ color: 'black', fontSize: 18 }} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default DetailUser;
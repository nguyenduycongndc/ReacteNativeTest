import React from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }: any) => {
    const onClickBack = () => {
        navigation.navigate('Login')
    };
    
    return (
        <ImageBackground source={require('../../Img/New6.jpg')} style={{ flex: 1 }}>
            <View>
                {/* <TouchableOpacity onPress={onClickBack}>
                    <Icon name="arrow-left" size={30} />
                </TouchableOpacity> */}
            </View>
        </ImageBackground>
        
    )
}
export default Home;
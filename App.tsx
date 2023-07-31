/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, } from 'react-native';
import Login from './Component/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Component/Register/Register';
import Home from './Component/Home/Home';
import SendOTP from './Component/SendOTP/SendOTP';
import Toast from 'react-native-toast-message';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Individual from './Component/Individual/Individual';
import ChangePassWord from './Component/ChangePassWord/ChangePassWord';
import DetailUser from './Component/DetailUser/DetailUser';
import UploadImg from './Component/UploadImg/UploadImg';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();


// function Root() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={TabRouter} options={{ headerShown: false }} />
//       {/* <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
//       <Drawer.Screen name="SendOTP" component={SendOTP} options={{ headerShown: false }} /> */}
//     </Drawer.Navigator>
//   );
// }

function TabRouter() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Individual" component={Individual} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="UploadImg" component={UploadImg} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="image" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="TabRouter" component={TabRouter} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="SendOTP" component={SendOTP} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassWord" component={ChangePassWord} options={{ headerShown: false }} />
        <Stack.Screen name="DetailUser" component={DetailUser} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;

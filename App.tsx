/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import Login from './Component/Login/Login';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
        <Login />
    </SafeAreaView>
  );
}

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebase from './src/services/firebaseconnection';

import Routes from './src/routes/index';

export default function App() {
 return (
   <NavigationContainer>
     <StatusBar backgroundColor="#00ff00" barStyle="light-content"/>
     <Routes/>
   </NavigationContainer>
  );
}
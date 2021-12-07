import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

import Routes from './src/routes/index';

export default function App() {
 return (
   <NavigationContainer>
     <AuthProvider>
      <StatusBar backgroundColor="#00ff00" barStyle="light-content"/>
      <Routes/>
     </AuthProvider> 
   </NavigationContainer>
  );
}
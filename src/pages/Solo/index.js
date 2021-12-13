import React from 'react';
import {
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Background } from './styles';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

export default function Solo() {

    const navigation = useNavigation();

    return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Background>
            <Header title={'Solos'}/>
            <SafeAreaView>
            </SafeAreaView>
        </Background>
    </TouchableWithoutFeedback>
    );
}
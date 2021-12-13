import React from 'react';
import {
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Background } from './styles';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

export default function Plantacao() {

    const navigation = useNavigation();

    return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Background>
            <Header title={'Plantações'}/>
            <SafeAreaView>
            </SafeAreaView>
        </Background>
    </TouchableWithoutFeedback>
    );
}
import React, { useEffect, useContext} from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import {
    Background,
    AddButton,
    LogoText,
    HeaderContainer,
    SolosList
} from './styles';

import Icon from 'react-native-vector-icons/AntDesign';
import SoloList from '../../components/SoloList';
import { useNavigation } from '@react-navigation/native';
import { CrudContext } from '../../contexts/crud';

import Header from '../../components/Header';

export default function Solo() {

    const navigation = useNavigation();
    const {loading, solosList, handleLoadSolo} = useContext(CrudContext);

    useEffect(()=>{
        async function loadSolos(){
            await handleLoadSolo();
        }
        loadSolos();
    },[]);

    return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Background>
            <Header title={'Solos'}/>
                <HeaderContainer>
                    <LogoText>Adicionar novo solo</LogoText>
                    <AddButton onPress={()=> navigation.navigate('RegisterSolo')}>
                        <Icon name='plussquare' color='#00FF41' size={30} />
                    </AddButton>
                </HeaderContainer>
                {
                    loading ?(
                        <ActivityIndicator size={100} color="#000" style={{marginTop: 30}}/>
                    ):(
                        <SolosList
                            showsVerticalScrollIndicator={false}
                            data={solosList}
                            keyExtrator={item => item.key}
                            renderItem={({item})=> (<SoloList data={item}/>)}
                        />
                    )
                }
        </Background>
    </TouchableWithoutFeedback>
    );
}
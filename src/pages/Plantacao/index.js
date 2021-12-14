import React, { useContext, useEffect } from 'react';
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
    PlantacoesList
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { CrudContext } from '../../contexts/crud';

import Header from '../../components/Header';
import PlantacaoList from '../../components/PlantacaoList';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Plantacao() {

    const navigation = useNavigation();
    const {loading, handleLoadPlantacao, plantacoesList} = useContext(CrudContext);

    useEffect(()=>{
        async function loadPlantacao(){
            await handleLoadPlantacao();
        }
        loadPlantacao();
    },[]);

    return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Background>
            <Header title={'Plantações'}/>
            <HeaderContainer>
                <LogoText>Adicionar nova Plantação</LogoText>
                <AddButton onPress={()=> navigation.navigate('RegisterPlantacao')}>
                    <Icon name='plussquare' color='#00FF41' size={30} />
                </AddButton>
            </HeaderContainer>
            {
                    loading ?(
                        <ActivityIndicator size={100} color="#00FF41" style={{marginTop: 30}}/>
                    ):(
                        <PlantacoesList
                            showsVerticalScrollIndicator={false}
                            data={plantacoesList}
                            keyExtrator={item => item.key}
                            renderItem={({item})=> (<PlantacaoList data={item}/>)}
                        />
                    )
                }
        </Background>
    </TouchableWithoutFeedback>
    );
}
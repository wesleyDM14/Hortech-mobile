import React, { useEffect, useContext} from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { 
    Background,
    HeaderContainer,
    LogoText,
    AddButton,
    CulturasList
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { CrudContext } from '../../contexts/crud';

import Header from '../../components/Header';
import CulturaList from '../../components/CulturaList';

export default function Cultura() {

    const navigation = useNavigation();
    const {loading, culturasList, handleLoadCultura} = useContext(CrudContext);

    useEffect(()=>{
        async function loadCulturas(){
            await handleLoadCultura();
        }
        loadCulturas();
    },[]);

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Background>
            <Header title={'Culturas'}/>
                <HeaderContainer>
                    <LogoText>Adicionar nova Cultura</LogoText>
                    <AddButton onPress={()=> navigation.navigate('RegisterCultura')}>
                        <Icon name='plussquare' color='#00FF41' size={30} />
                    </AddButton>
                </HeaderContainer>
                {
                    loading ?(
                        <ActivityIndicator size={100} color="#000" style={{marginTop: 30}}/>
                    ):(
                        <CulturasList
                            showsVerticalScrollIndicator={false}
                            data={culturasList}
                            keyExtrator={item => item.key}
                            renderItem={({item})=> (<CulturaList data={item}/>)}
                        />
                    )
                }
        </Background>
    </TouchableWithoutFeedback>
    );
}

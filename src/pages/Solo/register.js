import React, {useState, useContext} from 'react';
import {
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import {
    Background,
    Container,
    LogoText,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from './styles';
import {CrudContext} from '../../contexts/crud';
import { useNavigation } from '@react-navigation/native';

export default function RegisterSolo() {

    const [nome, setNome] = useState('');
    const [ph, setPh] = useState('');
    const [composicao, setComposicao] = useState('');

    const navigation = useNavigation();
    const {loading, handleAddSolo } = useContext(CrudContext);

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome==''||ph==''||composicao==''){
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Cadastrar Solo',
            `nome: ${nome}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: ()=>handleAdd()
                }
            ]
        );
    }

    async function handleAdd(){
        await handleAddSolo(nome, ph, composicao);
        navigation.goBack();
    }

 return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Background>
            <SafeAreaView>
                <ScrollView style={{
                    keyboardDismissMode: 'on-drag',
                    centerContent: 'true'
                }}>
                    <Container>
                        <LogoText>Cadastrar Novo Solo</LogoText>
                        <AreaInput>
                            <Input 
                                placeholder="Nome"
                                autoCorrect={false}
                                value= {nome}
                                returnKeyType = 'next'
                                onChangeText = {(text)=>setNome(text)}
                                onSubmitEditing={()=> Keyboard.dismiss()}
                            />
                        </AreaInput>
                        <AreaInput>
                            <Input 
                                placeholder="Ph"
                                autoCorrect={false}
                                keyboardType='numeric'
                                returnKeyType = 'next'
                                maxLength={3}
                                value = {ph}
                                onChangeText = {(text)=>setPh(text)}
                                onSubmitEditing={()=> Keyboard.dismiss()}
                            />
                        </AreaInput>
                        <AreaInput>
                            <Input 
                                placeholder="Composição"
                                autoCorrect={false}
                                value= {composicao}
                                returnKeyType = 'next'
                                multiline = {true}
                                onChangeText = {(text)=>setComposicao(text)}
                                onSubmitEditing={()=> Keyboard.dismiss()}
                            />
                        </AreaInput>
                        <SubmitButton onPress={handleSubmit}>
                            <SubmitText>Cadastrar</SubmitText>
                        </SubmitButton>
                    </Container>
                </ScrollView>
            </SafeAreaView>
        </Background>
    </TouchableWithoutFeedback>
  );
}
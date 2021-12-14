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
    SubmitText,
    CancelButton,
    CancelText
} from './styles';
import {CrudContext} from '../../contexts/crud';

export default function UpdateSolo({route, navigation}) {

    const {data} = route.params;
    const [nome, setNome] = useState(data.nome);
    const [ph, setPh] = useState(data.ph);
    const [composicao, setComposicao] = useState(data.composicao);

    const { loading, handleUpdateSolo } = useContext(CrudContext);

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome==''||ph==''||composicao==''){
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Editar Solo',
            `nome: ${nome}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: ()=>handleConfirm()
                }
            ]
        );
    }

    async function handleConfirm(){
        let key = data.key;
        await handleUpdateSolo(nome, ph, composicao, key);
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
                        <LogoText>Editar Solo</LogoText>
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
                        <CancelButton onPress={()=>navigation.goBack()}>
                            <CancelText>Cancelar</CancelText>
                        </CancelButton>
                    </Container>
                </ScrollView>
            </SafeAreaView>
        </Background>
    </TouchableWithoutFeedback>
  );
}
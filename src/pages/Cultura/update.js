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
import { Picker } from '@react-native-picker/picker';

export default function UpdateCultura({route, navigation}) {

    const {data} = route.params;
    const [nome, setNome] = useState(data.nome);
    const [classificacao, setClassificacao] = useState(data.classificacao);
    const { loading, handleUpdateCultura } = useContext(CrudContext);

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome==''||classificacao==''){
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Editar Cultura',
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
        await handleUpdateCultura(nome, classificacao, key);
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
                        <LogoText>Editar Cultura</LogoText>
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
                        <Picker
                            selectedValue={classificacao}
                            onValueChange={(itemValue, itemIndex)=>
                                setClassificacao(itemValue)
                            }
                            mode='dropdown'
                            style={{
                                width: '90%',
                                borderWidth: 1,
                                backgroundColor: 'rgba(0,0,0,0.20)',
                                marginBottom: 10,
                                borderRadius: 7
                            }}
                        >
                            <Picker.Item label="Briófita" value="briofita" />
                            <Picker.Item label="Pteridófita " value="pteridofita" />
                            <Picker.Item label="Gimnosperma " value="gimnosperma" />
                            <Picker.Item label="Angiosperma " value="angiosperma" />
                        </Picker>
                        <SubmitButton onPress={handleSubmit}>
                            <SubmitText>Editar</SubmitText>
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
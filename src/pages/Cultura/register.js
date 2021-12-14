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
import { Picker } from '@react-native-picker/picker';
import {CrudContext} from '../../contexts/crud';
import { useNavigation } from '@react-navigation/native';

export default function RegisterCultura() {

    const [nome, setNome] = useState('');
    const [classificacao, setClassificacao] = useState('briofita');

    const navigation = useNavigation();
    const { handleAddCultura, loading } = useContext(CrudContext);

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome==''||classificacao==''){
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Cadastrar Cultura',
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
        await handleAddCultura(nome, classificacao);
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
                        <LogoText>Cadastrar Nova Cultura</LogoText>
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
                            <SubmitText>Cadastrar</SubmitText>
                        </SubmitButton>
                   </Container>
               </ScrollView>
           </SafeAreaView>
       </Background>
   </TouchableWithoutFeedback>
  );
}
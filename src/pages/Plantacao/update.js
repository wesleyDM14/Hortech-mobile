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

export default function UpdatePlantacao({route, navigation}) {

    const {data} = route.params;
    const [nome, setNome] = useState(data.nome);
    const [localidade, setLocalidade] = useState(data.localidade);
    const [quantidadeCultura, setQuantidadeCultura] = useState(data.quantidadeCultura);
    const [cultura, setCultura] = useState(data.cultura);
    const [solo, setSolo] = useState(data.solo);
    const { loading, handleUpdatePlantacao, culturasList, solosList } = useContext(CrudContext);

    let storedCulturas = culturasList.map((value, index)=>{
      return(
        <Picker.Item label={value.nome} value={value.key} key={index} />
      )
    });

    let storedSolos = solosList.map((value, index)=>{
      return(
        <Picker.Item label={value.nome} value={value.key} key={index} />
      )
    });

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome==''||localidade==''||quantidadeCultura==''||cultura==''||solo==''){
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Editar Plantação',
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
        await handleUpdatePlantacao(nome, localidade, quantidadeCultura, cultura, solo, key);
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
                        <AreaInput>
                            <Input 
                                placeholder="Localidade"
                                autoCorrect={false}
                                value= {localidade}
                                returnKeyType = 'next'
                                multiline = {true}
                                onChangeText = {(text)=>setLocalidade(text)}
                                onSubmitEditing={()=> Keyboard.dismiss()}
                            />
                        </AreaInput>
                        <Picker 
                          selectedValue={cultura}
                          onValueChange={(itemValue, itemIndex)=>{
                              setCultura(itemValue)
                          }}
                          mode='dropdown'
                          style={{
                            width: '90%',
                            borderWidth: 1,
                            backgroundColor: 'rgba(0,0,0,0.20)',
                            marginBottom: 10,
                            borderRadius: 7
                        }}
                        >
                          {storedCulturas}
                        </Picker>
                        <AreaInput>
                            <Input 
                                placeholder="Quantidade de Culturas"
                                autoCorrect={false}
                                keyboardType='numeric'
                                returnKeyType = 'next'
                                value = {quantidadeCultura}
                                onChangeText = {(text)=>setQuantidadeCultura(text)}
                                onSubmitEditing={()=> Keyboard.dismiss()}
                            />
                        </AreaInput>
                        <Picker 
                          selectedValue={solo}
                          onValueChange={(itemValue, itemIndex)=>{
                              setSolo(itemValue)
                          }}
                          mode='dropdown'
                          style={{
                            width: '90%',
                            borderWidth: 1,
                            backgroundColor: 'rgba(0,0,0,0.20)',
                            marginBottom: 10,
                            borderRadius: 7
                        }}
                        >
                          {storedSolos}
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
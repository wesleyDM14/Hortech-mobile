import React, {useState, useContext, useEffect} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterPlantacao() {

    const [nome, setNome] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [quantidadeCultura, setQuantidadeCultura] = useState('');
    const [cultura, setCultura] = useState('');
    const [solo, setSolo] = useState('');
    const [horario, setHorario] = useState(new Date());
    const [show, setShow] = useState(false);

    const navigation = useNavigation();
    const { 
      handleAddPlantacao, loading, handleLoadCultura, handleLoadSolo,
      solosList, culturasList 
    } = useContext(CrudContext);

    useEffect(()=>{
      async function loadData(){
          await handleLoadSolo();
          await handleLoadCultura();
      }
      loadData();
  },[]);

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

  let showDatePicker = (event, selectedTime)=>{
    setShow(false);
    const currentTime = selectedTime;
    setHorario(currentTime);
  }

    function handleSubmit(){
        Keyboard.dismiss();
        if(nome==''||localidade==''||quantidadeCultura==''||cultura==''||solo==''){
            alert('Preencha todos os campos!');
            return;
        }
        Alert.alert(
            'Cadastrar Plantacao',
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
        await handleAddPlantacao(nome, localidade, quantidadeCultura, cultura, solo, horario);
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
                        <LogoText>Cadastrar Nova Plantacao</LogoText>
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
                           <Picker.Item label="Selecionar Cultura" value='' />
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
                            <Picker.Item label="Selecionar Solo" value='' />
                          {storedSolos}
                        </Picker>
                        <SubmitButton onPress={()=>setShow(true)}>
                            <SubmitText>Cadastrar Horário de Irrigação</SubmitText>
                        </SubmitButton>
                        {
                            show && (
                                <DateTimePicker
                                    value={horario}
                                    mode='time'
                                    is24Hour={true}
                                    display='default'
                                    onChange={showDatePicker}
                                />
                            )
                        }
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
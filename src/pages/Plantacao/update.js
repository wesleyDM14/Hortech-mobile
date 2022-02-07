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
    SubmitText,
    CancelButton,
    CancelText,
    DicaButton,
    EditContainer
} from './styles';
import {CrudContext} from '../../contexts/crud';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';

export default function UpdatePlantacao({route, navigation}) {

    const {data} = route.params;
    const [nome, setNome] = useState(data.nome);
    const [localidade, setLocalidade] = useState(data.localidade);
    const [quantidadeCultura, setQuantidadeCultura] = useState(data.quantidadeCultura);
    const [cultura, setCultura] = useState(data.cultura);
    const [solo, setSolo] = useState(data.solo);
    const [horario, setHorario] = useState();
    const [show, setShow] = useState(false);
    const { loading, handleUpdatePlantacao, handleLoadCultura, handleLoadSolo, culturasList, solosList, getCulturaName, nomeCultura } = useContext(CrudContext);
    const dicasManga = ['Recomenda-se o plantio de manga por meio de enxertia para que a planta produza frutos com características idênticas à planta-mãe.',
                       'A mangueira deve ser cultivada preferencialmente em regiões com clima quente.',
                       'Um dos critérios essenciais ao bom desenvolvimento da planta é não encharcar o solo - caso contrário, a planta pode morrer com o apodrecimento da raiz.',
                       'A adubação da mangueira pode ser realizada com 20 litros de esterco curtido, junto a 250 gramas de superfosfato simples e 250 gramas de calcário.',
                       'É de suma importância fazer o controle de pragas para que as mangueiras não apresentem problemas de produtividade. Por isso, é vital realizar inspeções constantes no pomar para averiguar a presença de cochonilhas'
                      ];
    const dicasMilho = ['O espaçamento convencional varia de 80 cm a 90 cm. O espaçamento reduzido, de 45 cm a 50 cm, sendo o mais utilizado atualmente. Já a profundidade de plantio das sementes de milho varia em relação ao solo.',
                        'dependendo da época de plantio e das cultivares de milho, há um manejo diferente. Fique de olho nas condições meteorológicas da sua região.',
                        'Você precisa fazer a análise de solo para identificar a fertilidade e as necessidades do solo local. Assim, com a interpretação dos dados da análise, é definido o que precisa ser feito na área (calagem, gessagem, qual nutriente está deficiente no solo, etc.).',
                        'Monitore a sua lavoura frequentemente! Fique de olho em possíveis doenças, pragas e plantas daninhas.'
                       ];

    const dicasFeijao = ['A escolha da variedade de semente de feijão a ser cultivada deve ser realizada observando a região em que o plantio será feito. É essencial que a semente seja adaptada às condições climáticas da região em que será cultivada.',
                         'A temperatura para plantar feijão pode variar entre 15°C e 30°C durante todo o ciclo da planta. Contudo, o ideal é que essa temperatura fique entre 18°C e 25°C. Vale ressaltar que o feijão não resiste a baixas temperaturas e geadas.',
                         'O solo mais indicado para o cultivo de feijão é aquele bem drenado, rico em matéria orgânica e fértil. A faixa de pH ideal fica entre 5,5 e 6,5. Para que o cultivo seja bem-sucedido é necessário irrigar mantendo o solo sempre úmido, porém, sem que ele fique encharcado.',
                         'O feijão é uma planta que demanda alta luminosidade, a incidência direta de sol é uma excelente alternativa.',
                         'As sementes de feijão devem ser plantadas no local definitivo a uma profundidade entre 3 e 7 cm. No caso do solo ser pesado, a dica é cultivar a uma profundidade de 3 a 4 cm.',
                         'É fundamental que durante o primeiro mês de cultivo sejam removidas as plantas invasoras, uma vez que elas podem concorrer com o feijão.'

    ];
    const dicasGenericas = ['Regue generosamente, evite apenas borrifar água na planta.',
                            'Regue a terra, e não na folhagem.',
                            'Observe suas plantas, elas dizem muito sobre si, ou seja, é possível perceber quando uma planta está com excesso ou falta de água.',
                            'Compostagem é um conjunto de técnicas aplicadas para estimular a decomposição de compostos orgânicos, que geram um material rico em nutrientes que servem como adubo para a terra.',
                            'Suas plantas precisam de alguns cuidados para que cresçam bonitas e saudáveis, e organização com certeza é uma delas. Seja em um ambiente pequeno ou em um enorme jardim, procure sempre deixar tudo em ordem.'
    ];
    
    useEffect(()=>{
        async function loadData(){
            await handleLoadSolo();
            await handleLoadCultura();
            let aux = data.horario.split(':'); 
            let dataAux = new Date();
            dataAux.setHours(parseInt(aux[0]));
            dataAux.setMinutes(parseInt(aux[1]));
            setHorario(dataAux);
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

    let showDatePicker = (event, selectedTime)=>{
        setShow(false);
        const currentTime = selectedTime;
        setHorario(currentTime);
      }

    let handleShowDicas = () =>{
        getCulturaName(cultura);
        if(nomeCultura == 'Manga'){
            let index = Math.floor(Math.random()*dicasManga.length);
            alert(dicasManga[index]);
        }else if(nomeCultura == 'Feijao'){
            let index = Math.floor(Math.random()*dicasFeijao.length);
            alert(dicasFeijao[index]);
        }else if(nomeCultura == 'Milho'){
            let index = Math.floor(Math.random()*dicasMilho.length);
            alert(dicasMilho[index]);
        }else{
            let index = Math.floor(Math.random()*dicasGenericas.length);
            alert(dicasGenericas[index]);
        }
    }

    async function handleConfirm(){
        let key = data.key;
        await handleUpdatePlantacao(nome, localidade, quantidadeCultura, cultura, solo, horario, key);
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
                        <EditContainer>
                           <LogoText>Editar Plantação</LogoText>
                              <DicaButton onPress={handleShowDicas}>
                                <Icon name='message1' color='#00FF41' size={30} />
                              </DicaButton>
                           </EditContainer>
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
                        <SubmitButton onPress={()=>setShow(true)}>
                            <SubmitText>Editar Horário de Irrigação</SubmitText>
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
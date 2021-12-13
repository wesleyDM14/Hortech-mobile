import React, { useContext, useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { 
  Background, 
  Container,
  Nome
} from './styles';
import Header from '../../components/Header';

import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const {user} = useContext(AuthContext);
  let userFristName = user.nome.split(' ')[0];

  useEffect (()=>{
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return ()=>{
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }
  }, []);

  function handleBackButtonClick(){
    Alert.alert(
      "Exit",
      "Realmente deseja sair?",
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: ()=>BackHandler.exitApp()
        }
      ]
    );
    return true;
  }

  return (
    <Background>
      <Container>
        <Header title={'Hortech App'}/>
        <Nome>Bem Vindo, {userFristName}</Nome>
      </Container>
    </Background>
  );
}
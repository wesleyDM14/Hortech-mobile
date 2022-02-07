import React, { useContext, useEffect } from 'react';
import { 
  Background, 
  Container,
  Nome
} from './styles';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';


export default function Home() {
  constructor()
  const {user} = useContext(AuthContext);
  let userFristName = user.nome.split(' ')[0];

  return (
    <Background>
      <Container>
        <Header title={'Hortech App'}/>
        <Nome>Bem Vindo, {userFristName}</Nome>
      </Container>
    </Background>
  );
}
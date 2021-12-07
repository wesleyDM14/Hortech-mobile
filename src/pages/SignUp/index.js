import React, {useState} from 'react';
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  LogoText,
  SubmitButton,
  SubmitText
} from '../SignIn/styles';

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

 return (
   <Background>
     <Container>
       <LogoText>Criar Conta</LogoText>
       <AreaInput>
       <Input
        placeholder="Nome"
        autoCorrect={false}
        autoCapitalize="none"
        value={nome}
        onChangeText = {(text) => setNome(text)}
        />
       </AreaInput>
       <AreaInput>
       <Input
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText = {(text) => setEmail(text)}
        />
       </AreaInput>
       <AreaInput>
       <Input
        placeholder="Password"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        value = {password}
        onChangeText = {(text)=> setPassword(text)}
        />
       </AreaInput>
       <SubmitButton>
         <SubmitText>Criar Conta</SubmitText>
       </SubmitButton>
     </Container>
   </Background>
  );
}
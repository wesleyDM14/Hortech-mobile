import React, {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
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
  const { signUp } = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, password, nome);
  }
  
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
       <SubmitButton onPress={handleSignUp}>
         <SubmitText>Criar Conta</SubmitText>
       </SubmitButton>
     </Container>
   </Background>
  );
}
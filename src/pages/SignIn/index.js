import React, {useContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  LogoText,
  SubmitButton,
  SubmitText,
  Link,
  LinkText
} from './styles';

export default function SignIn() {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(AuthContext);

  function handleLogin(){
    
  }

 return (
   <Background>
     <Container>
       <Logo source={require('../../assets/Logo.png')}/>
       <LogoText>Hortech</LogoText>
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
       <SubmitButton onPress = {handleLogin}>
         <SubmitText>Login</SubmitText>
       </SubmitButton>
       <Link onPress={() => navigation.navigate('SignUp')}>
        <LinkText>Criar Conta</LinkText>
       </Link>
     </Container>
   </Background>
  );
}
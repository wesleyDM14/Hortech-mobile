import React, {useContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
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
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleLogin(){
    Keyboard.dismiss();
    signIn(email, password);
  }

 return (
  <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
   <Background>
    <ScrollView style={{
        keyboardDismissMode: 'on-drag',
        centerContent: 'true'
      }}>
       <Container
        behavior={Platform.OS ==='ios' ? 'padding' : ''}
        enable
       >
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
          {
             loadingAuth ? (
               <ActivityIndicator size={20} color="#000"/>
             ): (
              <SubmitText>Login</SubmitText>
             )
           }
          </SubmitButton>
          <Link onPress={() => navigation.navigate('SignUp')}>
            <LinkText>Criar Conta</LinkText>
          </Link>
        </Container>
      </ScrollView>
   </Background>
   </TouchableWithoutFeedback>
  );
}
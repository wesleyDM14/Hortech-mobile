import React, {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import {
  Background,
  Container,
  AreaInput,
  Input,
  LogoText,
  SubmitButton,
  SubmitText
} from '../SignIn/styles';
import {
  SafeAreaView, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Alert, 
  ActivityIndicator ,
  ScrollView 
} from 'react-native';

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp(){
    Keyboard.dismiss();
    signUp(email, password, nome);
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
              {
                loadingAuth ?(
                  <ActivityIndicator size={20} color="#000"/>
                ): (
                  <SubmitText>Cadastrar</SubmitText>
                )
              }
            </SubmitButton>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </Background>
   </TouchableWithoutFeedback>
  );
}
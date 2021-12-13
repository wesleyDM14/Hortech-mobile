import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, ButtonLogout, Title } from './styles';
import { Alert } from 'react-native';

import {AuthContext} from '../../contexts/auth';

export default function Header({title}) {

    const {signOut} = useContext(AuthContext);

    function handleSignOut(){
        Alert.alert(
            "Tem certeza?",
            "Realmente deseja sair?",
            [
              {
                text: 'Cancelar',
                style: 'cancel'
              },
              {
                text: 'Sim',
                onPress: ()=>signOut()
              }
            ]
          );
    }

    return (
       <Container>
           <Title>{title}</Title>
           <ButtonLogout onPress= {handleSignOut}>
               <Icon name='logout' color='#00FF41' size={30} />
           </ButtonLogout>
       </Container>
    );
}
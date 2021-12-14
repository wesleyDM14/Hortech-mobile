import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { 
  Container,
  ButtonLogout,
  Title,
  ButtonMenu
} from './styles';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';

export default function Header({title}) {

    const {signOut} = useContext(AuthContext);
    const navigation = useNavigation();

    function handleSignOut(){
        Alert.alert(
            "Logout de Usuário",
            "Realmente deseja deslogar?",
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
          <ButtonMenu onPress = {()=>navigation.toggleDrawer()}>
              <Icon name='menuunfold' color='#00FF41' size={32} />
          </ButtonMenu>
           <Title>{title}</Title>
           <ButtonLogout onPress= {handleSignOut}>
               <Icon name='logout' color='#00FF41' size={30} />
           </ButtonLogout>
       </Container>
    );
}
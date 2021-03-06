import React, {useContext} from 'react';
import{
    Container,
    Button,
    Nome,
    DeleteButton
} from './styles';
import {CrudContext} from '../../contexts/crud';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

export default function SoloList({data}) {

    const { handleDeleteSolo } = useContext(CrudContext);
    const navigation = useNavigation();

    function handleConfirm(){
        Alert.alert(
            'Excluir Solo',
            `nome: ${data.nome}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: ()=> handleDelete()
                }
            ]
        );
    }

    async function handleDelete(){
        let key = data.key;
        await handleDeleteSolo(key);
    }

    return (
        <Container>
            <Button onPress={()=> navigation.navigate('UpdateSolo',{data: data} )}>
                <Nome>{data.nome}</Nome>
            </Button>
            <DeleteButton onPress = {handleConfirm}>
                <Icon name='trash' color='#ff0000' size={50}/>
            </DeleteButton>
        </Container>
       );
}
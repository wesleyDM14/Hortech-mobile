import React, {createContext, useContext, useState} from 'react';
import firebase from '../services/firebaseconnection';
import { AuthContext } from './auth';

export const CrudContext = createContext({});

function CrudProvider({ children }){

    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [solosList, setSolosList] = useState([]);

    async function handleAddSolo(nome, ph, composicao){
        let uid = user.uid;
        let key = await firebase.database().ref('solo').child(uid).push().key;
        await firebase.database().ref('solo').child(uid).child(key).set({
            nome: nome,
            ph: ph,
            composicao: composicao
        })
        .then(()=>{
            alert('Solo Cadastrado com sucesso!');
            setLoading(false);
        }).catch((error)=>{
            alert(error.code);
            setLoading(false);
        });
    }

    async function handleLoadSolo(){
        setLoading(true);
        let uid = user.uid;
        await firebase.database().ref('solo').child(uid).orderByChild('nome')
          .on('value',(snapshot)=>{
            setSolosList([]);
            snapshot.forEach((childItem)=>{
                let list ={
                    key: childItem.key,
                    nome: childItem.val().nome,
                    ph: childItem.val().ph,
                    composicao: childItem.val().composicao
                }
                setSolosList(oldArray => [...oldArray, list]);
            })
                setLoading(false);
            })
      }

      async function handleDeleteSolo(key){
        let uid = user.uid;
        await firebase.database().ref('solo').child(uid).child(key).remove()
        .then(()=>{
            alert('Solo excluido com sucesso.')
        }).catch((error)=>{
            alert(error.code);
        })
      }

      async function handleUpdateSolo(nome, ph, composicao, key){
          setLoading(true);
          let uid = user.uid;
          await firebase.database().ref('solo').child(uid).child(key).set({
                nome: nome,
                ph: ph,
                composicao: composicao
            })
            .then(()=>{
                alert('Solo Editado Com Sucesso.');
                setLoading(false);
            }).catch((error)=> {
                alert(error.code);
                setLoading(false);
            });
      }

    return(
        <CrudContext.Provider value={{loading, handleAddSolo, handleLoadSolo, solosList, handleDeleteSolo, handleUpdateSolo }}>
            {children}
        </CrudContext.Provider>
    );

}

export default CrudProvider;
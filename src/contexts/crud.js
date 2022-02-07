import React, {createContext, useContext, useState} from 'react';
import firebase from '../services/firebaseconnection';
import { AuthContext } from './auth';
import NotifyService from '../services/NotifyService';

export const CrudContext = createContext({});

function CrudProvider({ children }){

    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [solosList, setSolosList] = useState([]);
    const [culturasList, setCulturasList] = useState([]);
    const [plantacoesList, setPlantacoesList] = useState([]);
    const [nomeCultura, setNomeCultura] = useState('');
    const notifyService = new NotifyService();

    async function handleAddSolo(nome, ph, composicao){
        setLoading(true);
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

      async function handleAddCultura(nome, classificacao){
          setLoading(true);
          let uid = user.uid;
          let key = await firebase.database().ref('cultura').child(uid).push().key;
          await firebase.database().ref('cultura').child(uid).child(key).set({
                nome: nome,
                classificacao: classificacao
            })
            .then(()=>{
                alert('Cultura Cadastrada com sucesso!');
                setLoading(false);
            }).catch((error)=>{
                alert(error.code);
                setLoading(false);
            });
      }

      async function handleLoadCultura(){
        setLoading(true);
        let uid = user.uid;
        await firebase.database().ref('cultura').child(uid).orderByChild('nome')
          .on('value',(snapshot)=>{
            setCulturasList([]);
            snapshot.forEach((childItem)=>{
                let list ={
                    key: childItem.key,
                    nome: childItem.val().nome,
                    classificacao: childItem.val().classificacao
                }
                setCulturasList(oldArray => [...oldArray, list]);
            })
                setLoading(false);
            })
      }

      async function handleDeleteCultura(key){
        let uid = user.uid;
        await firebase.database().ref('cultura').child(uid).child(key).remove()
        .then(()=>{
            alert('Cultura excluida com sucesso.')
        }).catch((error)=>{
            alert(error.code);
        })
      }

      async function handleUpdateCultura(nome, classificacao, key){
        setLoading(true);
        let uid = user.uid;
        await firebase.database().ref('cultura').child(uid).child(key).set({
                nome: nome,
                classificacao: classificacao
        })
        .then(()=>{
                alert('Cultura Editada Com Sucesso.');
                setLoading(false);
        }).catch((error)=> {
                alert(error.code);
                setLoading(false);
        });
      }

      async function handleAddPlantacao(nome, localidade, quantidadeCultura, cultura, solo, horario){
        setLoading(true);
        let uid = user.uid;
        let notifyUid = parseInt(new Date().getTime()/1000);
        let horarioString = horario.getHours() +':'+horario.getMinutes();
        let key = await firebase.database().ref('plantacao').child(uid).push().key;
        await firebase.database().ref('plantacao').child(uid).child(key).set({
              nome: nome,
              localidade: localidade,
              quantidadeCultura: quantidadeCultura,
              cultura: cultura,
              solo: solo,
              horario: horarioString,
              notifyUid: notifyUid
          })
          .then(()=>{
              alert('Plantação Cadastrada com sucesso!');
              notifyService.scheduleNotify(notifyUid, nome, horario);
              setLoading(false);
          }).catch((error)=>{
              alert(error.code);
              setLoading(false);
          });
      }

      async function handleLoadPlantacao(){
        setLoading(true);
        let uid = user.uid;
        await firebase.database().ref('plantacao').child(uid).orderByChild('nome')
          .on('value',(snapshot)=>{
            setPlantacoesList([]);
            snapshot.forEach((childItem)=>{
                let list ={
                    key: childItem.key,
                    nome: childItem.val().nome,
                    localidade: childItem.val().localidade,
                    quantidadeCultura: childItem.val().quantidadeCultura,
                    cultura: childItem.val().cultura,
                    solo: childItem.val().solo,
                    horario: childItem.val().horario
                }
                setPlantacoesList(oldArray => [...oldArray, list]);
            })
                setLoading(false);
            })
      }

      async function handleDeletePlantacao(key){
        let uid = user.uid;
        let notifyUid = '';
        await firebase.database().ref('plantacao').child(uid).child(key)
        .once('value', (snapshot)=>{
            notifyUid = snapshot.val().notifyUid;
        });
        await firebase.database().ref('plantacao').child(uid).child(key).remove()
        .then(()=>{
            notifyService.cancelNotify(notifyUid);
            alert('Plantação excluida com sucesso.');
        }).catch((error)=>{
            alert(error.code);
        })
      }

      async function handleUpdatePlantacao(nome, localidade, quantidadeCultura, cultura, solo, horario, key){
        setLoading(true);
        let uid = user.uid;
        let horarioString = horario.getHours() +':'+horario.getMinutes();
        let notifyUid = '';
        await firebase.database().ref('plantacao').child(uid).child(key)
        .once('value', (snapshot)=>{
            notifyUid = snapshot.val().notifyUid;
        });
        notifyService.cancelNotify(notifyUid);
        notifyUid = parseInt(new Date().getTime()/1000);
        await firebase.database().ref('plantacao').child(uid).child(key).set({
            nome: nome,
            localidade: localidade,
            quantidadeCultura: quantidadeCultura,
            cultura: cultura,
            solo: solo,
            horario: horarioString,
            notifyUid: notifyUid
        })
        .then(()=>{
                alert('Plantação Editada Com Sucesso.');
                setLoading(false);
                notifyService.scheduleNotify(notifyUid, nome, horario);
        }).catch((error)=> {
                alert(error.code);
                setLoading(false);
        });
      }


      async function getCulturaName(key){
        let uid = user.uid;
        let name = '';
        await firebase.database().ref('cultura').child(uid).child(key)
        .once('value', (snapshot)=>{
            name = snapshot.val().nome;
        });
        setNomeCultura(name);
      }

    return(
        <CrudContext.Provider value={{
            loading, handleAddSolo, handleLoadSolo, solosList, 
            handleDeleteSolo, handleUpdateSolo, handleAddCultura,
            handleLoadCultura, culturasList, handleDeleteCultura,
            handleUpdateCultura, handleLoadPlantacao, handleAddPlantacao,
            handleDeletePlantacao, handleUpdatePlantacao, plantacoesList,
            getCulturaName, nomeCultura
        }}>
            {children}
        </CrudContext.Provider>
    );

}

export default CrudProvider;
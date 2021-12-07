import React, { useState, createContext, useEffect } from "react";
import firebase from '../services/firebaseconnection';
import AsyncStorageLib from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorage(){
            const storageUser = await AsyncStorageLib.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

    //cadastrar de usuario
    async function signUp(email, password, nome){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                nome: nome
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                }
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error)=>{
            alert(error.code);
        });
    }

    //logar usuario
    async function signIn(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot)=>{
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email,
                };

                setUser(data);
                storageUser(data);
            })
        })
        .catch((error)=>{
            alert(error.code);
        });
    }

    async function signOut(){
        await firebase.auth().signOut();
        await AsyncStorageLib.clear()
        .then(()=>{
            setUser(null);
        });
    }

    async function storageUser(data){
        await AsyncStorageLib.setItem('Auth_user', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>   
       );
}

export default AuthProvider;
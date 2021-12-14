import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Cultura from '../pages/Cultura';
import Solo from '../pages/Solo';
import Plantacao from '../pages/Plantacao';

import RegisterSolo from '../pages/Solo/register';
import UpdateSolo from '../pages/Solo/update';
import RegisterCultura from '../pages/Cultura/register';
import UpdateCultura from '../pages/Cultura/update';

import CrudProvider from '../contexts/crud';

const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

function DrawerRoutes(){
    return (
        <CrudProvider>
            <AppDrawer.Navigator>
                <AppDrawer.Screen name="Home" component={Home} />
                <AppDrawer.Screen name="Culturas" component={Cultura} />
                <AppDrawer.Screen name="Plantações" component={Plantacao} />
                <AppDrawer.Screen name="Solos" component={Solo} />
            </AppDrawer.Navigator>
        </CrudProvider>
    );
}

function AppRoutes(){
    return (
        <CrudProvider>
            <AppStack.Navigator>
                <AppStack.Screen 
                    name="Main" 
                    component={DrawerRoutes} 
                    options={{headerShown: false}}
                />
                <AppStack.Screen 
                    name="RegisterSolo"
                    component={RegisterSolo}
                    options={{
                        headerStyle:{
                            backgroundColor: '#00b94a',
                            borderBottomWidth: 1
                        },
                        headerTintColor: '#FFF',
                        headerBackTitleVisible: false,
                        headerTitle: 'Voltar'
                    }}
                />
                <AppStack.Screen 
                    name="UpdateSolo"
                    component={UpdateSolo}
                    options={{
                        headerStyle:{
                            backgroundColor: '#00b94a',
                            borderBottomWidth: 1
                        },
                        headerTintColor: '#FFF',
                        headerBackTitleVisible: false,
                        headerTitle: 'Voltar'
                    }}
                />
                <AppStack.Screen 
                    name="RegisterCultura"
                    component={RegisterCultura}
                    options={{
                        headerStyle:{
                            backgroundColor: '#00b94a',
                            borderBottomWidth: 1
                        },
                        headerTintColor: '#FFF',
                        headerBackTitleVisible: false,
                        headerTitle: 'Voltar'
                    }}
                />
                <AppStack.Screen 
                    name="UpdateCultura"
                    component={UpdateCultura}
                    options={{
                        headerStyle:{
                            backgroundColor: '#00b94a',
                            borderBottomWidth: 1
                        },
                        headerTintColor: '#FFF',
                        headerBackTitleVisible: false,
                        headerTitle: 'Voltar'
                    }}
                />
            </AppStack.Navigator>
        </CrudProvider>
    );
}

export default AppRoutes;
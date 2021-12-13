import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Cultura from '../pages/Cultura';
import Solo from '../pages/Solo';
import Plantacao from '../pages/Plantacao';

const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

function DrawerRoutes(){
    return (
        <AppDrawer.Navigator>
            <AppDrawer.Screen name="Home" component={Home} />
            <AppDrawer.Screen name="Culturas" component={Cultura} />
            <AppDrawer.Screen name="Plantações" component={Plantacao} />
            <AppDrawer.Screen name="Solos" component={Solo} />
        </AppDrawer.Navigator>
    );
    
}

function AppRoutes(){
    return (
        <AppStack.Navigator>
            <AppStack.Screen 
                name="Home" 
                component={DrawerRoutes} 
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
    );
}

export default AppRoutes;
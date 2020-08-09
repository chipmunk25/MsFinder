import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Home';
import FaqScreen from './FAQ';
import MainTabNavigator from '../MainTabs';
import SideDrawerContent from './DrawerContent';


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <SideDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={MainTabNavigator} />
            <Drawer.Screen name="Faq" component={FaqScreen} />
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;
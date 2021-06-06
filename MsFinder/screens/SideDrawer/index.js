import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FaqScreen from './FAQ';
import MainTabNavigator from '../MainTabs';
import SideDrawerContent from './DrawerContent';
import PrivacyScreen from './Privacy';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

const FaqStack = createStackNavigator();
const PrivacyStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {

    const FaqsScreen = ({ navigation }) => {
        return (
            <FaqStack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4f83cc'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            >
                <FaqStack.Screen name="Faq" component={FaqScreen}
                    options={{
                        title: 'Faq',
                        headerLeft: () => (
                            <Icon.Button
                                name="ios-menu" size={25}
                                backgroundColor="#4f83cc"
                                onPress={() => navigation.toggleDrawer()}
                            >

                            </Icon.Button>
                        )

                    }}
                />
            </FaqStack.Navigator>

        )

    }


    const PrivacyPolicyScreen = ({ navigation }) => {
        return (
            <PrivacyStack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4f83cc'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            >
                <PrivacyStack.Screen name="Privacy" component={PrivacyScreen}
                    options={{
                        title: 'Privacy',
                        headerLeft: () => (
                            <Icon.Button
                                name="ios-menu" size={25}
                                backgroundColor="#4f83cc"
                                onPress={() => navigation.toggleDrawer()}
                            >

                            </Icon.Button>
                        )

                    }}
                />
            </PrivacyStack.Navigator>

        )
    }
    return (
        <Drawer.Navigator drawerContent={props => <SideDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={MainTabNavigator} />
            <Drawer.Screen name="Faq" component={FaqsScreen} />
            <Drawer.Screen name="Privacy" component={PrivacyPolicyScreen} />
        </Drawer.Navigator>
    );
};
export default DrawerNavigator;
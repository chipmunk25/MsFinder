import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import HomeStackNavigator from '../HomeStack';
import AddLocationStackNavigator from '../AddLocationScreen';
import LocationStackNavigator from '../StoreLocator';
//add-location

const MainTabs = createBottomTabNavigator();
const MainTabNavigator = () => {
    return (
        <MainTabs.Navigator>
            <MainTabs.Screen name="MapScreen" component={HomeStackNavigator}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="md-map" color={color} size={size} />
                    ),
                }}
            />
            <MainTabs.Screen name="AddLocation" component={AddLocationStackNavigator}
                options={{
                    tabBarLabel: 'Add Location',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="add-location" color={color} size={size} />
                    ),
                }}
            />
            <MainTabs.Screen name="Locations" component={LocationStackNavigator}
                options={{
                    tabBarLabel: 'Locations',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-location-sharp" color={color} size={size} />
                    ),
                }}
            />
        </MainTabs.Navigator>
    );
};

export default MainTabNavigator;
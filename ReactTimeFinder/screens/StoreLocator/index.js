import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StoreLocationScreen from './StoreLocations';
import Icon from 'react-native-vector-icons/Ionicons';

const LocationStack = createStackNavigator();
const LocationStackNavigator = ({navigation}) => {
    return (
        <LocationStack.Navigator
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
            <LocationStack.Screen name="LocationScreen" component={StoreLocationScreen}
             options={{
                title: 'Locations',
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
        </LocationStack.Navigator>
    );
};

export default LocationStackNavigator;
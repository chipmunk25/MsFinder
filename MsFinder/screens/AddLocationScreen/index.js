import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AddLocationScreen from './AddLocation';
import Icon from 'react-native-vector-icons/Ionicons';

const AddLocationStack = createStackNavigator();
const AddLocationStackNavigator = ({navigation}) => {
    return (
        <AddLocationStack.Navigator
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

            <AddLocationStack.Screen name="AddLocationScreen" component={AddLocationScreen}
             options={{
                title: 'Add Location',
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
        </AddLocationStack.Navigator>
    );
};

export default AddLocationStackNavigator;
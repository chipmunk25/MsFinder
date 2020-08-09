import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const HomeStackNavigator = ({ navigation }) => {
    return (
        <HomeStack.Navigator
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
            <HomeStack.Screen name="MapScreen" component={MapScreen}
                options={{
                    title: 'Maps',
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
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
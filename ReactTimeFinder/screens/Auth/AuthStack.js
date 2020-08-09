import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';


const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="SignIn"
            // screenOptions={{ headerShown: false }}
            headerMode="none"
        >
            <AuthStack.Screen name="SignIn" component={SignInScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;
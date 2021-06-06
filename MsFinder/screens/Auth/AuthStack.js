import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Welcome/SignInScreen';
import SignUpScreen from '../Welcome/SignUpScreen';
import SplashScreen from '../Welcome/SplashScreen';


const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            headerMode="none"
        >
            <AuthStack.Screen name="Splash" component={SplashScreen} />
            <AuthStack.Screen name="SignIn" component={SignInScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;
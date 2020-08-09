/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackNavigator from './screens/Auth/AuthStack';
import DrawerNavigator from './screens/SideDrawer';


import { connect } from 'react-redux';

const App = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
       {
        isAuthenticated ?  <DrawerNavigator />: <AuthStackNavigator />
      } 
  
    </NavigationContainer>
  );
};
const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated }
}

export default connect(mapStateToProps)(App);

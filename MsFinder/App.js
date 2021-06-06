/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { ActivityIndicator, Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

import AuthStackNavigator from './screens/Auth/AuthStack';
import DrawerNavigator from './screens/SideDrawer';

import { connect } from 'react-redux';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { isLoadingStop } from './stores/actions';
import * as Animatable from 'react-native-animatable';
const App = ({ isAuthenticated, isDarkTheme }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => { setTimeout(() => { setIsLoading(false) }, 1000) }, [])
  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E7E2F1' }}>
      <ActivityIndicator animating size="large" color='#2d4def' />
      <Text style={styles.title}>MsFinder</Text>
      <View style={styles.logoContainer}>
        <View style={styles.logoInnerContainer}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require("./assets/img/logo.png")}
            style={styles.logo}
            resizeMode="stretch"
          />


        </View>
      </View>
    </View>
  )

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <DrawerNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;
const container_logo = height_logo + 20;
const inner_logo = height_logo + 10;
const logoborder = container_logo / 2
const innerborder = inner_logo / 2
const styles = StyleSheet.create({
  logoContainer: {
    width: container_logo,
    height: container_logo,
    borderRadius: logoborder,
    backgroundColor: '#fff',
    alignContent: 'center'
  },
  logoInnerContainer: {
    borderColor: '#146A90',
    borderWidth: 4,
    width: inner_logo,
    height: inner_logo,
    borderRadius: innerborder,
    alignContent: 'center',
    margin: 5
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#05375a',
    fontSize: 50,
    fontWeight: 'bold',
    paddingBottom: 20
  }
})
const mapStateToProps = state => {
  const { isDarkTheme, isLoading, isAuthenticated } = state.auth
  return { isAuthenticated, isLoading, isDarkTheme }
}

export default connect(mapStateToProps, { isLoadingStop: isLoadingStop })(App);

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from './Logo';
import Footer from './Footer';
import SignForm from './signForm';
import { requestSignIn, requestAutoSignIn } from '../../stores/actions';
import { connect } from 'react-redux';

const SignInScreen = ({ navigation, SignIn, onAutoLogin }) => {
    const [state, setState] = useState({ email: '', password: '', returnSecureToken: true })
    const SignInHandler = () => SignIn({ values: state })
    const GotoScreen = () => navigation.navigate('SignUp')
    useEffect(() => { onAutoLogin() }, [])
    return (
        <View style={styles.container}>
            <Logo />
            <SignForm actionHandler={SignInHandler} setState={setState} buttonText={"Login"} />
            <Footer title={"Don't have an account yet?"} description={"Sign Up"} onPress={GotoScreen} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default connect(null, { SignIn: requestSignIn, onAutoLogin: requestAutoSignIn })(SignInScreen);
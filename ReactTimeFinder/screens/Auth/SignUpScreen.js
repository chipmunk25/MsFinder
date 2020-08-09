import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from './Logo';
import Footer from './Footer';

import SignForm from './signForm';
import { connect } from 'react-redux';
import { requestSignUp } from '../../stores/actions';

const SignUpScreen = ({ navigation, SignUp }) => {
    const GotoScreen = () => navigation.navigate('SignIn')
    const [state, setState] = useState({ email: '', password: '', returnSecureToken: true })
    const SignUpHandler = () => SignUp({ values: state })

    return (
        <View style={styles.container}>
            <Logo />
            <SignForm actionHandler={SignUpHandler} setState={setState} buttonText={"Sign Up"} />
            <Footer title={"Already have an account?"} description={"Sign In"} onPress={GotoScreen} />
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

export default connect(null, { SignUp: requestSignUp })(SignUpScreen);
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { requestSignUp } from '../../stores/actions';

const SignForm = ({ SignUp, isLoading ,actionHandler,setState,buttonText}) => {
  //  const [state, setState] = useState({ email: '', password: '', returnSecureToken: true })
   // const SignInHandler = () => SignUp({ values: state })
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
                onChangeText={(email) => setState(prevState => { return { ...prevState, email } })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Email"
                placeholderTextColor="#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
            />
            <TextInput style={styles.inputBox}
                onChangeText={(password) => setState(prevState => { return { ...prevState, password } })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#002f6c"
            />
            {
                isLoading ?
                    <ActivityIndicator /> :
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={actionHandler}>{buttonText}</Text>
                    </TouchableOpacity>
            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        marginVertical: 30
    },
    title: {
        fontSize: 20,
        fontWeight: '500'
    },
    logoText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A0DAB'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signInContainer: {
        height: Dimensions.get('screen').height / 2,
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
const mapStateToProps = (state) => {
    return { isLoading: state.auth.isLoading }
}
export default connect(mapStateToProps, { SignUp: requestSignUp })(SignForm);




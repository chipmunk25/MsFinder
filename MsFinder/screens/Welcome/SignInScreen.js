import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, TextInput, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient"
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Footer from './Footer';
import { connect } from 'react-redux';
import { requestSignIn, requestAutoSignIn } from '../../stores/actions';
import * as EmailValidator from 'email-validator';
import Loader from '../../components/loader';
const SignInScreen = ({ navigation, SignIn, isLoading }) => {
    const { colors } = useTheme();
    const [data, setData] = React.useState({
        email: '', password: '', check_textInputChange: false, secureTextEntry: true, isValidUser: true, isValidPassword: true
    })
    const SignInHandler = () => {
        if (data.email.length === 0 || data.password.length === 0) {
            Alert.alert('Wrong Input!', "Username or password field cannot be empty.", [{ text: 'okay' }])
            return;
        }
        else {
            SignIn({ values: data })
        }
    }
    const textInputChange = email => {
        if (EmailValidator.validate(email)) {
            setData({ ...data, email, check_textInputChange: true, isValidUser: true })
        } else {
            setData({ ...data, email, check_textInputChange: false, isValidUser: false })
        }
    }
    const handlePasswordChange = password => {
        if (password.trim().length >= 6) {
            setData({ ...data, password, isValidPassword: true })
        } else {
            setData({ ...data, password, isValidPassword: false })
        }
    }
    const handleValidPassword = password => {
        if (password.trim().length >= 6) {
            setData({ ...data, password, isValidPassword: true })
        } else {
            setData({ ...data, password, isValidPassword: false })
        }
    }

    const updateSecureTextEntry = () => setData({ ...data, secureTextEntry: !data.secureTextEntry })
    const GotoScreen = () => navigation.navigate('SignUp')

    const handleValidUser = email => {
        if (EmailValidator.validate(email)) {
            setData({ ...data, isValidUser: true })
        } else {
            setData({ ...data, isValidUser: false })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#2d4def' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                duration={1500}
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}>
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}> Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Email"
                        style={[styles.textInput, { color: colors.text, backgroundColor: colors.background }]}
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {
                        data.check_textInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>

                            : null
                    }
                </View>
                {
                    data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username must be a Valid Email.</Text>
                        </Animatable.View>
                }
                <Text style={[styles.text_footer, { marginTop: 35, color: colors.text }]}> Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        style={[styles.textInput, { color: colors.text, backgroundColor: colors.background }]}
                        autoCapitalize="none"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val) => handlePasswordChange(val)}
                        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {
                    data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be a 6 characters long.</Text>
                        </Animatable.View>
                }
                <Loader loading={isLoading} />
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => SignInHandler()}>
                        <LinearGradient
                            colors={['#4f83cc', '#146A90']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign In</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Footer title={"Don't have an account yet?"} description={"Sign Up"} onPress={GotoScreen} />
            </Animatable.View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d4def'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        backgroundColor: '#fff',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    errorMsg: {
        color: 'red'
    }
})
const mapStateToProps = state => {
    const { isDarkTheme, isLoading, isAuthenticated } = state.auth
    return { isAuthenticated, isLoading, isDarkTheme }
}

export default connect(mapStateToProps, { SignIn: requestSignIn })(SignInScreen);
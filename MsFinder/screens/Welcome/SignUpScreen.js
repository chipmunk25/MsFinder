import React from 'react';
import { View, StyleSheet, Platform, TextInput, Text, Dimensions, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient"
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Footer from './Footer';
import * as EmailValidator from 'email-validator';
import { connect } from 'react-redux';
import { requestSignUp } from '../../stores/actions';
import Loader from '../../components/loader';
const SignUpScreen = ({ navigation, SignUp,isLoading }) => {
    const { colors } = useTheme();
    const [data, setData] = React.useState({
        displayName:'Desmond',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    })
    const SignUpHandler = () => {
        if (data.email.length === 0 || data.password.length === 0) {
            Alert.alert('Wrong Input!', "Username or password field cannot be empty.", [{ text: 'okay' }])
            return;
        }
        if (data.password.trim() !== data.confirm_password.trim()) {
            Alert.alert('Wrong Input!', "Password and Confirm password not the Same.", [{ text: 'okay' }])
            return;
        }

        else {
            const { email, password } = data
            SignUp({ values: { email, password } })
        }
    }
    const textInputChange = email => {
        if (EmailValidator.validate(email)) {
            setData({ ...data, email, check_textInputChange: true, isValidUser: true })
        } else {
            setData({ ...data, email, check_textInputChange: false, isValidUser: false })
        }
    }
    const handleValidUser = email => {
        if (EmailValidator.validate(email)) {
            setData({ ...data, isValidUser: true })
        } else {
            setData({ ...data, isValidUser: false })
        }
    }
    const handlePasswordChange = password => {
        if (password.trim().length >= 6) {
            setData({ ...data, password, isValidPassword: true })
        } else {
            setData({ ...data, password, isValidPassword: false })
        }
    }

    const handleConfirmPasswordChange = confirm_password => {
        if (confirm_password.trim() === data.password) {
            setData({ ...data, confirm_password, isValidConfirmPassword: true })
        } else {
            setData({ ...data, confirm_password, isValidConfirmPassword: false })
        }
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    const GotoScreen = () => navigation.navigate('SignIn')
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#2d4def' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
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
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Email"
                        style={[styles.textInput, { color: colors.text, backgroundColor: colors.background }]}
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
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
                <Text style={[styles.text_footer, { marginTop: 20, color: colors.text }]}> Password</Text>

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
                        onEndEditing={(e) => handlePasswordChange(e.nativeEvent.text)}
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
                <Text style={[styles.text_footer, { marginTop: 20, color: colors.text }]}> Confirm Password</Text>

                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        style={[styles.textInput, { color: colors.text, backgroundColor: colors.background }]}
                        autoCapitalize="none"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                        onEndEditing={(e) => handleConfirmPasswordChange(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
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
                    data.isValidConfirmPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Confirm Password must be the same as Password.</Text>
                        </Animatable.View>
                }
                <Loader loading={isLoading} />
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => SignUpHandler()}>
                        <LinearGradient
                            colors={['#4f83cc', '#146A90']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Footer title={"Already have an account?"} description={"Sign In"} onPress={GotoScreen} />
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
        marginTop: 30
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
    const { isDarkTheme, isLoading } = state.auth
    return {  isLoading, isDarkTheme }
}

export default connect(mapStateToProps, { SignUp: requestSignUp })(SignUpScreen);
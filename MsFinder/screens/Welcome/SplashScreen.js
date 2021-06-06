import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { requestAutoSignIn } from '../../stores/actions';
const SplashScreen = ({ navigation, onAutoLogin }) => {
    const { colors } = useTheme();
    useEffect(() => {
        onAutoLogin()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoInnerContainer}>
                        <Animatable.Image
                            animation="bounceIn"
                            duration={1500}
                            source={require("../../assets/img/logo.png")}
                            style={styles.logo}
                            resizeMode="stretch"
                        />
                    </View>
                </View>
            </View>
            <Animatable.View animation="fadeInUpBig"
                duration={1500}
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}>
                <Text style={[styles.title, {
                    color: colors.text
                }]}>Welcome to MsFinder Stay Connected!</Text>
                <Text style={styles.text}>Sign In with Account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <LinearGradient
                            colors={['#4f83cc', '#146A90']}
                            style={styles.signIn} >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next" color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;
const container_logo = height_logo + 20;
const inner_logo = height_logo + 10;
const logoborder = container_logo / 2
const innerborder = inner_logo / 2
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d4def'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
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
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})
const mapStateToProps = state => {
    const { isDarkTheme, isLoading, isAuthenticated } = state.auth
    return { isAuthenticated, isLoading, isDarkTheme }
}

export default connect(mapStateToProps, { onAutoLogin: requestAutoSignIn })(SplashScreen);

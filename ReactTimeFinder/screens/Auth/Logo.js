import React from 'react';

import { View, StyleSheet, Image, Text } from 'react-native';
const logo = require("../../assets/img/logo.png")
const Logo = () => {
    return (
        <View style={styles.container}>
            <Image style={{ width: 300, height: 200 }}
                source={logo} />
            <Text style={styles.logoText}> Welcome to MCFinder</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logoText: {
        fontSize: 18,
        color: '#1A0DAB',
        fontWeight: '700'
    }
})
export default Logo;
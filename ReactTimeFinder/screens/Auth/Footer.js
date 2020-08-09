import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const Footer = ({ title, description, onPress }) => {

    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>{title} </Text>
            <Text style={styles.footerAction} onPress={onPress}>{description} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 16,
        flexDirection: 'row'
    },
    footerText: {
        fontSize: 16
    },
    footerAction: {
        color: '#065FDA',
        fontSize: 16,
        fontWeight: '500'
    }
})
export default Footer;
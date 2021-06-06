import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const ContactScreen = () => {
    return (
        <ScrollView
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Contact Us</Text>
                </View>
                <View style={styles.passageContainer}>
                    <Text style={styles.passage}>
                       Call Us: 0201746243
                    </Text>

                </View>


            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleContainer: {
        marginBottom: 20
    },
    passage: {
        fontSize: 14,
        fontWeight: '500',
        padding: 20
    },
    passageContainer: {
        margin: 20
    }
})
export default ContactScreen;
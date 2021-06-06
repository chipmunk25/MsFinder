import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const FaqScreen = () => {
    return (
        <ScrollView
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Cookies</Text>
                </View>
                <View style={styles.passageContainer}>
                    <Text style={styles.passage}>
                        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.
                        These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
                    </Text>
                    <Text style={styles.passage}>
                        This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.
                        If you choose to refuse our cookies, you may not be able to use some portions of this Service.
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
export default FaqScreen;
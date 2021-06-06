import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const PrivacyScreen = () => {
    return (
        <ScrollView
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Privacy Policy</Text>
                </View>
                <View style={styles.passageContainer}>
                    <Text style={styles.passage}>
                        BenEphra built the Real car maintenance system app as a Free app.
                        This SERVICE is provided by BenEphra at no cost and is intended for use as is.
                    </Text>
                    <Text style={styles.passage}>
                        This page is used to inform visitors regarding our policies with the collection, use,
                        and disclosure of Personal Information if anyone decided to use our Service.
                    </Text>
                    <Text style={styles.passage}>
                        If you choose to use our Service, then you agree to the collection and use of information in relation to this policy.
                        The Personal Information that we collect is used for providing and improving the Service.
                        We will not use or share your information with anyone except as described in this Privacy Policy.
                    </Text>
                    <Text style={styles.passage}>
                        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
                        which is accessible at Real car maintenance system unless otherwise defined in this Privacy Policy.
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Security</Text>
                </View>
                <View style={styles.passageContainer}>
                    <Text style={styles.passage}>
                        We value your trust in providing us your Personal Information, thus we are striving to use
                        commercially acceptable means of protecting it. But remember that no method of transmission over the internet,
                        or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Children’s Privacy</Text>
                </View>
                <View style={styles.passageContainer}>
                    <Text style={styles.passage}>
                        These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable
                        information from children under 13. In the case we discover that a child under 13 has provided us with personal information,
                        we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information,
                        please contact us so that we will be able to do necessary actions.
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleContainer: {
        marginBottom: 0
    },
    passage: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10
    },
    passageContainer: {
      //  margin: 20
    }
})
export default PrivacyScreen;
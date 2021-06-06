import React from 'react';

import { View, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {
    Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch
} from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { requestSignOut, toggleTheme } from './../../stores/actions/index';
import Share from "react-native-share";

import Feather from 'react-native-vector-icons/Feather';
const UserIcon = require("../../assets/img/administrator_male_64px.png")
const SideDrawerContent = (props) => {
    const { SignOut, isDarkTheme, toggleTheme, navigation, email } = props;

    const customerShare = async () => {
        const shareOptions = {
            message: 'You can find Fitting Shops and Towing Services in GH'
        }
        try {
            const ShareResponse = await Share.open(shareOptions)
        } catch (err) {
            Alert.alert("Share Error: ", err.message, [{ text: 'okay' }])
        }
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={UserIcon}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{email} </Title>
                                <Caption style={styles.caption}>Admin</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    <Feather
                                        name="phone-call"
                                        color='#FF6347'
                                    /></Paragraph>
                                <Caption style={styles.caption}>0201746243</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}> / </Paragraph>
                                <Caption style={styles.caption}>0542567839</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="Home"
                            icon={({ color, size }) => (
                                <Icon name="home-outline" color={color} size={size} />
                            )}
                            onPress={() => navigation.navigate('Home')}
                        />
                        <DrawerItem
                            label="Tell A Friend"
                            icon={({ color, size }) => (
                                <Icon name="share-outline" color={color} size={size} />
                            )}
                            onPress={customerShare}
                        />
                        <DrawerItem
                            label="Privacy Policy"
                            icon={({ color, size }) => (
                                <Icon name="bookmark-outline" color={color} size={size} />
                            )}
                            onPress={() => navigation.navigate('Privacy')}
                        />

                        <DrawerItem
                            label="FAQs"
                            icon={({ color, size }) => (
                                <Ionicons name="ios-help-circle" color={color} size={size} />
                            )}
                            onPress={() => navigation.navigate('Faq')}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => toggleTheme({ isDarkTheme: !isDarkTheme })}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />

                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem

                    label="Sign Out"
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    onPress={() => SignOut()}
                />
            </Drawer.Section>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})

const mapStateToProps = state => {
    return {
        isDarkTheme: state.auth.isDarkTheme,
        email: state.auth.email
    }
}
export default connect(mapStateToProps, { SignOut: requestSignOut, toggleTheme: toggleTheme })(SideDrawerContent);
import React from 'react';

import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {
    Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch
} from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
const UserIcon = require("../../assets/img/administrator_male_64px.png")
const SideDrawerContent = (props) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false)
    const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

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
                                <Title style={styles.title}>Desmond Adusei </Title>
                                <Caption style={styles.caption}>Admin</Caption>
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
                            onPress={() => console.log("logout")}
                        />
                        <DrawerItem
                            label="Profile"
                            icon={({ color, size }) => (
                                <Icon name="account-outline" color={color} size={size} />
                            )}
                            onPress={() => console.log("logout")}
                        />
                        <DrawerItem
                            label="Privacy Policy"
                            icon={({ color, size }) => (
                                <Icon name="bookmark-outline" color={color} size={size} />
                            )}
                            onPress={() => console.log("logout")}
                        />
                        <DrawerItem
                            label="Rate Us"
                            icon={({ color, size }) => (
                                <Ionicons name="star-half-outline" color={color} size={size} />
                            )}
                            onPress={() => console.log("logout")}
                        />
                        <DrawerItem
                            label="FAQs"
                            icon={({ color, size }) => (
                                <Ionicons name="ios-help-circle" color={color} size={size} />
                            )}
                            onPress={() => console.log("logout")}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => toggleTheme()}>
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
                    onPress={() => console.log("logout")}
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
export default SideDrawerContent;
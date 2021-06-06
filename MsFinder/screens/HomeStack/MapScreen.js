import React from 'react';

import { View, StyleSheet, Text, Button } from 'react-native';
const MapScreen = ({ navigation }) => {
    return (
        <View>
            <Text> THIS IS THE MAP</Text>
            <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
        </View>
    );
};

export default MapScreen;
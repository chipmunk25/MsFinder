import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ListItem = ({ store_name, address, telephone, service_type }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.storeText}>{store_name}</Text>
            <Text>{address}</Text>
            <Text>{telephone}</Text>
            <Text>{service_type}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 100,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        marginBottom:20
        
    },
    storeText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#cdcdcd'
    },
    addressText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#cdcdcd'
    },
    contactText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#cdcdcd'
    },
    typeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#cdcdcd'
    },

})
export default ListItem;
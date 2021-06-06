import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Animated } from 'react-native';


const ListItem = (props) => {

    const {
        data,
        rowHeightAnimatedValue,
        removeRow,
        leftActionState,
        rightActionState,
    } = props;

    if (rightActionState) {
        Animated.timing(rowHeightAnimatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            removeRow();
        });
    }

    return (
        /*   */
        <Animated.View
            style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
            <TouchableHighlight
                style={styles.rowFrontVisible}
                onPress={() => console.log('Element touched')}
                underlayColor={'#aaa'}>
                <View >
                    <Text style={styles.title} numberOfLines={1}>{data.item.store_name}</Text>
                    <Text style={styles.details} numberOfLines={1}>{data.item.address}</Text>
                    <Text style={styles.details} numberOfLines={1}>{data.item.telephone}</Text>
                    <Text style={styles.details} numberOfLines={1}>{data.item.service_type}</Text>
                </View>
            </TouchableHighlight>
        </Animated.View>

    );
};
const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 100,
       margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 100,
        padding: 10,
        marginBottom: 10,
    },
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
        marginBottom: 20

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
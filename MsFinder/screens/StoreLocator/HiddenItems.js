import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
const HiddenItemWithAction = (props) => {
    const {
        data, rowMap,
        swipeAnimatedValue,
        leftActionActivated,
        rightActionActivated,
        rowActionAnimatedValue,
        rowHeightAnimatedValue, onClose, onDelete
    } = props

    if (rightActionActivated) {
        Animated.spring(rowActionAnimatedValue, {
            toValue: 500,
            useNativeDriver: false
        }).start();
    } else {
        Animated.spring(rowActionAnimatedValue, {
            toValue: 75,
            useNativeDriver: false
        }).start();
    }

    return (
        <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
            <Text style={styles.title}>{data.item.store_name}</Text>
            {!leftActionActivated && (
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={onClose}>
                    <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={25}
                        style={styles.trash}
                        color="#fff"
                    />
                </TouchableOpacity>
            )}
            {!leftActionActivated && (
                <Animated.View
                    style={[
                        styles.backRightBtn,
                        styles.backRightBtnRight,
                        {
                            flex: 1,
                            width: rowActionAnimatedValue,
                        },
                    ]}>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={onDelete}>
                        <Animated.View
                            style={[
                                styles.trash,
                                {
                                    transform: [
                                        {
                                            scale: swipeAnimatedValue.interpolate({
                                                inputRange: [-90, -45],
                                                outputRange: [1, 0],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}>
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={25}
                                color="#fff"
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,

    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },


})
export default HiddenItemWithAction;
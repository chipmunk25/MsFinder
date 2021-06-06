import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';

const Loader = (props) => {
    const { loading, ...attributes } = props
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={loading}
            onRequestClose={() => console.log('d')}
        >
            <View style={styles.modalBck}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading}
                        size="large"
                        color="#999999"
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBck: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: '#A02BFF'
    }
})
export default Loader;
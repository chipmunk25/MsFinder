import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView from "react-native-maps"
import * as mapStyles from "../../mapstyles.json"
const PickLocation = ({ state, marker, pickLocationHandler,_map ,getLocationHandler}) => {
    return (
        <View style={styles.container}>
            <Text>OR</Text>

            <MapView
            ref={_map}
                style={styles.map}
                initialRegion={state.focusedLocation}
                customMapStyle={mapStyles["uber-style"]}
                onPress={pickLocationHandler}
            >
                {marker}
            </MapView>

            <View style={styles.button}>
                <Button title="Locate Me" onPress={getLocationHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 320,
        alignItems: 'center',

    },
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
})

export default PickLocation;
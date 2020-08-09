import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TextInput, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { connect } from 'react-redux';
import { requestAddLoc } from './../../stores/actions/index';
import PickLocation from './PickLocation';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
const AddLocationScreen = ({ AddLocation }) => {
    const [state, setState] = useState(
        {
            store_name: '',
            service_type: '',
            address: '',
            telephone: "",
            focusedLocation: {
                latitude: 5.618778,
                longitude: -0.223162,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get('window').width /
                    Dimensions.get('window').height * 0.0122
            },
            locationChosen: true
        }
    )
    const [isLoading, setIsLoading] = useState(false)
    const _map = useRef(null)
    //  const SignInHandler = () => AddLocation({ values: state })
    const SubmitHandler = () => AddLocation({ values: { store_name: state.store_name, telephone: state.telephone, service_type: state.service_type, address: state.address, longitude: state.focusedLocation.longitude, latitude: state.focusedLocation.latitude, } })

    const LoadMarker = () => {
        let marker = null;
        if (state.locationChosen) marker = <Marker coordinate={state.focusedLocation} />
        return marker
    }
    const pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        _map.current.animateToRegion({
            ...state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        setState(prevState => {
            return {
                ...state,
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            }
        })
    }

    const getLocationHandler = () => {
        Geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            pickLocationHandler(coordsEvent)
        },
            err => {
                console.log(err)
                alert('Fetching the Position failed, Pick one Manually')
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }

        )
    }
    return (
        <ScrollView >
            <View style={styles.container}>

                <TextInput style={styles.inputBox}
                    onChangeText={(store_name) => setState(prevState => { return { ...prevState, store_name } })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Store Name"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="name-phone-pad"
                />
                <TextInput style={styles.inputBox}
                    onChangeText={(address) => setState(prevState => { return { ...prevState, address } })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Address"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="name-phone-pad"
                />
                <TextInput style={styles.inputBox}
                    onChangeText={(telephone) => setState(prevState => { return { ...prevState, telephone } })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Telephone"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="phone-pad"
                />
                <Picker
                    style={[styles.pickerBox]}
                    selectedValue={state.service_type}
                    onValueChange={(service_type) => setState(prevState => { return { ...prevState, service_type } })}
                >
                    <Picker.Item label="Maintenance" value="Maintenance">Maintenance</Picker.Item>
                    <Picker.Item label="Towing" value="Towing">Towing</Picker.Item>
                </Picker>
                <View>
                    <TextInput style={styles.inputBox}
                        onChangeText={(latitude) => setState(prevState => {
                            return {
                                ...state,
                                focusedLocation: {
                                    ...prevState.focusedLocation, latitude: parseFloat(latitude)
                                }
                            }
                        })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Latitude"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="decimal-pad"
                        value={state.focusedLocation.latitude.toString()}
                    />
                    <TextInput style={styles.inputBox}
                        onChangeText={(longitude) => setState(prevState => {
                            return {
                                ...state,
                                focusedLocation: {
                                    ...prevState.focusedLocation, longitude: parseFloat(longitude)
                                }
                            }
                        })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Longitude"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                        keyboardType="decimal-pad"
                        value={state.focusedLocation.longitude.toString()}
                    />

                    <PickLocation _map={_map} pickLocationHandler={pickLocationHandler} state={state} marker={LoadMarker()} getLocationHandler={getLocationHandler} />
                </View>
                {
                    isLoading ?
                        <ActivityIndicator /> :
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText} onPress={SubmitHandler}>{"Share the Place"}</Text>
                        </TouchableOpacity>
                }
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '500'
    },
    logoText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A0DAB'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    pickerBox: {
        width: 300,
        // height: 100, 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
        /*    backgroundColor: '#eeeeee',
           */
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signInContainer: {
        height: Dimensions.get('screen').height / 2,
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    }

})

export default connect(null, { AddLocation: requestAddLoc })(AddLocationScreen);

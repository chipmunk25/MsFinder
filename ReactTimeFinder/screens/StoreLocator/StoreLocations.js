import React from 'react';
import { View, StyleSheet, TextInput, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { requestGetLoc } from './../../stores/actions';

import Ionicons from 'react-native-vector-icons/Ionicons';
const StoreLocationScreen = ({ location, LoadLocation }) => {
    React.useEffect(() => {
        LoadLocation()
    }, [])
    return (
        <View>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}

                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <FlatList
                style={styles.listContainer}
                data={location}
                renderItem={(info) => (
                    <ListItem
                        store_name={info.item.store_name}
                        address={info.item.address}
                        telephone={info.item.telephone}
                        service_type={info.item.service_type}
                    />
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    },
    searchBox: {
       
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom:30,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
})

const mapStateToProps = state => {
    console.log(state.auth.location)
    return {
        location: state.auth.location
    }
}

export default connect(mapStateToProps, { LoadLocation: requestGetLoc })(StoreLocationScreen);

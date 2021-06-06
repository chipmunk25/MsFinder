import React from 'react';
import { View, StyleSheet, TextInput, FlatList, Platform, Animated, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { requestGetLoc } from './../../stores/actions';

import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FuzzySearch from 'fuzzy-search';
import HiddenItemWithAction from './HiddenItems';
import { requestRemLoc } from './../../stores/actions/index';
const StoreLocationScreen = ({ location, LoadLocation, DeleteLocation }) => {
    React.useEffect(() => {
        LoadLocation()
    }, [])



    let searcher = null
    const [tableData, setTableData] = React.useState([])

    React.useEffect(() => {
        const LoadData = async () => {
            setTableData(await location)
        }
        LoadData();
    }, [location])


    // Initialize the fuzzy searcher.

    searcher = new FuzzySearch(location, ["store_name", "telephone", "service_type", "address"], {
        caseSensitive: false
    });

    const SearchHandler = (e) => setTableData(searcher.search(e))


    const renderItem = (data, rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(100);
        return (
            <ListItem
                data={data}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                removeRow={() => deleteRow(rowMap, data.item.key)}
            />
        )
    }
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    }
    const deleteRow = (rowMap, rowKey) => {
         DeleteLocation({ key: rowKey })
      //  console.log(rowMap)
        //  return
    }

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(100);
        return (
            <HiddenItemWithAction
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                    onChangeText={SearchHandler}

                />
                <Ionicons name="ios-search" size={20} />
            </View>

            <SwipeListView
                data={tableData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                disableRightSwipe
                leftActivationValue={100}
                rightActivationValue={-200}
                leftActionValue={0}
                rightActionValue={-500}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
      },
    listContainer: {
        width: '100%'
    },
    searchBox: {
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 30,
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

    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },

    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },

})

const mapStateToProps = state => {
    return {
        location: state.auth.location && state.auth.location.map(item => {
            return {
                address: item.address,
                id: item.id,
                key: item.id,
                latitude: item.latitude,
                longitude: item.longitude,
                service_type: item.service_type,
                store_name: item.store_name,
                telephone: item.telephone,
            }
        })
    }
}

export default connect(mapStateToProps, { LoadLocation: requestGetLoc, DeleteLocation: requestRemLoc })(StoreLocationScreen);

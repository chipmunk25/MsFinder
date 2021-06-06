import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform, Dimensions, TextInput, Linking, Animated } from 'react-native';
import MapView, { Marker, } from 'react-native-maps';

import * as mapStyles from "../../mapstyles.json"
import { connect } from 'react-redux';
import { requestGetLoc } from '../../stores/actions';
import FuzzySearch from 'fuzzy-search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 120;
const CARD_WIDTH = width * 0.5;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const region = {
    latitude: 5.642055,
    longitude: -0.238743,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
}
const ExploreScreen = ({ LoadLocation, location }) => {
    const _map = useRef(null)
    const _scrollView = useRef(null)
    React.useEffect(() => {
        LoadLocation()
    }, [])

    const categories = [{
        name: "Maintenance",
        icon: <MaterialCommunityIcons name="tools" style={styles.chipsIcon} size={18} />
    }, {
        "name": "Towing",
        icon: <MaterialCommunityIcons name="tow-truck" style={styles.chipsIcon} size={18} />
    }
    ]

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


    const CallHandler = (contact) => Linking.openURL(`tel:${contact}`)

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= location.length) {
                index = location.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { longitude, latitude } = location[index];
                    const coordinate = { longitude, latitude }
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
            clearTimeout(regionTimeout);

        });
    });

    const interpolations = location.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }


    return (
        <View style={styles.container}>
            < MapView
                style={styles.container}
                ref={_map}
                customMapStyle={mapStyles["uber-style"]}
                region={region}
            >
                {tableData && tableData.map((marker, index) => {
                    const coordinate = { longitude: marker.longitude, latitude: marker.latitude }
                    const scaleStyle = { transform: [{ scale: interpolations[index] ? interpolations[index].scale : null },], };
                    return (
                        <Marker key={index} coordinate={coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={styles.markerWrap}>
                                <Animated.Image
                                    source={marker.service_type === "Maintenance" ? require('../../assets/img/map_marker.png') : require('../../assets/img/marker_sun_106px.png')}
                                    style={interpolations[index] ? [styles.marker, scaleStyle] : [styles.marker]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    )
                })}
            </MapView >
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                    onChangeText={(val) => SearchHandler(val)}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem} onPress={() => SearchHandler(category.name)} >
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                pagingEnabled
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {
                    tableData && tableData.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <View style={styles.textContent} >
                                <Text numberOfLines={1} style={styles.cardtitle}>{marker.store_name}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>{marker.address}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>{marker.service_type}</Text>
                                <View style={styles.button}>
                                    <TouchableOpacity style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1,
                                        flexDirection: 'row',
                                    }]} onPress={() => CallHandler(marker.telephone)}>
                                        <Feather
                                            name="phone-call"
                                            size={20}
                                            color='#FF6347'
                                        />
                                        <Text style={[styles.textSign, {
                                            color: '#FF6347'
                                        }]}> {marker.telephone}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
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
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5,

    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 200
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    calTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
        alignItems: 'center'
    },
    calDescription: {
        fontSize: 13,
        marginBottom: 5,
        color: "#444",
        alignItems: 'center'
    },

})
const mapStateToProps = state => {
    return { location: state.auth.location }
}

export default connect(mapStateToProps, { LoadLocation: requestGetLoc })(ExploreScreen);
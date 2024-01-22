import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    I18nManager,
    ImageBackground,
    SafeAreaView,
    Alert
} from 'react-native'; import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { FONTS } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
    ShowConsoleLogMessage,
    ShowToastMessage,
    validateFieldNotEmpty,
} from '../../utils/Utility';
import { useDispatch, useSelector } from 'react-redux';

import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserData, fetchUserToken } from '../../redux/actions';

import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const Shops = () => {


    const theme = useContext(themeContext);
    const [show, setShow] = useState(false);
    const navigation = useNavigation();

    const [loading, setLoading] = useState('')

    const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);

    return (
        <SafeAreaView

            style={{
                flex: 1,
                backgroundColor: COLORS?.white
            }}>
            <SellerEProgressBar loading={loading} />

            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme?.colors.bg_color_onBoard,
                        elevation: 5
                    },
                ]}>
                <Ionicons
                    name="ios-arrow-back"
                    color={appPrimaryColor}
                    size={25}
                    style={[
                        styles.backIcon,
                        {
                            opacity: !show ? 1 : 0.0,
                            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                            marginStart: 10
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />

                <VegUrbanCommonToolBar
                    title="Shop Setting"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 10,
                        fontFamily: FONTS?.bold,
                        alinItem: 'center'
                    }}
                    textStyle={{
                        color: appPrimaryColor,
                        fontFamily: FONTS?.bold,
                        fontSize: 18,
                        textAlin: 'center'

                    }}
                />

            </View>
            {/* General Settings */}

            <View style={{
                flex: 1,
                marginHorizontal: 10,
                marginTop: 15
            }}>
                <TouchableOpacity
                    style={[styles?.fileds, {
                        backgroundColor: appPrimaryColor,
                    }]}
                    onPress={() => {
                        navigation.navigate('GeneralSetting')
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <AntDesign
                            name="setting"
                            size={22}
                            color={COLORS?.white}
                        />
                        <Text style={styles?.text}>General Settings</Text>
                    </View>

                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={25}
                        color={COLORS?.white}
                    />
                </TouchableOpacity>

                {/* Banner Settings */}
                {/* <TouchableOpacity
                    style={[styles?.fileds, {
                        backgroundColor: appPrimaryColor,
                    }]} onPress={() => {
                        navigation.navigate('BannerSetting')
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <MaterialIcons

                            name="delivery-dining"
                            size={22}
                            color={COLORS?.white}
                        />
                        <Text style={styles?.text}>Banner Settings</Text>
                    </View>

                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={25}
                        color={COLORS?.white}
                    />
                </TouchableOpacity> */}


                {/* Delivery Boy Pickup Point */}
                {/* <TouchableOpacity
                    style={[styles?.fileds, {
                        backgroundColor: appPrimaryColor,
                    }]} onPress={() => {
                        navigation.navigate('')
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <MaterialIcons

                            name="upload-file"
                            size={22}
                            color={COLORS?.white}
                        />
                        <Text style={styles?.text}>Delivery Boy Pickup Point</Text>
                    </View>

                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={25}
                        color={COLORS?.white}
                    />
                </TouchableOpacity> */}

                {/* Social Media Links */}
                <TouchableOpacity
                    style={[styles?.fileds, {
                        backgroundColor: appPrimaryColor,
                    }]} onPress={() => {
                        navigation.navigate('SocialMediaLink')
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <MaterialIcons
                            name="attach-file"
                            size={22}
                            color={COLORS?.white}
                        />
                        <Text style={styles?.text}>Social Media Links</Text>
                    </View>

                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={25}
                        color={COLORS?.white}
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default Shops;
const styles = StyleSheet.create({
    fileds: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 16,
        // borderBottomWidth: 0.2,
        // borderWidth: 0.2,
        borderColor: COLORS?.black,
        paddingHorizontal: 15,
        backgroundColor: COLORS?.colorPrimary,
        marginVertical: 10,
        borderRadius: 12,
        paddingVertical: 20,
        alinItem: 'center',
        marginHorizontal: 10
    },

    text: {
        fontSize: 18,
        color: COLORS?.white,
        fontFamily: FONTS?.bold,
        marginLeft: 18
    }

})


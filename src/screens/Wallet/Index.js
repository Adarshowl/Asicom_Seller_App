import React, { useContext, useRef, useState, useEffect } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    I18nManager,
    ScrollView,
    Button,
    FlatList,
    ImageBackground
} from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';

import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from 'react-native-vector-icons/Octicons';
import NextTextInput from 'react-native-next-input'
import { FONTS } from '../../constants/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { STRING, images } from '../../constants';
import { COLORS } from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import { ShowToastMessage, validateFieldNotEmpty } from '../../utils/Utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { color } from 'react-native-elements/dist/helpers';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import WalletList from './WalletList';


const Wallet = ({ navigation }) => {

    const theme = useContext(themeContext);

    const { t, i18n } = useTranslation();
    const [show, setShow] = useState(false);

    const [cartData, setCartData] = useState([
        {
            name: 'Sonia Headphone',
            image: 'https://cdn-icons-png.flaticon.com/512/772/772183.png',
            price: '120',
            date: 'Dec 15, 2024 | 12:00 PM',
            order: 'Top Up',
            fav: true,
        },
        {
            name: 'Mini Leather Bag',
            image: "https://wwd.com/wp-content/uploads/2023/08/Kate-Spade-Sam-Tote.png?w=300",
            price: '130',
            date: 'Jan 13, 2023 | 10:00 PM',
            order: 'Orders',

            fav: true,
        },
        {
            name: 'Puma Casual Shoes',
            image: 'https://e7.pngegg.com/pngimages/107/770/png-clipart-black-shoe-illustration-sneakers-adidas-computer-icons-shoe-running-running-shoes-miscellaneous-white.png',
            price: '90',
            date: 'Oct 20, 2023 | 06:00 AM',
            order: 'Orders',
            fav: true,
        },
        {
            name: 'Fujifilm Camera',
            image: 'https://e7.pngegg.com/pngimages/315/760/png-clipart-black-dslr-camera-camera-lens-graphy-icon-slr-camera-lens-camera-icon.png',
            price: '180',
            date: 'Oct 25, 2023 | 06:00 AM',
            order: 'Top Up',
            fav: true,
        },

        {
            name: 'Zonio SuperWatch',
            image: 'https://e7.pngegg.com/pngimages/686/779/png-clipart-round-silver-colored-chronograph-watch-with-black-band-watch-rolex-datejust-watch-free-image-file-formats-watch-accessory.png',
            price: '200',
            date: 'Nov 20, 2023 | 06:00 AM',
            order: 'Orders',
            fav: true,
        },
        {
            name: 'Gucci Leather Bag',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0VI0Hs0YFFTbZQ47INOmGOtpePYRcmc87g&usqp=CAU',
            price: '189',
            date: 'May 10, 2023 | 09:00 PM',
            order: 'Top Up',
            fav: true,
        },
        {
            name: 'Sonia Headphone',
            image: 'https://cdn-icons-png.flaticon.com/512/772/772183.png',
            price: '120',
            date: 'Dec 15, 2024 | 12:00 PM',
            order: 'Top Up',
            fav: true,
        },
        {
            name: 'Mini Leather Bag',
            image: "https://wwd.com/wp-content/uploads/2023/08/Kate-Spade-Sam-Tote.png?w=300",
            price: '130',
            date: 'Jan 13, 2023 | 10:00 PM',
            order: 'Order',

            fav: true,
        },
        {
            name: 'Puma Casual Shoes',
            image: 'https://e7.pngegg.com/pngimages/107/770/png-clipart-black-shoe-illustration-sneakers-adidas-computer-icons-shoe-running-running-shoes-miscellaneous-white.png',
            price: '90',
            date: 'Oct 20, 2023 | 06:00 AM',
            order: 'Order',
            fav: true,
        },

    ]);
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ERecipt", { item: item });
                }}
                // activeOpacity={0.8}
                style={[
                    styles.wrapperOrder,
                    {
                        backgroundColor: theme?.colors?.bg_color_onBoard,
                    },
                ]}>
                <View
                    style={[GlobalStyle.flexRowAlignCenter, {
                        paddingVertical: 5,
                        alignItems: 'center'
                    }]}
                >
                    <ImageBackground
                        style={[styles.itemImage, {
                            backgroundColor: theme?.colors?.colorimageback,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }]}
                    >
                        <Image
                            style={{
                                width: 45,
                                height: 45,
                                alignSelf: 'center',
                                borderRadius: 50,
                            }}
                            // style={styles.itemImage}
                            source={{
                                uri: item?.image,
                            }}
                        />
                    </ImageBackground>
                    <View style={styles.innnerWrapperOrder}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={[
                                    styles.textName,
                                    {
                                        alignSelf: 'flex-start',
                                        color: theme?.colors?.white,
                                    },
                                ]}
                                numberOfLines={1}>
                                {item?.name}
                            </Text>
                            <Text
                                style={[
                                    styles.textName,
                                    {
                                        alignSelf: 'flex-start',
                                        color: theme?.colors?.colorPrimary,
                                        // marginTop: 8
                                        marginEnd: 8,
                                        // fontSize:16
                                    },
                                ]}>
                                {STRING.APP_CURRENCY}{item?.price}
                            </Text>

                        </View>
                        <View
                            style={[
                                {
                                    flexWrap: 'wrap',
                                    marginTop: 5,
                                    justifyContent: 'space-between',
                                    alinItem: 'center'
                                },
                                GlobalStyle.flexRowAlignCenter,
                            ]}>

                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        color: theme?.colors?.white,
                                        // color: theme?.colors?.,
                                        // marginRight: 5
                                        // fontFamily: FONTS?.bold,

                                    },
                                ]}>
                                {item?.date}
                            </Text>


                            <View
                                style={{
                                    flexDirection: 'row',
                                    // paddingHorizontal: 15,
                                    // padding: 5,
                                    // marginTop: 5,
                                    alinItem: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        // margin: 2,
                                        fontFamily: FONTS?.bold,
                                        color: theme?.colors?.white,
                                        // color: item?.order === "order" ? 'pink' : item?.order === 'Top Up' ? 'blue' : 'black',
                                    }}
                                > {item?.order} </Text>
                                {item?.order === "Orders" ? (
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: "#FD606A",
                                        borderRadius: 5,
                                        alinItem: 'center',
                                        marginTop: 3,
                                        justifyContent: 'center',
                                        alignSelf: 'center'
                                    }}>
                                        <Ionicons name="arrow-up" size={14} color={COLORS?.white}
                                            style={{
                                            }}
                                        />
                                    </View>
                                ) : item?.order === 'Top Up' ? (
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: "#606CFD",
                                        borderRadius: 5,
                                        alinItem: 'center',
                                        marginTop: 3
                                    }}>
                                        <Ionicons name="arrow-down" size={14} color={COLORS?.white} />
                                    </View>
                                ) : null}
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainerBgColor,
                {
                    backgroundColor: theme?.colors?.bg_color_onBoard,
                },
            ]}>
            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme.colors.bg_color_onBoard,
                        alignItems: 'center'
                    },
                ]}>
                <Ionicons
                    name="ios-arrow-back"
                    color={theme.colors.white}
                    size={25}
                    style={[
                        styles.backIcon,
                        {
                            opacity: !show ? 1 : 0.0,
                            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                            marginStart: 10,
                            marginTop: 10
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                        // ShowToastMessage('Coming Soon!');
                    }}
                />
                <VegUrbanCommonToolBar
                    title="Wallet"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 10

                    }}
                    textStyle={{
                        color: theme.colors.white,
                        fontWeight: 'bold',
                        fontSize: 20
                    }}
                />
                <AntDesign
                    name={'search1'}
                    size={26}
                    color={theme.colors.white}
                    style={{
                        marginEnd: 10
                    }}
                    onPress={() => {
                        navigation.navigate('Search');
                        // ShowToastMessage('Coming Soon!');
                    }}
                />

            </View>
            <ScrollView>
                <View
                    style={[
                        GlobalStyle.loginModalBg,
                        {
                            backgroundColor: theme.colors?.bg_color_onBoard,
                        },
                    ]}>
                    <Image
                        source={{
                            uri: 'https://www.visa.co.in/dam/VCOM/regional/ap/india/global-elements/images/in-visa-gold-card-498x280.png'
                        }}
                        style={styles.app_logo} />

                    <View style={{
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            alinItem: 'center'
                        }}>
                            <Text
                                style={[
                                    GlobalStyle.locationText,
                                    {
                                        color: theme.colors.white,
                                        fontSize: 20,
                                        fontFamily: 'Urbanist-SemiBold'
                                    },
                                ]}>
                                {t('Transaction History')}
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                }}></View>
                            <Text
                                onPress={() => {
                                    navigation.navigate('WalletList');
                                }}
                                style={[
                                    GlobalStyle.locationText,
                                    {
                                        color: theme.colors.white,
                                        fontSize: 16,
                                        fontFamily: FONTS?.medium
                                    },
                                ]}>
                                {t('See All')}
                            </Text>
                        </View>
                        <FlatList
                            style={{
                                paddingStart: 5,
                                paddingEnd: 5,

                            }}
                            ListHeaderComponent={() => {
                                return <View style={{}} />;
                            }}
                            ListHeaderComponentStyle={{
                                paddingTop: 5,
                            }}
                            data={cartData}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Wallet;

const styles = StyleSheet.create({
    wrapperOrder: {
        padding: 5,
        borderRadius: 3,
        // margin: 2,
        backgroundColor: COLORS.white,
        // marginHorizontal: 10,
        // marginVertical: 10,
        // borderRadius: 12,
        paddingHorizontal: 0
        // paddingVertical:5
    },
    backIcon: {
        // marginTop: 18,
        marginStart: 15,
        paddingVertical: 5,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    itemImage: {
        width: '18%',
        height: 60,
        borderRadius: 50,
    },
    app_logo: {
        height: 180,
        resizeMode: 'stretch',
        alignSelf: 'center',
        width: '100%',
        marginTop: 0,
        marginBottom: 20

    },
    discountPrice: {
        // fontFamily: 'OpenSans-SemiBold',
        // fontFamily: 'OpenSans-Regular',

        fontSize: 14,
        color: COLORS.black,
    },
    wrapper: {
        padding: 15,
        borderRadius: 3,
        backgroundColor: COLORS.white,
        marginHorizontal: 15,
        // marginVertical: 20,
        borderRadius: 12,
    },
    innnerWrapperOrder: {
        flex: 1,
        marginStart: 10,
        marginTop: 0,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    textName: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold'
    },
});

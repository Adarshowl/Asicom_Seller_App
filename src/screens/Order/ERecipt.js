import {
    SafeAreaView,
    StyleSheet,
    View,
    I18nManager,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    Modal

} from 'react-native';
import React, { useContext, useState } from 'react';
import { SIZES } from '../../constants';
import icons from '../../constants/icons';
import { FONTS } from '../../constants/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import AntDesign from "react-native-vector-icons/AntDesign"
import themeContext from '../../constants/themeContext';
import TabHomecat from '../Home/TabHomecat';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { ShowToastMessage } from '../../utils/Utility';
import { useRoute } from '@react-navigation/native';

const ERecipt = ({ navigation }) => {
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);

    const [finalAmount, setFinalAmount] = useState(1000);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const route = useRoute();
    const item = route.params?.item;
    console.log(item)
    const theme = useContext(themeContext);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({
        amount: 1000,
    });
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
                    },
                ]}>
                <Ionicons
                    name="ios-arrow-back"
                    // color={COLORS.black}
                    color={theme.colors.white}

                    size={25}
                    style={[
                        styles.backIcon,
                        {
                            opacity: !show ? 1 : 0.0,
                            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                            marginStart: 15
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                        // ShowToastMessage('Coming Soon!');
                    }}
                />
                {/* <ToolBarIcon
           title={Ionicons}
           iconName={'chevron-back'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.goBack();
           }}
         /> */}
                <VegUrbanCommonToolBar
                    title="E-Recipt"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 20,
                    }}
                    textStyle={{
                        color: theme.colors.white,
                        fontSize: 20,
                        fontFamily: FONTS?.bold

                    }}
                />
                <MaterialCommunityIcons

                    name={'dots-horizontal-circle-outline'}
                    size={26}
                    // color={COLORS.colorPrimary} 
                    style={{
                        marginEnd: 10
                    }}
                    color={theme?.colors?.textColor}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={true}
            >


                <Image
                    //    source={images.app_logo}
                    source={{
                        uri: "https://t3.ftcdn.net/jpg/04/55/48/06/360_F_455480661_B1ndlageM3kplzg1NRPFUgYj2iWXvDQS.jpg"
                    }}
                    style={styles.app_logo} />

                <View
                    // activeOpacity={0.8}
                    style={[
                        styles.amountwrapper,
                        {
                            backgroundColor: theme?.colors?.bg,
                            elevation: 2

                            // backgroundColor: theme?.colors?.bg,

                        },
                    ]}>
                    <View
                        style={[GlobalStyle.flexRowAlignCenter, {
                            // paddingVertical: 5,
                            alignItems: 'center'

                        }]}
                    >
                        <ImageBackground

                            style={[styles.itemImage, {
                                backgroundColor: COLORS?.white,
                                // alignItems: 'center',
                                // alignSelf: 'center',
                            }]}

                        >
                            <Image
                                style={{
                                    width: 60,
                                    height: 60,
                                    alignItems: 'center',
                                    // alignSelf: 'center',
                                    resizeMode: 'center',
                                    // marginTop: 10,
                                    borderRadius: 100
                                }}
                                // style={styles.itemImage}
                                source={{
                                    // uri: "https://wwd.com/wp-content/uploads/2023/08/Kate-Spade-Sam-Tote.png?w=300"
                                    uri: item?.image,
                                }}
                            />
                        </ImageBackground>
                        <View style={styles.innnerWrapperOrder}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text
                                        style={[
                                            styles.textName,
                                            {
                                                alignSelf: 'flex-start',
                                                color: theme?.colors?.white,
                                            },
                                        ]}
                                        numberOfLines={1}>
                                        Mini Leather Bag
                                        {/* {item?.name} */}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.discountPrice,
                                            {
                                                color: theme?.colors?.white,
                                            },
                                        ]}>
                                        Qty = 1
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        {
                                            flexWrap: 'wrap',
                                            marginTop: 10
                                        },
                                        // GlobalStyle.flexRowAlignCenter,
                                    ]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text
                                            style={[
                                                styles.discountPrice,
                                                {
                                                    color: theme?.colors?.white,
                                                    marginRight: 5,
                                                },
                                            ]}>
                                            Color
                                        </Text>
                                        <View
                                            style={{
                                                borderRadius: 20,
                                                width: 15,
                                                height: 15,
                                                backgroundColor: theme?.colors?.white,
                                                marginEnd: 10
                                            }}
                                        />
                                    </View>

                                    <Text
                                        style={[
                                            styles.discountPrice,
                                            {
                                                color: theme?.colors?.white,
                                            },
                                        ]}>
                                        Size = S
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View
                    // activeOpacity={0.8}
                    style={[
                        styles.amountwrapper,
                        {
                            backgroundColor: theme?.colors?.bg,
                            elevation: 2,


                            // marginBottom: 10,
                            // padding: 15
                            // backgroundColor: theme?.colors?.bg,
                        },
                    ]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 3
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}
                        >Amount</Text>
                        <Text style={[styles?.amounttext, {
                            color: theme?.colors?.white

                        }]}>$200</Text>
                    </View>
                   
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 5
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}>Promo</Text>
                        <Text style={[styles?.amounttext, {
                            color: theme?.colors?.white
                        }]}>-$200</Text>
                    </View>
                    <View style={styles.divLine} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 5
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}                        >Amount</Text>
                        <Text style={[styles?.amounttext, {
                            color: theme?.colors?.white

                        }]}>$1200</Text>
                    </View>
                </View>
                <View
                    // activeOpacity={0.8}
                    style={[
                        styles.amountwrapper,
                        {
                            backgroundColor: theme?.colors?.bg,
                            elevation: 2,
                        },
                    ]}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 5,
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}                        >
                            Payment Methods </Text>
                        <Text style={[styles?.amounttext, {
                            color: theme?.colors?.white

                        }]}>My E-Wallet</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 5
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}                       
                             >Date</Text>
                        <Text style={[styles?.amounttext, {
                            color: theme?.colors?.white
                        }]}>Dec13,2024 | 03:23AM</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 5
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}>Transaction Id </Text>
                       <View style={{
                        flexDirection:'row'
                       }}>
                      
                       <Text style={[styles?.amounttext, {
                            color: theme?.colors?.white,
                            marginEnd:8

                        }]}>SKT245673774</Text>
                        <TouchableOpacity>
                        <Ionicons
                       name="copy-outline"
                       size={20}
                       color={theme?.colors?.white}
                      style={{
                      }}
                       />
                        </TouchableOpacity>
                       </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 5,
                        marginVertical: 5,
                    }}>
                        <Text
                            style={[styles?.textlable, {
                                color: theme?.colors?.white
                            }]}                        >Status </Text>
                       <View style={{
                        backgroundColor:theme?.colors?.categorycolor,
                        paddingHorizontal:10,
                        borderRadius:8,
                        paddingVertical:2
                       }}>
                       <Text style={[styles?.amounttext, {
                            color: theme?.colors?.text,
                            fontFamily:FONTS?.regular
                        }]}
                        >Paid</Text>
                       </View>
                    </View>



                </View>

                <View
                    // activeOpacity={0.8}
                    style={[
                        styles.amountwrapper,
                        {
                            backgroundColor: theme?.colors?.bg,
                            elevation: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        },
                    ]}>
                    <Text
                        style={[
                            styles.textCat,
                            {
                                alignSelf: 'flex-start',
                                color: theme?.colors?.white,
                                fontSize: 16.5,
                                marginStart: 16,
                                // marginTop: 10
                            },
                        ]}
                        numberOfLines={1}>
                        Category
                    </Text>

                    <Text
                        style={[
                            styles.textName,
                            {
                                alignSelf: 'flex-start',
                                color: theme?.colors?.white,
                                fontSize: 16.5,
                                marginStart: 16,
                                // marginTop: 10
                            },
                        ]}
                        numberOfLines={1}>
                        Order
                    </Text>
                </View>


                {/* <View
         style={{
           minHeight: '100%',
           width: '100%',
           marginTop: 5,
           marginBottom:30
 
         }}>
         <TopTabNav />
       </View> */}
            </ScrollView>

        </SafeAreaView>
    );
};

export default ERecipt;

const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        borderRadius: 3,
        backgroundColor: COLORS.white,
        marginHorizontal: 15,
        // marginVertical: 20,
        borderRadius: 12,
        // paddingBottom: 60

        // paddingVertical:5
    },
    app_logo: {
        height: 170,
        // resizeMode: 'stretch',
        alignSelf: 'center',
        width: '80%',
        // marginTop: 30,
        marginBottom: 20,
        borderRadius:10

    },
    amountwrapper: {
        padding: 15,
        borderRadius: 3,
        backgroundColor: COLORS.white,
        marginHorizontal: 18,
        // marginVertical: 20,
        borderRadius: 12,
        marginBottom: 10
        // paddingBottom: 60

        // paddingVertical:5
    },
    month: {
        fontSize: 22,
        // fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    monthTitle: {
        fontSize: 14,
        // fontFamily: FONTS.regular,
        color: COLORS.grey,
        marginBottom: 2.5,
    },
    wrapperOrder: {
        padding: 5,
        borderRadius: 3,
        // margin: 2,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 12,
        // paddingVertical:5
    },
    itemImage: {
        // width: 65,
        // height: 65,
        borderRadius: 100,

        resizeMode: 'center',
        alignItems: 'center',
        // resizeMode: 'stretch',
        // marginBottom: 10

    },
    divLine: {
        height: 0.5,
        width: '98%',
        backgroundColor: COLORS.gray,
        alignSelf: 'center',
        marginVertical: 5,
        marginTop: 10
    },
    textlable: {
        fontSize: 16,
        color: COLORS?.black,
        fontFamily: FONTS?.regular


    },
    amounttext: {
        fontSize: 14,
        color: COLORS?.black,
        fontFamily: FONTS?.bold


    },
    modalBackground: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#00000080',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        // borderRadius: 15,
        width: SIZES.width,

        display: 'flex',
        flexDirection: 'column',
        // paddingVertical: 8,
    },
    qtyText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        color: COLORS.black,
        textAlign: 'center',
        flex: 0.3,
    },
    originalPrice: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 11,
        textDecorationLine: 'line-through',
        color: COLORS.black,
        marginStart: 8,

        // textDecorationColor: COLORS.black,
    },
    deleteSaveText: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 14,
        color: COLORS.red,
        textAlign: 'center',
        flex: 1,
        marginTop: 5,
    },
    image: {
        height: 90,
        width: '28%',
        // margin:6,
        marginTop: 5,
        resizeMode: 'stretch',
        borderRadius: 5,
        // paddingTop:10
        // resizeMode:'contain',
    },
    innnerWrapper: {
        flex: 1,
        marginStart: 10,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    innnerWrapperOrder: {
        flex: 1,
        marginStart: 10,
        marginTop: 0,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    textName: {
        fontFamily: FONTS?.bold,
        fontSize: 15,
        color: COLORS.black,
        // fontWeight: 'bold'
    },
    textCat: {
        fontSize: 15,
        color: COLORS.black,
        fontFamily: FONTS?.regular,

        // fontWeight: 'bold'
    },
    discountPrice: {
        // fontFamily: 'OpenSans-SemiBold',
        fontFamily: FONTS?.regular,

        fontSize: 16,
        color: COLORS.black,
    },
    // qtyText: {
    //   fontFamily: 'OpenSans-Regular',
    //   fontSize: 13,
    //   color: COLORS.black,
    // },
    finalPriceText: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 17,
        color: COLORS.colorPrimary,
        marginTop: 3,
    },
    createProfile: {
        fontSize: 16,
        // fontFamily: FONTS.regular,
        color: COLORS.grey,
        lineHeight: 24,
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 16,
        color: COLORS.black,
        // fontFamily: FONTS.semi_bold,
    },
});

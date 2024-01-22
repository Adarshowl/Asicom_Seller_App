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
import FONTS from '../../constants/Fonts'


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
import moment from 'moment';

const ChatSupport = ({ navigation, route, item }) => {
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);

    const [finalAmount, setFinalAmount] = useState(1000);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const theme = useContext(themeContext);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <View
            // onPress={() => {
            //     navigation.navigate('chat')
            // }}
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
                    // alignItems: 'center'

                }]}
            >
                {/* <Image
            source={{
              uri: item?.image,
            }}
            style={styles.image}
          /> */}

                <Image
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        // alignSelf: 'center',
                        // resizeMode: 'center',
                        // marginTop: 30,
                        borderRadius: 100
                    }}
                    // style={styles.itemImage}
                    source={{
                        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfVVuJ2VZiipnEGNBKO8TGT6-yBTiQR-vJsw&usqp=CAU"
                        // uri: item?.image,
                    }}
                />
                <View style={styles.innnerWrapperOrder}>
                    <View style={{
                        flex: 1
                        // flexDirection: 'row',
                        // justifyContent: 'space-between'
                    }}>
                      <View style={{
                         flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems:'center'
                      }}>
                      <Text
                            style={[
                                styles.textName,
                                {
                                    alignSelf: 'flex-start',
                                    color: theme?.colors?.white,
                                    maxWidth:'80%'

                                },
                            ]}
                            numberOfLines={1}>
                            {item?.userId?.name}
                        </Text>
                        <TouchableOpacity 
                        style={{
                        marginTop:0,
                        marginBottom:5
                        }}
                        // style={[
                        //     styles?.buttoninvite,
                        //      {
                        //     backgroundColor: theme?.colors?.bg,

                        // }]}
                        >
                            <Text
                                // numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    color: COLORS?.grey,
                                    fontSize: 9,
                                    fontFamily: FONTS?.bold,
                                    marginEnd:4
                                }}>
                                {moment(item?.createdAt).format('DD-MM-YYYY')}
                                {/* {moment(item?.createdAt).format('LT')} */}
                            </Text>
                            <Text
                                // numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    color: COLORS?.grey,
                                    fontSize: 9,
                                    fontFamily: FONTS?.bold,
                                }}>
                                {moment(item?.createdAt).format('LT')}

                            </Text>
                        </TouchableOpacity>
                      </View>
                        <Text
                            // numberOfLines={1}
                            // ellipsizeMode='tail'
                            style={[
                                // styles.finalPriceText,
                                {
                                    alignSelf: 'flex-start',
                                    color: COLORS?.grey,
                                    fontSize:14,
                                    // marginTop: 2,
                                    fontFamily: FONTS?.regular
                                },
                            ]}>
                            {item?.message}
                        </Text>

                    </View>

                    {/* <TouchableOpacity style={[styles?.buttoninvite, {
                        backgroundColor: theme?.colors?.bg,

                    }]}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                color: theme?.colors?.white,
                                fontSize: 10,
                                fontFamily: FONTS?.bold



                            }}>
                            {moment(item?.createdAt).format('DD-MM-YYYY')}
                            {moment(item?.createdAt).format('LT')}

                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>

        </View>
    )
}



export default ChatSupport;

const styles = StyleSheet.create({
    buttoninvite: {
        // flex:0.4,
        width: '28%',
        alignItems: 'center',
        borderRadius: 80,
        // paddingVertical:5,
        height: 28,
        justifyContent: 'center',
        // height:10,
        alignSelf: 'center'

    },
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
    amountwrapper: {
        padding: 15,
        borderRadius: 3,
        backgroundColor: COLORS.white,
        marginHorizontal: 15,
        // marginVertical: 20,
        borderRadius: 12,
        marginBottom: 30
        // paddingBottom: 60

        // paddingVertical:5
    },
    month: {
        fontSize: 22,
        // fontFamily: FONTS.medium,
        color: COLORS.black,
    },
    monthTitle: {
        fontSize: 14,
        // fontFamily: FONTS.regular,
        color: COLORS.black,
        marginBottom: 2.5,
    },
    wrapperOrder: {
        padding: 5,
        // borderRadius: 3,
        margin: 2,
        // backgroundColor: COLORS.white,
        marginHorizontal: 8,
        // marginVertical: 10,
        borderRadius: 5,
        // paddingVertical:5,
        borderWidth:0.2,
        paddingVertical:10,
        marginVertical:8,
    },
    itemImage: {
        width: '30%',
        height: 100,
        borderRadius: 20,

        // resizeMode: 'center',
        // alignItems: 'center',
        // resizeMode: 'stretch',
        // marginBottom: 10

    },
    divLine: {
        height: 0.5,
        width: '95%',
        backgroundColor: COLORS.gray,
        alignSelf: 'center',
        marginVertical: 5,
        marginTop: 10
    },
    textlable: {
        fontSize: 16,
        color: COLORS?.black

    },
    amounttext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS?.black

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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textName: {
        fontFamily: FONTS?.bold,
        fontSize: 15,
        color: COLORS.black,
    },
    discountPrice: {
        // fontFamily: 'OpenSans-SemiBold',
        fontFamily: 'OpenSans-Regular',

        fontSize: 13,
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
        fontSize: 20,
        marginTop: 16,
        color: COLORS.black,

        fontWeight: 'bold'
        // fontFamily: FONTS.semi_bold,
    },
});

import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { FONTS } from '../../constants/Fonts';
import Feather from 'react-native-vector-icons/Feather'
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useSelector } from 'react-redux';

const QuiresList = ({
    item,
}) => {
    const [count, setCount] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation('');
    const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);
    const defaultImage = useSelector((state) => state.state?.defaultImage);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const theme = useContext(themeContext);

    return (
        <TouchableOpacity
        // UpdateQuries
            onPress={() => {
                navigation.navigate('UpdateQuries', { item });
            }}
            activeOpacity={0.8}
            style={[
                styles.wrapper,
                {
                    backgroundColor: COLORS?.bg_color,
                    elevation: 5
                    //   backgroundColor: theme?.colors?.bg
                    // backgroundColor: theme?.colors?.bg_color_onBoard,
                },
            ]}>
            <View
                style={[GlobalStyle.flexRowAlignCenter, {
                    paddingVertical: 5,
                    alignItems: 'center',
                    paddingHorizontal: 5
                    // backgroundColor:'#373a43'
                    //   backgroundColor: theme?.colors?.bg

                }]}
            >
                <Image
                    source={{
                        uri: item?.customer_id?.image ||defaultImage
                            // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJwk4Iyxn8tDfc1vhP-y2fI33sJrMprkR2yA&usqp=CAU'
                    }}
                    style={styles.image}
                />

                <View style={styles.innnerWrapper}>

                    <View
                        style={[
                            {
                                flexWrap: 'wrap',
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alinItem:'center'
                                // marginTop: 5
                            },
                            // GlobalStyle.flexRowAlignCenter,
                        ]}>


                        <Text
                            style={[
                                styles.textName,
                                {
                                    alignSelf: 'flex-start',
                                    color: appPrimaryColor,
                                    fontFamily: FONTS?.bold
                                },
                            ]}
                            numberOfLines={1}>
                            {item?.customer_id?.name}
                        </Text>
                       <View style={{
                        backgroundColor:COLORS?.bg_gray,
                        paddingHorizontal:10,
                        borderRadius:10,
                        alinItem:'center',
                        justifyContent:'center'
                       }}>
                       <Text
                            style={[
                                styles.textName,
                                {
                                    alignSelf: 'flex-start',
                                    // color: COLORS?.earning,
                                    color: item?.reply_status === 'Not Replied' ? COLORS?.red : COLORS?.green,
                                    fontFamily: FONTS?.bold,
                                    fontSize:10
                                },
                            ]}
                            numberOfLines={1}>
                            {item?.reply_status}
                        </Text>
                       </View>


                    </View>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        {/* <Text
                            style={[
                                styles.textName,
                                {
                                    color: theme?.colors?.white,
                                    alignSelf: 'flex-start',
                                    marginTop: 2

                                },
                            ]}>
                            Product
                        </Text> */}
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.textName,
                                {
                                    color: theme?.colors?.white,
                                    alignSelf: 'flex-start',
                                    marginTop: 2,
                                    maxWidth: '90%'
                                },
                            ]}>
                            {item?.product_id?.product_name}
                        </Text>



                    </View>
                    {/* <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // marginVertical:5
                        marginTop: 5,
                        marginBottom: 5

                    }}>
                        <Text
                            style={[
                                styles.textName,
                                {
                                    color: theme?.colors?.white,
                                    alignSelf: 'flex-start',
                                    // marginTop: 2

                                },
                            ]}>
                            Reply status
                        </Text>

                        <Text
                            style={[
                                styles.textName,
                                {
                                    alignSelf: 'flex-start',
                                    // color: COLORS?.earning,
                                    color: item?.reply_status === 'Not Replied' ? COLORS?.red : COLORS?.green,
                                    fontFamily: FONTS?.bold
                                },
                            ]}
                            numberOfLines={1}>
                            {item?.reply_status}
                        </Text>
                    </View> */}


                </View>
            </View>
            <View style={{
                marginTop: 10,
                marginLeft: 10
                // flexDirection: 'row',
                // justifyContent: 'space-between'
            }}>
                <Text
                    style={[
                        styles.textName,
                        {
                            alignSelf: 'flex-start',
                            color: appPrimaryColor,
                            fontFamily: FONTS?.bold
                        },
                    ]}>
                    Question
                </Text>

                <Text
                    style={[
                        styles.textName,
                        {
                            color: theme?.colors?.white,
                            alignSelf: 'flex-start',
                            marginTop: 2,
                        },
                    ]}
                    numberOfLines={2}>
                    {'\u2022'} {item?.question}
                </Text>

            </View>
            {item?.reply_status !== 'Not Replied' && (


                <View style={{
                    marginTop: 10,
                    marginLeft: 10
                    // flexDirection: 'row',
                    // justifyContent: 'space-between'
                }}>
                    <Text
                        style={[
                            styles.textName,
                            {
                                alignSelf: 'flex-start',
                                color: appPrimaryColor,
                                fontFamily: FONTS?.bold
                            },
                        ]}>
                        Answer
                    </Text>

                    <Text
                        style={[
                            styles.textName,
                            {
                                color: theme?.colors?.white,
                                alignSelf: 'flex-start',
                                marginTop: 2,
                            },
                        ]}
                        numberOfLines={2}
                        >
                        {'\u2022'} {item?.answer}
                    </Text>

                </View>
            )}
            {item?.reply_status !== 'Replied' && (

                <View style={{
                    // justifyContent: 'center',
                    flex: 1,
                    alinItem: 'center',
                    marginHorizontal: 60,
                    marginTop: 15,

                }}>
                    <VegUrbanCommonBtn
                        height={30}
                        width={'100%'}
                        borderRadius={10}
                        textSize={13}
                        textColor={COLORS?.white}
                        iconPosition={'left'}
                        text={('Reply')}
                        backgroundColor={appPrimaryColor}
                        // onPress={onCancel}
                        //     onCancelClick(item)

                        onPress={() => {
                            navigation.navigate('ProductQuriesDetails', { item });
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,

                        }}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default memo(QuiresList);
const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 10,
        // margin: 2,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        // borderWidth: 0.1
        // paddingVertical:5
    },
    image: {
        height: 70,
        width: 70,
        resizeMode: 'stretch',
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    itemImage: {
        width: 100,
        height: 100,
        alignItems: 'center',
        borderRadius: 10

    },
    innnerWrapper: {
        flex: 1,
        marginStart: 10,
        marginTop: 0
    },
    textName: {
        fontFamily: FONTS?.regular,
        fontSize: 14,
        color: COLORS.black,
    },

});

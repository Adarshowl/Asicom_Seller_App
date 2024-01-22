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

const PaymentListData = ({
  item,
}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('');
  const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PaymentDetsils', { item });
      }}
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          backgroundColor: COLORS?.bg_color,
          elevation: 2,
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

        <View style={styles.innnerWrapper}>

          <View
            style={[
              {
                flexWrap: 'wrap',
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
                  fontFamily: FONTS?.bold,
                  marginBottom:10
                },
              ]}
              numberOfLines={2}>
              {item?.transectionid}
            </Text>


          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical:5
          }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2

                },
              ]}>
              date
            </Text>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                  marginLeft: 10
                },
              ]}>
              {item?.createdAt}

              {/* {moment(item?.created_at).format('LT')} */}

              {/* {moment(item?.created_at).format('DD-MM-YYYY')} */}
            </Text>

          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical:5

          }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2

                },
              ]}>
              Payment Status
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: COLORS?.black,
                  // fontFamily: FONTS?.bold

                },
              ]}
              numberOfLines={1}>
              {item?.status}
            </Text>

          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical:5

          }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2

                },
              ]}>
              Payment By
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: COLORS?.black,
                  // fontFamily: FONTS?.bold

                },
              ]}
              numberOfLines={1}>
              {item?.paymentby}
            </Text>

          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical:5

          }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2

                },
              ]}>
              Payment Type
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  // color: COLORS?.earning,
                  color: COLORS?.black,
                  // fontFamily: FONTS?.bold
                },
              ]}
              numberOfLines={1}>
              {item?.paymenttype}
            </Text>

          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2

                },
              ]}>
              Amount
            </Text>

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
              ${item?.amount}
            </Text>

          </View>



        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PaymentListData);
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

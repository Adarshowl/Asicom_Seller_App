import React, {memo, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';

const MyEarningItem = ({item}) => {
  // console.log(item);
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('');
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const appcurrency = useSelector(state => state.state?.appcurrency);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('WithdrawalDetails', {item});
      }}
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          // backgroundColor: '#F2F3F4',
          elevation: 5,
          //   backgroundColor: theme?.colors?.bg
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            paddingVertical: 5,
            alignItems: 'center',
            paddingHorizontal: 5,
            // backgroundColor:'#373a43'
            //   backgroundColor: theme?.colors?.bg
          },
        ]}>
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
                },
              ]}
              numberOfLines={1}>
              {item?.withdrawal_id}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Amount
            </Text>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                  // fontFamily: FONTS?.bold,
                  fontSize: 14,
                },
              ]}>
              ${item?.total_amount}
              {/* {moment(item?.created_at).format('LT')} */}
              {/* {moment(item?.created_at).format('DD-MM-YYYY')} */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Request Amount
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
              ${item?.request_amount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Current Amount
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
              ${item?.current_amount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Admin Commission
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
              {item?.admin_commission}%
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Admin Payment Seller
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: COLORS?.earning,
                  fontFamily: FONTS?.bold,
                },
              ]}
              numberOfLines={1}>
              ${item?.admin_payto_vendor}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Date & Time
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  marginTop: 2,
                  color: COLORS?.earning,
                  fontFamily: FONTS?.regular,
                },
              ]}
              numberOfLines={1}>
              {moment(item?.createdAt).format('LLL')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              Status
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color:
                    item?.status === 'Pending'
                      ? '#F49127'
                      : item?.status === 'Approved'
                      ? COLORS?.green
                      : item?.status === 'Rejected'
                      ? COLORS?.ontheway
                      : COLORS?.black,

                  fontFamily: FONTS?.bold,
                },
              ]}
              numberOfLines={1}>
              {item?.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MyEarningItem);
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
    // paddingVertical:5,
    // flex:1
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
    borderRadius: 10,
  },
  innnerWrapper: {
    flex: 1,
    marginTop: 0,
  },
  textName: {
    fontFamily: FONTS?.regular,
    fontSize: 14,
    color: COLORS.black,
  },
});

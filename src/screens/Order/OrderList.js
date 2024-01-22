import React, { memo, useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useSelector } from 'react-redux';

const OrderList = ({ item }) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('');
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const appcurrency = useSelector(state => state.state?.appcurrency);
  console.log('token', appPrimaryColor);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetails', { item });
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
              {item?.order_id}
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
              Date
            </Text>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                  marginLeft: 10,
                },
              ]}>
              {/* {item?.createdAt} */}

              {moment(item?.createdAt).format('DD-MM-YYYY')}
              {/* : {moment(item?.createdAt).format('LT')} */}
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
              Payment Status
            </Text>
            <View
              style={{
                backgroundColor: COLORS?.bg_gray,
                paddingHorizontal: 10,
                borderRadius: 10,
                alinItem: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: COLORS?.black,
                    fontSize: 12,
                    // fontFamily: FONTS?.bold
                  },
                ]}
                numberOfLines={1}>
                {item?.payment_status}
              </Text>
            </View>
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
              Payment Mode
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
              {item?.payment_mode == "Cod" ? "COD" : item?.payment_mode}

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
                  color: COLORS?.black,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              {item?.is_cancelled === 'Active'
                ? 'Delivery Status'
                : 'Delivery Status'}
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color:
                    item?.is_cancelled === 'Active'
                      ? 'red'
                      : item?.delivery_status === 'Shipped'
                        ? '#F77156'
                        : item?.delivery_status === 'Delivered'
                          ? COLORS.green
                          : item?.delivery_status === 'On The Way'
                            ? '#F77156'
                            : '#F49127',
                  fontFamily: FONTS.bold,
                },
              ]}
              numberOfLines={1}>
              {/*{item?.is_cancelled === 'Active'*/}
              {/*  ? 'cancelled'*/}
              {/*  : item?.delivery_status === 'Shipped'*/}
              {/*  ? 'Picked Up'*/}
              {/*  : item?.delivery_status === 'Delivered'*/}
              {/*  ? 'Delivered'*/}
              {/*  : 'Pending'}*/}
              {item?.is_cancelled === 'Active'
                ? 'Cancelled'
                : item?.delivery_status}
            </Text>
            {/* {item?.is_cancelled === 'Active' ? 'Cancellation' : item?.delivery_status} */}
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
              Price
            </Text>

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
              {appcurrency}
              {item?.amount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(OrderList);
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
    borderRadius: 10,
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
  },
  textName: {
    fontFamily: FONTS?.regular,
    fontSize: 14,
    color: COLORS.black,
  },
});

import React, {memo, useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONTS} from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {ShowToastMessage} from '../../utils/Utility';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import {useSelector} from 'react-redux';

const PaymentList = ({item}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('');
  const id = item?._id;

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);
  const [loading, setLoading] = useState('');

  const handleDeletePress = () => {
    // Function to handle delete button press
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            getdeleteItem();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const getdeleteItem = () => {
    console.log(id);

    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.REMOVE_PAYMENT_LIST + id));

      ApiCall('get', null, API_END_POINTS.REMOVE_PAYMENT_LIST + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log(response?.data?.data)

          if (response?.statusCode === 200) {
            // console.log("delte   ", JSON.stringify(response?.data));

            navigation.goBack('Bank');
            ShowToastMessage(response?.data?.message);
            if (response.data?.length === 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            if (response.data?.message === 'Token Mismatch') {
              Alert.alert(
                'Session Expired',
                'Your session has expired due to a security issue. Please log in again to continue using the application.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      clearUserToken();
                    },
                  },
                ],
              );
            }
          } else {
            setShowEmpty(true);
          }
        })

        .catch(error => {
          setShowEmpty(true);
          console.log('error axios -> ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UpdateBank', {item});
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
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
              {item?.accountholdername}
            </Text>

            <TouchableOpacity onPress={handleDeletePress}>
              <MaterialIcons
                name="delete-outline"
                size={22}
                color={COLORS?.black}
              />
            </TouchableOpacity>
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
              Accont number
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
              {item?.accountnumber}

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
              Bank Name
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
              {item?.bankname}
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
              IFSC Code
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
              {item?.ifsccode}
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
                  alignSelf: 'flex-start',
                  color: COLORS?.black,
                  // fontFamily: FONTS?.bold
                },
              ]}
              numberOfLines={1}>
              {moment(item?.createdAt).format('DD-MM-YYYY')}
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
                  color: appPrimaryColor,
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

export default memo(PaymentList);
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

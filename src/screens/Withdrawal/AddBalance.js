import {
  Alert,
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ShowToastMessage} from '../../utils/Utility';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const AddBalance = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const dispatch = useDispatch();

  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setAllDashboard] = useState('');
  const [todaydashboard, setTodayDashboard] = useState('');

  const [today, setTodayData] = useState({});
  const [loading, setLoading] = useState('');
  console.log('ddddddd', today);

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.GET_BALANCE_WITHDROWAL));

      ApiCall('get', null, API_END_POINTS.GET_BALANCE_WITHDROWAL, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            console.log('get balance: ', JSON.stringify(response.data));
            setTodayData(response?.data?.response);
            if (response.data?.length !== 0) {
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
      ShowToastMessage(`You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const clearUserToken = async () => {
    try {
      await AsyncStorage.clear();
      // await AsyncStorage.removeItem('userToken');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  const commissionPercentage = today?.admin_cammission;
  const totalAmount = today?.accountbalance;
  const calculatedAmount =
    totalAmount - (totalAmount * commissionPercentage) / 100;

  console.log('calculatedAmount', calculatedAmount);
  console.log('calculatedAmount', totalAmount);

  const onLoginClick = () => {
    setLoading(true);
    try {
      if (!amount) {
        ShowToastMessage('Please enter an amount');
        setLoading(false);
        return;
      }

      if (!message) {
        ShowToastMessage('Please enter Message');
        setLoading(false);
        return;
      }
      if (/^\d+\.\d+$/.test(amount)) {
        ShowToastMessage('Decimal values are not allowed');
        setLoading(false);
        return;
      }
      const enteredAmount = parseInt(amount);
      if (isNaN(enteredAmount) || enteredAmount <= 0) {
        ShowToastMessage('Amount must be at least 1');
        setLoading(false);
        return;
      }

      if (parseFloat(amount) > calculatedAmount) {
        ShowToastMessage(
          `Please enter an amount equal to or less than the Total Amount $(${calculatedAmount}).`,
        );
        setLoading(false);
        return; // Exit the function if the entered amount is greater than the calculated amount
      }

      const body = {
        total_amount: totalAmount,
        request_amount: amount,
        description: message,
      };

      ApiCall('post', body, API_END_POINTS.CREATE_WITHDROWAL, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          console.log('response axios >>> ', JSON.stringify(response));
          if (response?.data?.status == true) {
            navigation.goBack('Withdrawal');
            ShowToastMessage(response?.data?.message);
          } else {
            setLoading(false);
            console.log(JSON.stringify(response?.data));

            ShowToastMessage(response?.data?.message);
          }
        })
        .catch(error => {
          console.log('error axios -> ', error);
          ShowToastMessage('Add', response?.data?.errors);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage("Withdrawal request already in process.", response?.data?.errors);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
          flex: 1,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation: 5,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          color={COLORS?.black}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Send Withdraw Request"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold,
            alinItem: 'center',
          }}
          textStyle={{
            color: COLORS?.black,
            fontFamily: FONTS?.bold,
            fontSize: 18,
            textAlin: 'center',
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles?.filed,
                {
                  backgroundColor: appPrimaryColor,
                  // backgroundColor: '#40B873'
                },
              ]}>
              <Text style={styles.statusText1}>Total Balance</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 23,
                      marginTop: 8,
                      marginEnd: 10,
                    },
                  ]}>
                  ${today?.accountbalance}
                </Text>
              </View>
              {/* <Text style={styles.normalLeft1}>16 oct,2023</Text> */}
            </View>
            <View
              style={[
                styles?.filed,
                {
                  backgroundColor: appPrimaryColor,

                  // backgroundColor: '#F49127'
                },
              ]}>
              <Text style={styles.statusText1}>Admin Commission</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 23,
                      marginTop: 8,
                      marginEnd: 10,
                    },
                  ]}>
                  {today?.admin_cammission}%
                </Text>
              </View>
            </View>
          </View>

          {/* <View style={{
                        marginBottom: 20,
                        marginHorizontal: 10

                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles?.statusText}>Total Balance</Text>
                            <Text style={styles?.statusText}>
                                ${today?.accountbalance}
                            </Text>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles?.statusText}>Admin Commission</Text>
                            <Text style={styles?.statusText}>
                                {today?.admin_cammission}%
                            </Text>
                        </View>
                    </View> */}
          <View
            style={{
              flex: 1,
              marginHorizontal: 15,
              marginTop: 50,
              marginBottom: 30,
            }}>
            <VegUrbanEditText
              placeholder="Enter Amount"
              label="Amount"
              value={amount}
              iconPosition={'left'}
              keyBoardType={'number-pad'}
              icon={
                <FontAwesome
                  name={'dollar'}
                  size={16}
                  color={COLORS.grey}
                  style={{
                    marginHorizontal: 15,
                  }}
                />
              }
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular,
              }}
              onChangeText={v => setAmount(v)}
            />

            <VegUrbanEditText
              placeholder="Enter message"
              label="Message"
              multiline={true}
              value={message}
              // numberOfLines={4}
              maxLength={50}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular,
              }}
              onChangeText={v => setMessage(v)}
            />
            <Text style={{color: COLORS?.gray, fontSize: 12, marginLeft: 5}}>
              Maximum 50 Characters
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alinItem: 'center',
            marginHorizontal: 20,
          }}>
          <VegUrbanCommonBtn
            height={45}
            width={'100%'}
            borderRadius={10}
            textSize={16}
            textColor={COLORS?.white}
            iconPosition={'left'}
            text={'Add Request'}
            backgroundColor={appPrimaryColor}
            // onPress={onCancel}
            //     onCancelClick(item)

            onPress={() => onLoginClick()}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginHorizontal: 13,
    marginVertical: 10,
    marginTop: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 6,
    flex: 1,
  },
  scrollContainer: {
    // flexGrow: 1,
  },
  statusText: {
    // textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.black,
  },
  statusText1: {
    // textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.white,
  },
  filed: {
    flex: 1,
    borderRadius: 5,
    // borderWidth: 1,
    width: '100%',
    height: 80,
    // alignSelf: 'center',
    // justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 3,
    // paddingHorizontal: 5,
    // paddingVertical: 10
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  detailsView: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
  },
  viewtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alinItem: 'center',
    paddingVertical: 5,
  },
  ordertext: {
    fontFamily: FONTS?.bold,
    fontSize: 14,
    color: COLORS?.black,
  },
  normaltext: {
    fontSize: 12,
    fontFamily: FONTS?.regular,
    color: COLORS?.black,
    textAlign: 'right',
  },
  normalLeft: {
    fontSize: 14,
    fontFamily: FONTS?.regular,
    color: COLORS?.black,
    marginLeft: 8,
  },
  normalLeft1: {
    fontSize: 14,
    fontFamily: FONTS?.regular,
    color: COLORS?.white,
    marginLeft: 8,
  },
  produst: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
  },
});

export default AddBalance;

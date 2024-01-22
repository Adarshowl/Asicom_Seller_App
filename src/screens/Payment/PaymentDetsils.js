import {
  Alert,
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {ShowToastMessage} from '../../utils/Utility';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const PaymentDetsils = ({navigation, route}) => {
  const [amount, setAmount] = useState(100);

  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const {item} = route.params;
  // console.log('Item in Order Screen:', item);
  const id = item?._id;
  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllShop();
  }, []);

  // You can add more items to the 'dashboard' array as needed.

  const [orderList, setOrderList] = useState({});

  const [today, setTodayData] = useState({});
  const [loading, setLoading] = useState('');
  console.log('pending', orderList);

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PAYMENT_DEATILS_API));

      ApiCall('get', null, API_END_POINTS.PAYMENT_DEATILS_API + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log("Response Details: ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            console.log('Response Details: ', JSON.stringify(response.data));
            setOrderList(response?.data?.response);

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
            elevation: 0,
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
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Payment List"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold,
            alinItem: 'center',
          }}
          textStyle={{
            color: appPrimaryColor,
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
        <View
          style={
            {
              // flez: 1,
            }
          }>
          {/*
                    <FlatList
                        style={{
                            paddingStart: 5,
                            paddingEnd: 5,

                        }}
                        ListHeaderComponent={() => {
                            return <View style={{}} />;
                        }}
                        ListEmptyComponent={() => !showEmpty ? null : (
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{
                                    fontSize: 20, marginTop: 50,
                                    color: COLORS?.grey
                                }}>No Order found !</Text>
                            </View>

                        )}
                        ListHeaderComponentStyle={{
                            paddingTop: 5,
                        }}
                        showsVerticalScrollIndicator={false}
                        data={orderList}
                        renderItem={renderItem}
                    /> */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PaymentDetsils', {item});
            }}
            activeOpacity={0.8}
            style={[
              // styles.wrapper,
              {
                backgroundColor: COLORS?.bg_color,
                elevation: 2,
                //   backgroundColor: theme?.colors?.bg
                // backgroundColor: theme?.colors?.bg_color_onBoard,
              },
            ]}>
            <View
              style={{
                margin: 10,
                padding: 10,
                elevation: 3,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                // flexGrow: 1,
              }}>
              {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: 2,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,

          }}>

          <Text
            style={{
              fontSize: 20,
              color: COLORS.black,
              fontFamily: FONTS.bold,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Payment History
          </Text>

        </View> */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View
                  style={{
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 6,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.bold,

                      fontSize: 14,
                      color: COLORS.grey,
                    }}>
                    Shop Total Amount
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      color: appPrimaryColor,
                      fontFamily: FONTS.bold,
                      fontWeight: 'bold',
                    }}>
                    {/* ₹100 */}₹{item?.amount}
                  </Text>
                </View>
                {/* <View style={{
                                    height: 45,
                                    borderWidth: 0.2,
                                    width: 1,
                                    marginTop: 10

                                }}></View> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 15,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexGrow: 1,
                    height: 1,
                    backgroundColor: COLORS.grey,
                    // marginStart: 10,
                  }}
                />

                {/* <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.grey,
              marginHorizontal: 10,
              fontFamily: FONTS.medium,

              marginTop: -2,
            }}>

            {moment(item?.created_at).format('L')}
            {'  '}
            {moment(item?.created_at).format('LTS')}
          </Text>
        </View> */}

                <View
                  style={{
                    // flexGrow: 1,
                    // height: 1,
                    backgroundColor: COLORS.grey,
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.medium,
                  }}>
                  Transaction Id
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                    maxWidth: '45%',
                  }}>
                  {item?.transectionid}
                </Text>
              </View>

              {/* {item?.amount > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}>
              Transaction Id
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.bold,
              }}>
              #{item?.tras_id}
            </Text>
          </View>
        ) : null} */}

              {/* {item?.total_amount > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}>
              Total Paid
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.bold,
              }}>
              ₹{item?.total_paid}/-
            </Text>
          </View>
        ) : null}
        {item?.total_amount > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}
            >
              Transaction Date
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.bold,
              }}
            >
              {moment(item?.created_at).format('L')}
            </Text>
          </View>
        ) : null} */}

              {/* {item?.total_amount > 0 ? ( */}
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 5,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.medium,
                  }}>
                  Transaction Date
                </Text>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 5,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      color: COLORS.grey,
                      marginHorizontal: 10,
                      fontFamily: FONTS.bold,
                      // flexGrow: 1,
                      marginStart: 'auto',
                      maxWidth: '50%',
                      // textAlign: 'right',
                    }}>
                    {item?.createdAt}
                  </Text>
                </View>
              </View>
              {/* ) : null} */}

              {/* {item?.total_amount > 0 ? ( */}

              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.medium,
                  }}>
                  Payment Mode
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  {item?.status}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.medium,
                  }}>
                  Payment By
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  {item?.paymentby}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.medium,
                  }}>
                  Payment Mode
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  {item?.paymenttype}
                </Text>
              </View>
              {/* ) : null} */}

              {/* <VegUrbanCommonBtn
                                    height={30}
                                    // width={'100%'}
                                    borderRadius={5}
                                    textSize={16}
                                    textColor={'white'}
                                    text={('Pay Now')}
                                    marginTop={10}
                                    activeOpacity={0.8}
                                    backgroundColor={theme?.colors?.colorPrimary}
                                    onPress={() => {
                                        navigation.navigate('DuePayment', { item });
                                    }}
                                    textStyle={{
                                        fontFamily: 'OpenSans-Medium',
                                    }}
                                /> */}

              {/* <View
        style={{
          flexGrow: 1,
          height: 1,
          backgroundColor: COLORS.grey,
          marginVertical: 15,
        }}
      /> */}
              {/* <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,
            fontFamily: FONTS.medium,
          }}>
          Transaction Date:
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,

            fontFamily: FONTS.bold,
          }}>
          {moment(item?.created_at).format('L')}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,
            fontFamily: FONTS.medium,
          }}>
          Transaction Time
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,

            fontFamily: FONTS.bold,
          }}>
          {moment(item?.created_at).format('LTS')}
        </Text>
      </View> */}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    marginTop: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    flex: 1,
  },
  scrollContainer: {
    // flexGrow: 1,
  },
  statusText: {
    // textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.black,
  },
  statusText1: {
    // textAlign: 'center',
    fontSize: 18,
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
    height: 100,
    // alignSelf: 'center',
    // justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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

export default PaymentDetsils;

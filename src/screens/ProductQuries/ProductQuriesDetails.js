import {
  Alert,
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
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

const ProductQuriesDetails = ({navigation, route}) => {
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

  const {item} = route.params;
  // console.log('Item in Order Screen:', item);
  const id = item?._id;

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setAllDashboard] = useState('');
  const [todaydashboard, setTodayDashboard] = useState('');

  const [today, setTodayData] = useState({});
  const [loading, setLoading] = useState('');
  // console.log("ddddddd", today)

  const [inputHeight, setInputHeight] = useState(40); // Set default height

  const handleContentSizeChange = event => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Quries_product_DETAILS));

      ApiCall('get', null, API_END_POINTS.Quries_product_DETAILS + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("get: ", JSON.stringify(response.data));
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

  const error = '';

  const [focused1, setFocused1] = React.useState(false);

  const onSubmitClick = () => {
    console.log(id);
    setLoading(true);
    try {
      if (!message) {
        ShowToastMessage('Please enter Reply Message');
        setLoading(false);
        return;
      }

      const body = {
        updateId: id,
        answer: message,
      };
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.CREATE_QURIES_PRODUCT));

      ApiCall('post', body, API_END_POINTS.CREATE_QURIES_PRODUCT, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log("response axios >>> ", JSON.stringify(response?.data));
          if (response?.data?.status == true) {
            // console.log("response axios >>> ", JSON.stringify(response?.data));

            navigation.goBack('ProductQuries');
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

  const getBorderWidth1 = () => {
    if (error) {
      return 1;
    }
    if (focused1) {
      return 0.5;
    } else {
      return 0.2;
    }
  };

  const getBorderColor1 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused1) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };

  const getBgColor1 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused1) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      return theme?.colors?.bg;
      // return COLORS?.colorSecondary;
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
          title="Product Quries Reply"
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
                  backgroundColor: COLORS?.white,
                  // backgroundColor: '#40B873'
                },
              ]}>
              {/* <Text style={styles.statusText1}>{today?.answer}</Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  // marginHorizontal: 5,
                  // flex: 1,
                  // marginTop: 5
                }}>
                <Image
                  // uri: item?.customer_id?.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtysDKgdhbACvR6DsyK0WJyANgBXIYw4Ukg&usqp=CAU',

                  source={{
                    uri:
                      today?.customer_id?.image ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtysDKgdhbACvR6DsyK0WJyANgBXIYw4Ukg&usqp=CAU',
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 8,
                      color: appPrimaryColor,
                      // marginEnd: 10
                    },
                  ]}>
                  {today?.customer_id?.name}
                </Text>
              </View>
              {/* <Text style={styles.normalLeft1}>16 oct,2023</Text> */}
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
              // flex: 1,
              // marginHorizontal: 10,
              marginTop: 5,
              marginBottom: 30,
            }}>
            <Text
              style={[
                styles.statusText1,
                {
                  fontSize: 18,
                  // marginTop: 8,
                  // marginEnd: 10
                  color: appPrimaryColor,
                },
              ]}>
              Question : {today?.question}
            </Text>

            <VegUrbanEditText
              placeholder="Type Your Reply"
              label="Message"
              multiline={true}
              value={message}
              maxLength={250}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular,
              }}
              onChangeText={v => setMessage(v)}
              // onContentSizeChange={handleContentSizeChange}
            />
            {/* <View
                            style={[styles.textView,
                            {
                                borderColor: getBorderColor1(),
                                elevation: 8

                                // flexDirection: getFlexDirection(),
                            },
                            {
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                            },
                            {
                                backgroundColor: getBgColor1(),
                                borderWidth: getBorderWidth1(),
                                borderRadius: 12,
                                elevation: 8,
                                paddingHorizontal: 20,
                                // height:50,
                                alinItem: 'center'
                            },
                            ]}
                        >
                            <TextInput
                                placeholder="Type Your Reply"
                                multiline={true}
                                value={message}
                                maxLength={50}
                                style={{
                                    color: theme?.colors?.textColor,
                                    fontFamily: FONTS?.regular,
                                    height: Math.max(40, inputHeight),
                                }}
                                onChangeText={(v) => setMessage(v)}
                                onContentSizeChange={handleContentSizeChange}
                            />
                        </View> */}
            <Text
              style={{
                color: COLORS?.gray,
                fontSize: 12,
                margin: 10,
              }}>
              Maximum 250 Characters
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
            text={'Submit'}
            backgroundColor={appPrimaryColor}
            // onPress={onCancel}
            //     onCancelClick(item)

            onPress={() => onSubmitClick()}
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
    // marginTop: 5,
    marginLeft: 8,
    color: COLORS?.black,
    marginBottom: 10,
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
  textView: {
    // flexDirection: 'row',
    flex: 1,
    // width: '100%',
    // borderWidth: 0.2,
    // alignSelf: 'center',
    // marginVertical: 12,
    // // backgroundColor: theme?.colors?.bg_color,
    // // borderColor: COLORS?.bg_color,
    // // placeholderTextColor:theme?.colors?.textColor,

    // // placeholderTextColor: COLORS.editTextBorder,
    // paddingHorizontal: 10,
    height: 45,
    // marginHorizontal: 0,
    // // borderRadius: 10,
    // fontFamily: 'Quicksand-Regular',
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export default ProductQuriesDetails;

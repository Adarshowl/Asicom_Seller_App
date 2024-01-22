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
  
  const UpdateQuries = ({navigation, route}) => {
    const theme = useContext(themeContext);
    const {t} = useTranslation();
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const defaultImage = useSelector((state) => state.state?.defaultImage);
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
            title="Product Quries Details"
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
        
        <View
        // UpdateQuries
         
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
                        // numberOfLines={2}
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
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 10,
        // margin: 2,
        backgroundColor: COLORS.white,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        marginTop:10
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
  
  export default UpdateQuries;
  
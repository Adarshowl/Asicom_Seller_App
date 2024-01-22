import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SIZES } from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonActions, useIsFocused } from '@react-navigation/native';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS, IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useContext, useEffect, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { COLORS } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import TabOfferScreen from '../Flash/TabOfferScreen';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useDispatch, useSelector } from 'react-redux';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const Home = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  // const onLocationBarClick = () => {
  //   navigation.navigate('DeliveryAddress');
  // };

  const LinerData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(async () => {
  //    // await getUserFromStorage();
  //   }, 0);
  // }, []);
  const [userData1, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const defaultImage = useSelector(state => state.state?.defaultImage);

  // console.log('defaultImage >>>', defaultImage);
  // console.log("userdata", userData)

  useEffect(() => {
    getAllShop();
    getShopCategory();
    gethomeCount();
  }, []);
  // getAllShop();

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        // console.log(value, '------------------');
        if (error) {
        } else {
          if (value !== null) {
            let tmp = JSON.parse(value);
            // setUserData(tmp?.data);
            // ShowConsoleLogMessage("data for te", (fetchUserData(JSON.parse(value))))
            // dispatch(fetchUserData(tmp)?.response)
            // dispatch(fetchUserToken(tmp?.jwtoken))
            // getDriverProfile(tmp?.id)
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE' + err);
    }
  };

  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const fetchCurrentDateTime = () => {
      const today = new Date();
      const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat(
        'en-US',
        optionsDate,
      ).format(today);

      const optionsDay = { weekday: 'long' };
      const formattedDay = new Intl.DateTimeFormat('en-US', optionsDay).format(
        today,
      );

      setCurrentDate(formattedDate);
      setCurrentDay(formattedDay);
    };

    fetchCurrentDateTime();
  }, []);
  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              setUserData(JSON.parse(value));
              // getAllShop(userData?.id);
              // getShopCategory(userData?.id);
              // gethomeCount(userData?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const [dashboard, setDashboard] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [category, setCategory] = useState([]);
  const [countHome, setCountHome] = useState({});

  // console.log("dashboard", countHome)

  const getAllShop = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD)
      ApiCall('get', null, API_END_POINTS.DASHBOARD, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.response;

            if (responseData && responseData.length > 0) {
              const imageUrlsArray = responseData.map(item => item.image);
              setDashboard(imageUrlsArray);
            }
          } else if (response?.statusCode === 500) {
            // ShowToastMessage(response.data?.message)
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
          // console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
      setLoading(false);
    }
  };

  const getShopCategory = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD)
      ApiCall('get', null, API_END_POINTS.CATEGORY_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.response;
            setCategory(responseData);

            // if (responseData && responseData.length > 0) {
            //   // const imageUrlsArray = responseData.map((item) => item.image);
            //   setCategory(response?.data);
            // }
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            setShowEmpty(false);
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
          // console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
      setLoading(false);
    }
  };

  const gethomeCount = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD_COUNT);
      // ShowConsoleLogMessage(userToken);

      ApiCall('get', null, API_END_POINTS.DASHBOARD_COUNT, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log("Counting: ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            console.log('Counting: ', JSON.stringify(response?.data));
            const responseData = response?.data;
            setCountHome(responseData);
            if (response?.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            setShowEmpty(false);
            // ShowToastMessage(response.data?.message)
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
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
          routes: [{ name: 'Auth' }],
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  const [count, setCount] = useState(0);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const renderCtegory = ({ item }) => {
    // console.log("sub categoryssdg",item)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flex: 1,
          marginHorizontal: 7,
          marginVertical: 10,
          paddingStart: 5,

          // elevation: 5,
          alignItems: 'center',
          borderRadius: 5,
          // width:120,
          // height:150,
          // borderWidth:0.1
        }}>
        <ImageBackground
          style={[
            styles.itemImage,
            {
              // backgroundColor: theme?.colors?.colorimageback,
              backgroundColor: COLORS?.colorSecondary,

              justifyContent: 'center',
              elevation: 5,
            },
          ]}
          imageStyle={{
            resizeMode: 'stretch',
            borderRadius: 10,
          }}
          source={{
            // uri: item?.brand?.image || "https://img.freepik.com/premium-vector/cosmetic-products-hair-care-vector-design_103044-2613.jpg",

            uri: IMAGE_BASE_URL + item?.image || defaultImage,
            // "https://cdn-icons-png.flaticon.com/128/1867/1867565.png",
          }}>
          <View
            style={{
              borderRadius: 10,
              // width:'80%',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: appPrimaryColor,
              paddingHorizontal: 8,
              paddingVertical: 5,
              elevation: 10,
            }}>
            <Text
              style={{
                color: COLORS?.white,
                fontFamily: FONTS?.bold,
                fontSize: 12,
                textAlign: 'center',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
              numberOfLines={2}>
              {item?.category_name}
            </Text>
          </View>

          <View
            style={{
              // marginHorizontal: 8,
              elevation: 10,
            }}>
            {/* Additional content */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          // backgroundColor: theme.colors.bg_color,
          // backgroundColor: theme.colors?.bg_color_onBoard,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <View
        style={[
          // GlobalStyle.commonToolbarBG,
          {
            // backgroundColor: theme.colors.bg_color_onBoard,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginTop: 10,
            // marginBottom:5
            marginVertical: 15,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            // source={images.app_logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/44/44338.png',
            }}
            style={styles.app_logo}
          />

          <View
            style={{
              marginStart: 10,
            }}>
            <VegUrbanCommonToolBar
              title={'Dashboard'}
              style={
                {
                  // backgroundColor: theme.colors.bg_color,
                  // fontWeight: 'bold',
                }
              }
              textStyle={{
                color: COLORS?.black,
                fontSize: 16,
                fontFamily: FONTS?.bold,
                // fontWeight: 'bold'
              }}
            />
          </View>
        </View>

        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            marginEnd: 10,
          }}>
          <Text
            style={[
              styles.heading,
              {
                marginStart: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
                fontSize: 12,
              },
            ]}>
            {/* 6November 2023 */}
            {currentDate}
          </Text>
          <Text
            style={[
              styles.heading,
              {
                marginStart: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
                fontSize: 12,
                alignSelf: 'flex-end',
              },
            ]}>
            {currentDay}

            {/* {!show ? t('Monday') : ' '} */}
          </Text>
        </View>
      </View>
      <ScrollView
        // nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={GlobalStyle.sliderMainContainer}>
          <SwiperFlatList
            autoplay={true}
            autoplayDelay={3}
            autoplayLoop={true}
            data={dashboard}
            autoplayLoopKeepAnimation={true}
            // paginationDefaultColor={'#e4e4e4'}
            paginationDefaultColor={COLORS?.white}
            paginationActiveColor={COLORS?.white}
            showPagination={true}
            paginationStyleItemActive={styles.paginationStyleItem}
            paginationStyleItemInactive={styles.paginationendStyleItem}
            renderItem={({ item }) => (
              // console.log('item')
              <View style={GlobalStyle.sliderMainWrapper}>
                <ImageBackground
                  source={{
                    uri: item,
                  }}
                  // resizeMode={'stretch'}
                  style={[styles.sliderImage]}></ImageBackground>
              </View>
            )}
          />
        </View>

        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              // backgroundColor: theme.colors.bg_color_onBoard,
            },
          ]}>
          <View
            style={{
              flex: 1,
            }}></View>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            // backgroundColor: theme.colors.bg_color_onBoard,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginVertical: 0,
              marginTop: -220,
            }}>
            <TouchableOpacity
              style={[
                styles?.dashbox,
                {
                  // backgroundColor: COLORS?.colorPrimary
                  backgroundColor: appPrimaryColor,
                },
              ]}
              activeOpacity={0.8}>
              <View style={{}}>
                <Text style={[styles?.text, {}]}>Products</Text>
                <Text
                  style={[
                    styles?.price,
                    {
                      // marginTop: 5
                    },
                  ]}>
                  {countHome?.totalProducts || 0}
                </Text>
              </View>
              <Feather
                name="box"
                size={35}
                color={COLORS?.grey}
                style={{
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles?.dashbox,
                {
                  backgroundColor: appPrimaryColor,
                },
              ]}
              activeOpacity={0.8}>
              <View style={{}}>
                <Text style={[styles?.text, {}]}>Total Revenue</Text>
                <Text
                  style={[
                    styles?.price,
                    {
                      // marginTop: 10
                    },
                  ]}>
                  {countHome?.totalConfirmOrderAmount || 0}
                  {/* {dashboard?.completedCount || 0} */}
                </Text>
              </View>
              <AntDesign
                name="shoppingcart"
                size={35}
                color={COLORS?.grey}
                style={{
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              // marginVertical: 3,
              marginTop: -35,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('MyEarning');
              }}
              style={[
                styles?.dashbox,
                {
                  backgroundColor: appPrimaryColor,
                },
              ]}>
              <View style={{}}>
                <Text style={[styles?.text, {}]}>Total Orders</Text>
                <Text
                  style={[
                    styles?.price,
                    {
                      // marginTop: 10
                    },
                  ]}>
                  {countHome?.totalConfirmedOrderCount || 0}
                </Text>
              </View>

              <AntDesign
                name="profile"
                size={35}
                color={COLORS?.grey}
                style={{
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('MyEarning');
              }}
              style={[
                styles?.dashbox,
                {
                  backgroundColor: appPrimaryColor,
                },
              ]}>
              <View style={{}}>
                <Text style={[styles?.text, {}]}>Total Category</Text>
                <Text
                  style={[
                    styles?.price,
                    {
                      // marginTop: 10
                    },
                  ]}>
                  {/*{countHome?.totalProductViews || 0}*/}
                  {countHome?.availableCategoryCount}
                  {/* {dashboard?.completedCount || 0} */}
                </Text>
              </View>
              <AntDesign
                name="eyeo"
                size={35}
                color={COLORS?.grey}
                style={{
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: -20,
          }}></View>

        {/* <View style={{
          flex: 1,
          marginHorizontal: 13,
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: COLORS?.bg_color,
          flexDirection: 'row',
          justifyContent: 'space-between',
          elevation: 10,
          borderRadius: 10,
        }}>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/gold-medal-with-star-ribbon_197792-102.jpg?size=626&ext=jpg'

            }}
            style={{
              width: 80,
              height: 80
            }}
          />


          <View style={{
            justifyContent: 'center',
            // marginTop: 20,
            flex: 1,
            marginStart: 20,

          }}>
            <View style={{
              // marginBottom: 10,
              // marginTop:10
            }}>
              <Text style={{
                fontSize: 15,
                color: COLORS?.black,
                fontFamily: FONTS?.bold
              }}>Current Package</Text>
              <Text style={{
                fontSize: 11,
                color: COLORS?.gray
              }}>Product Upload Limit 500s</Text>
              <Text style={{
                fontSize: 11,
                color: COLORS?.gray
              }}>Package Expires at 2023-03-06</Text>


            </View>
            <VegUrbanCommonBtn
              height={35}
              width={'80%'}
              borderRadius={5}
              textSize={13}
              text={('Upgrade Package')}
              borderWidth={1}
              borderColor={COLORS?.white}
              textColor={COLORS?.white}
              backgroundColor={COLORS?.colorPrimary}

              onPress={() => {
                navigation.navigate('UpgradePackage');
              }}
              textStyle={{
                fontFamily: FONTS?.bold

              }}
            />
          </View>
        </View> */}

        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}></View>

        <View
          style={{
            backgroundColor: appPrimaryColor,
            // flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('InviteFriends')
            }}
            style={{
              alignItems: 'center',
              marginLeft: 13

            }}>

            <MaterialIcons
              name='forward-to-inbox'
              size={22}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 12,
              color: COLORS?.white
            }}>
              Message
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Refund');
            }}
            style={{
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <FontAwesome name="dollar" size={20} color={COLORS?.white} />
            <Text
              style={{
                fontSize: 12,
                color: COLORS?.white,
                marginTop: 3,
              }}>
              Refund Requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ReturnOrder');
            }}
            style={{
              alignItems: 'center',
              marginLeft: 13,
            }}>
            <MaterialCommunityIcons

              name={'cart-variant'}
              size={22}
              color={COLORS?.white}
            />
            {/* <Feather name="codepen" size={20} color={COLORS?.white} /> */}
            <Text
              style={{
                fontSize: 12,
                color: COLORS?.white,
                marginTop: 3,
              }}>
              Return Order
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 10,
            marginVertical: 15,
          }}>
          <View style={styles?.shop}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FONTS?.bold,
                color: COLORS?.black,
                textAlign: 'center',
              }}>
              Shop Settings
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.regular,
                color: COLORS?.grey,
                textAlign: 'center',
                marginTop: 5,
              }}>
              Manage & organize your shop{' '}
            </Text>
            <View
              style={{
                alignItems: 'center',
                // flex:1,
                marginTop: 25,
              }}>
              <VegUrbanCommonBtn
                height={35}
                width={'75%'}
                borderRadius={5}
                textSize={13}
                text={'Go to Settings'}
                borderWidth={1}
                borderColor={COLORS?.white}
                textColor={COLORS?.white}
                backgroundColor={appPrimaryColor}
                onPress={() => {
                  navigation.navigate('Shops');
                }}
                textStyle={{
                  fontFamily: FONTS?.bold,
                }}
              />
            </View>
          </View>
          <View style={styles?.shop}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FONTS?.bold,
                color: COLORS?.black,
                textAlign: 'center',
              }}>
              Payment Settings
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.regular,
                color: COLORS?.grey,
                textAlign: 'center',
                marginTop: 5,
              }}>
              Configure Your payment method
            </Text>
            <View
              style={{
                alignItems: 'center',
                // flex:1
                marginTop: 25,
              }}>
              <VegUrbanCommonBtn
                height={35}
                width={'75%'}
                borderRadius={5}
                textSize={13}
                text={'Configure Now'}
                borderWidth={1}
                borderColor={COLORS?.white}
                textColor={COLORS?.white}
                backgroundColor={appPrimaryColor}
                onPress={() => {
                  navigation.navigate('Bank');
                }}
                textStyle={{
                  fontFamily: FONTS?.bold,
                }}
              />
            </View>
          </View>
        </View>

        {/* <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={LinerData}
        width={'100%'}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        color={'red'}
        bezier
        // chartConfig={chartConfig} // Add this line with chartConfig
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View> */}
        {/* <View
          style={{
            backgroundColor: COLORS?.colorPrimary,
            // flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-evenly'

          }}>
          <View style={{
            alignItems: 'center',
            marginLeft: 13

          }}>

            <MaterialIcons
              name='forward-to-inbox'
              size={22}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white
            }}>
              Message
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginLeft: 10

          }}>

            <FontAwesome

              name='dollar'
              size={20}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white,
              marginTop: 3
            }}>
              Refund Requests
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginLeft: 13

          }}>

            <Feather
              name='codepen'
              size={20}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white,
              marginTop: 3

            }}>
              Coupons
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginLeft: 13
          }}>

            <MaterialIcons

              name='payments'
              size={20}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white,
              marginTop: 3

            }}>
              Payment History
            </Text>
          </View>





        </View> */}
        <Text
          style={[
            GlobalStyle.headingText,
            {
              color: COLORS?.black,
              fontSize: 17,
              // marginTop: 25,
              alignItems: 'center',
              fontFamily: FONTS?.bold,
            },
          ]}>
          {t('Your Category')}
        </Text>
        <FlatList
          style={{
            flex: 1,
          }}
          // numColumns={1}

          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingTop: 10,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListEmptyComponent={() =>
            !showEmpty ? null : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                    color: COLORS?.black,
                  }}>
                  No Category found !
                </Text>
              </View>
            )
          }
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={category}
          renderItem={renderCtegory}
        // renderItem={({ item, index }) => <CategoryItem item={item} />}
        />

        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              alignItems: 'center',
            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: COLORS?.black,
                fontSize: 18,
                // marginTop: 25,
                alignItems: 'center',
                fontFamily: FONTS?.bold,
              },
            ]}>
            {t('Top Products')}
          </Text>
          <View
            style={{
              flex: 1,
            }}></View>
        </View>

        <TabOfferScreen />

        <View style={GlobalStyle.paddingVertical10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  locationArrow: {
    marginEnd: 20,
    // height: 25,
    // width: 25,
    // backgroundColor: COLORS.colorPrimary,
    borderRadius: 50,
  },
  shop: {
    flex: 1,
    width: '55%',
    height: 190,
    borderRadius: 10,
    backgroundColor: COLORS?.colorSecondary,
    marginHorizontal: 10,
    justifyContent: 'center',
    alinItem: 'center',
    elevation: 5,
  },

  sliderImage: {
    width: SIZES.width - 20,
    height: 200,
    overflow: 'hidden',
    borderRadius: 20,
    marginHorizontal: 15,
    alignSelf: 'center',
    // borderBottomEndRadius:50,
    // borderBottomColor:'red'
    marginTop: 10,
  },
  paginationStyleItem: {
    height: 5,
    width: 16,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: -35,
    color: COLORS?.white,
  },
  paginationendStyleItem: {
    height: 8,
    width: 8,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: -35,
    color: COLORS?.white,
  },
  dashbox: {
    width: '62%',
    height: 80,
    borderWidth: 1,
    marginHorizontal: 5,
    // alignItems: 'center',
    // alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS?.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    fontFamily: FONTS?.regular,
    fontSize: 13,
    color: COLORS?.white,
    marginBottom: 5,
    marginTop: 2,
  },
  price: {
    fontFamily: FONTS?.bold,
    fontSize: 20,
    color: COLORS?.white,
  },
  image: {
    width: SIZES.width - 30,
    marginTop: 3,
    height: 150,
    borderRadius: 3,
    alignSelf: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    // paddingHorizontal: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 5,
    // borderWidth:0.1
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
  },
  itemName: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
    fontFamily: 'Urbanist-Black',
    marginTop: 10,
    // alignItems:'center'
    textAlign: 'center',
  },
  itemImage: {
    width: 120,
    height: 130,
    alignItems: 'center',
    borderRadius: 10,
    // resizeMode:'stretch'
  },
  app_logo: {
    height: 35,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
    width: '21%',
    // marginTop: 30,
    // // resizeMode: 'cover',
    // marginBottom: 30,
    borderRadius: 8,
    marginLeft: 15,
    // padding: 50,
    // margin: 20
  },
});

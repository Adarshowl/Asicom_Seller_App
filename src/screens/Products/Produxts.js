import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  I18nManager,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../constants/Colors';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import ToolBarIcon from '../../utils/ToolBarIcon';
import {FONTS} from '../../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS, IMAGE_BASE_URL} from '../../network/ApiEndPoints';
import SellerEProgressBar from '../../utils/SellerEProgressBar';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const Produxts = () => {
  const [fav, setFav] = useState(false);
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  // const item = route.params.item;
  const navigation = useNavigation();

  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const defaultImage = useSelector(state => state.state?.defaultImage);
  const appcurrency = useSelector(state => state.state?.appcurrency);
  // console.log(appcurrency)
  const [loading, setLoading] = useState('');

  // useEffect(() => {
  //   getAllShop();
  // }, []);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              // setUserData(JSON.parse(value));
              getAllShop(JSON.parse(value)?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);
  const [productList, setProductList] = useState('');
  const [remaing, setRemaining] = useState('');

  const [showEmpty, setShowEmpty] = useState(false);

  // console.log("dddd", remaing)

  const userToken = useSelector(state => state.state?.userToken);

  const userData = useSelector(state => state.state?.userData);

  const getAllShop = () => {
    setLoading(true);
    try {
      ShowConsoleLogMessage(API_END_POINTS.PRODUCT_LIST);

      ApiCall('get', null, API_END_POINTS.PRODUCT_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log("Response data: ", JSON.stringify(response.data));

          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response.data));
            setProductList(response?.data?.response);
            setLoading(true);
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            if (response?.data?.message === 'Token Mismatch') {
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

  const defaultImageUri =
    'https://img.freepik.com/premium-vector/cosmetic-products-hair-care-vector-design_103044-2613.jpg';

  const clearUserToken = async () => {
    try {
      // await AsyncStorage.clear();
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

  const renderItem = ({item, index}) => {
    console.log('item', item);
    return (
      <View
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('UpdateProduct', {item});
        }}
        style={[
          styles.Wrapper,
          {
            // elevation: 2,
            backgroundColor: COLORS?.colorSecondary,

            flex: 1,
          },
        ]}>
        {/* <View
          style={[
            // styles.itemWrapper,
            {
              backgroundColor: COLORS?.white,
            },
          ]}

        > */}
        <ImageBackground
          style={[
            styles.itemImage,
            {
              // backgroundColor:"#F2F4F4",
              backgroundColor: COLORS?.white,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            },
          ]}>
          {/* {item?.thumbnail_image && item?.product_images?.length > 0 ? (
              <ImageBackground
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  marginTop: 15,
                  borderWidth: 0.2,
                  borderColor: 'grey',
                }}
                source={{
                  uri: item?.product_images[0] ||  item?.thumbnail_image, // Accessing the first image URI from the array
                }}
              />
            ) : null} */}
          <VegUrbanImageLoader
            styles={{
              width: 80,
              height: 80,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={IMAGE_BASE_URL + item?.thumbnail_image}
          />
        </ImageBackground>

        {/* </View> */}

        <View
          style={{
            flex: 1,
            marginStart: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alinItem: 'center',
            }}>
            <Text
              style={[
                // styles.itemName,
                {
                  color: COLORS?.black,
                  marginTop: 17,
                  fontFamily: FONTS?.regular,
                  maxWidth: '83%',
                },
              ]}
              numberOfLines={1}>
              {item?.product_name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UpdateProduct', {item});
              }}
              style={{
                // flexGrow: 1,
                // backgroundColor:'yellow',
                alignSelf: 'flex-start',
                alignItems: 'flex-end',
                marginTop: 10,
              }}>
              <ToolBarIcon
                title={MaterialIcons}
                iconName={'edit'}
                icSize={18}
                icColor={COLORS?.grey}
                style={{
                  marginEnd: 10,
                  backgroundColor: theme?.colors?.toolbar_icon_bg,
                }}
                onPress={() => {
                  navigation.navigate('UpdateProduct', {item});
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              // styles.itemName,
              {
                color: COLORS?.grey,
                // marginTop: 2,
                fontFamily: FONTS?.regular,
                fontSize: 13,
              },
            ]}
            numberOfLines={1}>
            {item?.category}
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginBottom: 5,
            }}>
            <Text
              style={[
                styles.itemName,
                {
                  color: COLORS?.black,
                  // marginTop: 5,
                  fontFamily: FONTS?.regular,
                },
              ]}
              numberOfLines={1}>
              {/* {appcurrency} */}
              Admin Approval
            </Text>
            {item?.admin_approval == 'Active' ? (
              <Text
                style={[
                  // styles.itemName,
                  {
                    color: COLORS?.green,
                    marginTop: 5,
                    fontFamily: FONTS?.bold,
                  },
                ]}
                numberOfLines={1}>
                Accepted
              </Text>
            ) : (
              <Text
                style={[
                  // styles.itemName,

                  {
                    color: COLORS?.picked,
                    marginTop: 5,
                    fontFamily: FONTS?.bold,
                  },
                ]}
                numberOfLines={1}>
                Pending
              </Text>
            )}
          </View>
          <View
            style={{
              // alignItems: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginBottom: 5,
            }}>
            <Text
              style={[
                // styles.itemName,
                {
                  color: appPrimaryColor,
                  // marginTop: 5,
                  fontFamily: FONTS?.bold,
                },
              ]}
              numberOfLines={1}>
              {appcurrency}
              {item?.amount}
            </Text>
            <VegUrbanCommonBtn
              height={30}
              width={'45%'}
              borderRadius={10}
              textSize={13}
              marginTop={10}
              // textColor={COLORS?.white}

              textColor={appPrimaryColor}
              text={'View Details'}
              backgroundColor={COLORS?.bg_gray}
              onPress={() => {
                navigation.navigate('ProductDetail', {item});
              }}
              textStyle={{
                fontFamily: FONTS?.bold,

                // textTransform: 'uppercase',
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        // GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: COLORS?.white,
          // borderRadius: 5,
          flex: 1,
          // elevation:5
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alinItem: 'center',
            flex: 1,
          }}>
          <VegUrbanCommonToolBar
            title="Product"
            style={{
              // backgroundColor: theme.colors.bg_color_onBoard,
              marginStart: 10,
              fontFamily: FONTS?.bold,
              // alinItem: 'center'
            }}
            textStyle={{
              color: COLORS?.black,
              fontFamily: FONTS?.bold,
              fontSize: 18,
              // textAlin: 'center'
            }}
          />
          <View
            style={{
              // marginTop: 10,
              marginEnd: 15,
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddNewProduct');
              }}>
              <Entypo
                name="circle-with-plus"
                size={40}
                color={appPrimaryColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View
          style={
            {
              // flex: 1,
            }
          }>
          <Text
            style={{
              fontSize: 16,
              color: COLORS?.black,
              fontFamily: FONTS?.bold,
              margin: 10,
            }}>
            All Product
          </Text>

          <FlatList
            style={{
              flex: 1,
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
                      color: COLORS?.grey,
                    }}>
                    No Product found !
                  </Text>
                </View>
              )
            }
            ListHeaderComponentStyle={{
              paddingTop: 5,
            }}
            showsVerticalScrollIndicator={false}
            data={productList}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Produxts;

const styles = StyleSheet.create({
  itemWrapper: {
    // flex: 1,
    // margin: 5,
    // marginVertical:5,
    // marginHorizontal:5,
    backgroundColor: COLORS.white,
    // maxWidth: SIZES.width / 2 - 10,
    // paddingBottom: 5,
    // padding: 5,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alinItem: 'center',
  },
  Wrapper: {
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
    // margin: 5,
    marginVertical: 9,
    flexDirection: 'row',
    backgroundColor: COLORS.bg_color,
    // borderRadius: 5,
    // maxWidth: SIZES.width / 2 - 10,
    paddingBottom: 5,
    // padding: 5,
    // alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 5,
  },
  itemImage: {
    // flexGrow:1,
    width: 85,
    height: 85,
    borderRadius: 20,
    justifyContent: 'center',
    alinItem: 'center',
    // alignSelf:'center'
  },
  itemName: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 2,
    // alignItems:'center'
    textAlign: 'center',
    fontFamily: FONTS?.bold,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: FONTS?.bold,

    color: COLORS.white,
    textAlign: 'center',
    marginTop: 8,
  },
  itemName1: {
    fontSize: 14,
    color: COLORS.black,
    // marginTop: 2,
    // alignItems:'center'
    textAlign: 'center',
    fontFamily: FONTS?.bold,
  },
  itemPrice1: {
    // fontSize: 25,
    fontFamily: FONTS?.bold,
    // color: COLORS.black,
    textAlign: 'center',
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  boxes: {
    width: '50%',
    height: 80,
    borderWidth: 1,
    borderColor: COLORS?.black,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    alinItem: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS?.colorPrimary,
  },
  boxes1: {
    width: '100%',
    height: 70,
    borderWidth: 0.5,
    borderColor: COLORS?.black,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    alinItem: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  I18nManager,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {CommonActions, useNavigation} from '@react-navigation/native';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import ApiCall from '../../network/ApiCall';

import {API_END_POINTS, IMAGE_BASE_URL} from '../../network/ApiEndPoints';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ShowToastMessage} from '../../utils/Utility';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const TabOfferScreen = () => {
  const [fav, setFav] = useState(false);
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  // const item = route.params.item;
  const navigation = useNavigation();
  const [data, setData] = useState('');

  const [loading, setLoading] = useState(false);

  const [favData, setFavData] = useState([
    {
      name: 'Nike Men',
      image: 'https://cdn-icons-png.flaticon.com/128/7819/7819061.png',

      fav: true,
    },
    {
      name: 'under stream',
      image: 'https://cdn-icons-png.flaticon.com/128/1040/1040254.png',

      fav: true,
    },
    {
      name: 'Hp',
      image:
        'https://img.freepik.com/free-vector/creative-computer-logo-template_23-2149201860.jpg',

      fav: true,
    },
    {
      name: 'Rb 3030',
      image: 'https://cdn-icons-png.flaticon.com/128/9592/9592226.png',
      fav: true,
    },

    {
      name: 'Zonio SuperWatch',
      image: 'https://cdn-icons-png.flaticon.com/128/2976/2976655.png',

      fav: true,
    },
    {
      name: 'SUNGAIT',
      image: 'https://cdn-icons-png.flaticon.com/128/1040/1040254.png',
      fav: true,
    },
  ]);

  useEffect(() => {
    getAllShop();
  }, []);

  const [productList, setProductList] = useState('');
  const [showEmpty, setShowEmpty] = useState(false);

  // console.log("dddd", productList)

  const appcurrency = useSelector(state => state.state?.appcurrency);

  const userToken = useSelector(state => state.state?.userToken);

  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const defaultImage = useSelector(state => state.state?.defaultImage);

  // console.log('color', appPrimaryColor);
  const getAllShop = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.TOP_PRODUCT_LIST)
      // ShowConsoleLogMessage(userToken)

      ApiCall('get', null, API_END_POINTS.TOP_PRODUCT_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            console.log("productddd: ", JSON.stringify(response.data));
            setProductList(response?.data?.data);
            setLoading(true);
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            // ShowConsoleLogMessage(response?.data?.message)
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

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductDetail', {item});
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
            // style={styles.itemImage}
            source={IMAGE_BASE_URL + item?.thumbnail_image}
          />
        </ImageBackground>

        {/* </View> */}
        <View
          style={{
            flex: 1,
            marginStart: 15,
          }}>
          <Text
            style={[
              // styles.itemName,
              {
                color: COLORS?.black,
                marginTop: 10,
                fontFamily: FONTS?.regular,
              },
            ]}
            numberOfLines={1}>
            {item?.product_name}
          </Text>
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
          <Text
            style={[
              // styles.itemName,
              {
                color: appPrimaryColor,
                marginTop: 5,
                fontFamily: FONTS?.bold,
              },
            ]}
            numberOfLines={1}>
            {appcurrency}
            {item?.amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        // GlobalStyle.mainContainerBgColor,
        {
          // backgroundColor: COLORS?.colorSecondary,
          borderRadius: 5,
        },
      ]}>
      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListEmptyComponent={() =>
          !showEmpty ? null : (
            <View style={styles?.nodataText}>
              <Text
                style={{
                  fontSize: 16,
                  // marginTop: 50 ,
                  textAlign: 'center',
                  color: COLORS?.white,
                }}>
                No Product Available!
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
  );
};
export default TabOfferScreen;

const styles = StyleSheet.create({
  itemWrapper: {
    // flex: 1,
    // margin: 5,
    // marginVertical:5,
    // marginHorizontal:5,
    backgroundColor: COLORS.white,
    // maxWidth: SIZES.width / 2 - 10,
    // paddingBottom: 5,
    padding: 5,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alinItem: 'center',
  },
  Wrapper: {
    marginTop: 10,
    flex: 1,
    // margin: 5,
    marginVertical: 5,
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
    marginHorizontal: 10,
    // paddingVertical:1
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
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
    // alignItems:'center'
    // textAlign: 'center'
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.regular,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  nodataText: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS?.colorPrimary,
    marginHorizontal: 20,
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 40,
  },
});

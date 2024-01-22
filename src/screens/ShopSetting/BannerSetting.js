import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  I18nManager,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const BannerSetting = () => {
  const [loading, setLoading] = useState('');

  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  const error = '';

  const navigation = useNavigation();

  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              // setUserData(JSON.parse(value));
              getShopSetting(JSON.parse(value)?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const [bannerList, setBanner] = useState('');
  const [remaing, setRemaining] = useState('');

  const [showEmpty, setShowEmpty] = useState(false);

  console.log('dddd', bannerList);

  const userToken = useSelector(state => state.state?.userToken);

  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  const [thumbImage, setThumbImage] = useState('');
  const [thumbSelected, setThumbSelected] = useState(false);

  const [count, setCount] = useState(0);

  const [img, setImg] = useState([]);

  const openThumbImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
    }).then(images => {
      setThumbImage(images.path);
    });
    setCount(0);
    // setImageArray(imageArray);
    setCount(0);
  };

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to Camera to upload profile photo',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const [imageData, setImageData] = useState({});
  console.log('banner', imageData);

  const getShopSetting = () => {
    setLoading(true);
    try {
      ShowConsoleLogMessage(API_END_POINTS.SHOP_SETTING_LIST);

      ApiCall('get', null, API_END_POINTS.SHOP_SETTING_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log("Response data: ", JSON.stringify(response.data));

          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response.data));
            const responseData = response?.data?.response;
            setImageData(response?.data?.response);

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

  // { use Token } , updateId, shop_top_banner, shop_slider_banners,
  //  shop_full_width_banners1, shop_full_width_banners2, shop_half_width_banners

  const getBannerUpdate = () => {
    setLoading(true);

    try {
      const body = {
        updateId: imageData?._id,
        shop_top_banner: thumbImage,
        // shop_slider_banners: thumbImage,
        shop_full_width_banners1: thumbImage,
        // shop_full_width_banners2: thumbImage,
        // shop_half_width_banners: thumbImage,
      };
      // console.log("body", body)
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.UPDATE_SHOP_BANNER));

      ApiCall('post', body, API_END_POINTS.UPDATE_SHOP_BANNER, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log(" add product ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            // console.log(" notifcation: View ", JSON.stringify(response.data));
            // setDashboard(response?.data?.data)
            navigation.goBack('Shops');
            ShowToastMessage(response?.data?.message);
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
          }
        })
        .catch(error => {
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
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
          borderRadius: 5,
          flex: 1,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors.bg_color_onBoard,
            elevation: 5,
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
          title="Banner Settings"
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
      <ScrollView>
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            flex: 1,
            backgroundColor: COLORS?.white,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTS?.bold,
              color: appPrimaryColor,
              marginBottom: 10,
            }}>
            Banner Select
          </Text>

          <View
            // onPress={() => {
            //     if (isPermitted()) {
            //         openThumbImagePicker();
            //     }
            // }}
            // onPress={() => {
            //   setThumbSelected(!thumbSelected);
            // }}
            style={{
              width: '95%',
              height: 50,
              flexDirection: 'row',
              marginTop: 25,
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: thumbSelected ? COLORS.primaryColor : COLORS.grey,
              borderRadius: 10,
              marginHorizontal: 10,
              backgroundColor: thumbSelected ? COLORS.ghostwhite : COLORS.white,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.blue,
                fontFamily: FONTS?.regular,

                // marginBottom: 15,
                marginStart: 20,
                // textAlign: 'left',
              }}>
              Choose File
            </Text>
            <VegUrbanCommonBtn
              height={45}
              width={'35%'}
              borderRadius={5}
              textSize={16}
              // marginTop={20}
              // textColor={COLORS?.white}

              textColor={COLORS?.albumColorPrimaryBlack}
              text={'Browse'}
              backgroundColor={COLORS?.bg_gray}
              onPress={() => {
                if (isPermitted()) {
                  openThumbImagePicker();
                }
              }}
              textStyle={{
                fontFamily: FONTS?.regular,

                // textTransform: 'uppercase',
              }}
            />
          </View>
          {thumbImage ? (
            <Image
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
                uri: thumbImage,
              }}
            />
          ) : null}
          {imageData?.shop_full_width_banners1 &&
          imageData?.shop_full_width_banners1?.length > 0 ? (
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
                uri: imageData?.shop_full_width_banners1[0],
              }}
            />
          ) : null}
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={10}
            textSize={16}
            marginTop={20}
            // textColor={COLORS?.white}

            textColor={COLORS?.white}
            text={'Save'}
            backgroundColor={appPrimaryColor}
            onPress={() => {
              getBannerUpdate();
            }}
            textStyle={{
              fontFamily: FONTS?.bold,

              // textTransform: 'uppercase',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BannerSetting;
const styles = StyleSheet.create({
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
    // height: 42,
    // marginHorizontal: 0,
    // // borderRadius: 10,
    // fontFamily: 'Quicksand-Regular',
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

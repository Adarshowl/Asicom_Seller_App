import React, {useContext, useEffect, useState} from 'react';
import {I18nManager, ScrollView, StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const SocialMediaLink = () => {
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;
  const [loading, setLoading] = useState('');

  const error = '';

  const navigation = useNavigation();

  const [facebook, setFaceBook] = useState('');

  const [Instagram, setInstagram] = useState('');
  const [Twitter, setTwitter] = useState('');
  const [Google, setGoogle] = useState('');
  const [Youtube, setYoutube] = useState('');

  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  // useEffect(() => {
  //     getShopSetting();
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
              getShopSetting(JSON.parse(value)?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const [productList, setShopSettingList] = useState({});
  const [remaing, setRemaining] = useState('');

  const [showEmpty, setShowEmpty] = useState(false);

  // console.log("dddd", productList)

  const userToken = useSelector(state => state.state?.userToken);

  const userData = useSelector(state => state.state?.userData);

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
            setShopSettingList(response?.data?.response);
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
  useEffect(() => {
    if (productList) {
      setFaceBook(productList?.shop_facebook_link);
      setInstagram(productList?.shop_instagram_link);
      // setPhoneNo(userData?.response.phone);
      setTwitter(productList?.shop_twitter_link);
      setGoogle(productList?.shop_google_link);
      setYoutube(productList?.shop_youtube_link);
    }
  }, [productList]);

  const isValidURL = url => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(url);
  };

  const getSocialMedia = () => {
    setLoading(true);

    try {
      const links = {
        facebook: facebook,
        Instagram: Instagram,
        Twitter: Twitter,
        Google: Google,
        Youtube: Youtube,
      };

      for (const key in links) {
        if (Object.prototype.hasOwnProperty.call(links, key)) {
          const value = links[key];
          if (value && !isValidURL(value)) {
            ShowToastMessage(
              `${key} link is not in the correct format (should start with 'https://')`,
            );
            setLoading(false);
            return;
          }
        }
      }
      const body = {
        updateId: productList?._id,
        shop_facebook_link: facebook,
        shop_instagram_link: Instagram,
        shop_twitter_link: Twitter,
        shop_google_link: Google,
        shop_youtube_link: Youtube,
      };

      // console.log(body);
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.SOCIAL_MET_UPADTE_SHOP));

      ApiCall('post', body, API_END_POINTS.SOCIAL_MET_UPADTE_SHOP, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log(" add product ", JSON.stringify(response));

          if (response?.statusCode === 200) {
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
            // Handle other response statuses if needed
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
          title="Social Media Link"
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
            Social Media Information
          </Text>

          <VegUrbanEditText
            placeholder="Enter FaceBook Link"
            label="Facebook"
            value={facebook}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setFaceBook(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Instagram Link"
            label="Instagram"
            value={Instagram}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setInstagram(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Twitter Link"
            label="Twitter"
            value={Twitter}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setTwitter(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Google Link"
            label="Google"
            value={Google}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setGoogle(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Youtube Link"
            label="Youtube"
            value={Youtube}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setYoutube(v)}
          />

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
              getSocialMedia();
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

export default SocialMediaLink;
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

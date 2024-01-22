import {
  Alert,
  CommonActions,
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HTMLRender from 'react-native-render-html';
import {SIZES} from '../../constants';

import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import {useSelector} from 'react-redux';
import ApiCall from '../../network/ApiCall';

import {ShowToastMessage} from '../../utils/Utility';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const PrivacyPolicy = ({navigation}) => {
  const [show, setShow] = useState('');
  const theme = useContext(themeContext);
  const {t} = useTranslation();

  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [loading, setLoading] = useState(true);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  useEffect(() => {
    getAllShop();
  }, []);

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PRIVACY_POLICY_API));

      ApiCall('get', null, API_END_POINTS.PRIVACY_POLICY_API, {
        // 'Content-Type': 'application/json',
        // 'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log("Response data: ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            console.log(
              'Response data: ',
              JSON.stringify(response?.data?.response?.privacy_policy),
            );
            const htmlContent = response?.data?.response?.privacy_policy;
            setPrivacyPolicy(htmlContent);
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
          backgroundColor: COLORS?.white,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
            elevation: 5,
          },
        ]}>
        {/* <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme?.colors?.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        /> */}
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
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
            // ShowToastMessage('Coming Soon!');
          }}
        />
        <VegUrbanCommonToolBar
          title={t('privacy_policy')}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: appPrimaryColor,
            marginStart: 20,
            fontFamily: FONTS?.bold,
          }}
        />
      </View>
      {/*<View style={GlobalStyle.flexAlignJustifyCenter}>*/}
      {/*  <Text style={styles.text}>{STRING.terms_conditions} Page</Text>*/}
      {/*</View>*/}
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          {privacyPolicy ? (
            <HTMLRender
              source={{html: privacyPolicy}}
              contentWidth={SIZES.width}
              baseStyle={[
                styles.plainTextContent,
                {
                  color: appPrimaryColor,
                },
              ]}
            />
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={{paddingVertical: 5}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: COLORS?.white,
  },
  text: {
    marginHorizontal: 15,
    marginTop: 10,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.grey,
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  plainTextContent: {
    fontSize: 18,
    lineHeight: 25,
    padding: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

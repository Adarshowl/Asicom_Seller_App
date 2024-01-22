import {
  Alert,
  FlatList,
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {ShowToastMessage} from '../../utils/Utility';
import {CommonActions, useIsFocused} from '@react-navigation/native';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import QuiresList from './QuiresList';
import {useDispatch, useSelector} from 'react-redux';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const ProductQuries = ({navigation}) => {
  const [amount, setAmount] = useState(100);

  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  // console.log("token",userToken)
  const dispatch = useDispatch();

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
              getAllShop(JSON.parse(value)?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  // You can add more items to the 'dashboard' array as needed.

  const [orderList, setOrderList] = useState('');

  const [today, setTodayData] = useState({});
  const [loading, setLoading] = useState('');
  // console.log("pending", orderList)

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PRODUCT_QURIES_LIST));
      // console.log("token", JSON.stringify(userToken));

      ApiCall('get', null, API_END_POINTS.PRODUCT_QURIES_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response?.data?.response));
            setOrderList(response?.data?.response);

            if (response?.data?.length !== 0) {
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
          title="Product Quries"
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
          style={
            {
              // flez: 1,
            }
          }>
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
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alinItem: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 50,
                      color: COLORS?.grey,
                    }}>
                    No Data found !
                  </Text>
                </View>
              )
            }
            ListHeaderComponentStyle={{
              paddingTop: 5,
            }}
            showsVerticalScrollIndicator={false}
            data={orderList}
            renderItem={({item, index}) => <QuiresList item={item} />}
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
  image: {
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    borderRadius: 10,
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

export default ProductQuries;

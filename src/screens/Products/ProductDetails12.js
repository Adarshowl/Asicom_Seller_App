import {
  Alert,
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyle from '../../styles/GlobalStyle';
import moment from 'moment';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS, IMAGE_BASE_URL} from '../../network/ApiEndPoints';
import {ShowToastMessage} from '../../utils/Utility';
import SellerEProgressBar from '../../utils/SellerEProgressBar';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const ProductDetail = ({navigation, route}) => {
  const [amount, setAmount] = useState(100);
  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);

  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const {item} = route.params;
  // console.log('Item in Order Screen:', item);
  const id = item?._id;

  useEffect(() => {
    getProdcutDetails();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [showEmpty, setShowEmpty] = useState(false);
  const [address, setAddressData] = useState({});

  const [OrderProduct, setOrderProduct] = useState({});

  // console.log(" Product", OrderProduct)
  const [loading, setLoading] = useState('');

  const getProdcutDetails = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PRODUCT_DETAILS_API + id));

      ApiCall('get', null, API_END_POINTS.PRODUCT_DETAILS_API + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log(response?.data?.data)

          if (response?.statusCode === 200) {
            // console.log("product data for  ", JSON.stringify(response?.data));
            setDashboard(response?.data?.response);
            setOrderProduct(response?.data?.response?.product_id);
            setAddressData(response?.data?.addressData);

            if (response.data?.length === 0) {
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

  const colorsText = Array.isArray(dashboard?.productcolor)
    ? dashboard.productcolor.join(', ')
    : '';
  // const sizesText = dashboard?.productsize.join(',');
  const sizesText = Array.isArray(dashboard?.productsize)
    ? dashboard.productsize.join(', ')
    : '';

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
          flex: 1,
          // backgroundColor:'red'
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation: 0,
            // flex:1
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          color={theme.colors.white}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 15,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Product Details"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold,
            alinItem: 'center',
          }}
          textStyle={{
            color: theme.colors.white,
            fontFamily: FONTS?.bold,
            fontSize: 18,
            textAlin: 'center',
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {/* <FlatList
            data={dashboard}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <OrderDetails item={item} />
            )}
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, marginTop: 50 }}>No data found!</Text>
              </View>
            )}
          /> */}

        <View
          style={{
            // flexGrow: 1,

            flex: 1,
            // marginHorizontal: 12,
            // backgroundColor:'red'
          }}>
          <View style={styles?.detailsView}>
            <View style={styles?.viewtext}>
              <View style={{}}>
                <Text style={styles?.ordertext}>Product Code</Text>
                <Text
                  style={[
                    styles?.normalLeft,
                    {
                      color: COLORS?.red,
                      fontFamily: FONTS?.bold,
                    },
                  ]}>
                  {dashboard?._id}
                </Text>
              </View>
              <View
                style={{
                  maxWidth: '51%',
                }}>
                <Text style={styles?.ordertext}>User Name</Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles?.normaltext,
                    {
                      // width:'80%'
                    },
                  ]}>
                  {dashboard?.userId?.name}
                </Text>
              </View>
            </View>

            <View style={styles?.viewtext}>
              <View
                style={{
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles?.ordertext}>Date & Time</Text>
                <Text style={styles?.normalLeft}>
                  {/* {address?.createdAt} */}
                  {moment(address?.createdAt).format('DD-MM-YYYY')} :
                  {moment(address?.createdAt).format('LT')}
                </Text>
              </View>
              <View style={{}}>
                <Text style={styles?.ordertext}>Admin Approval</Text>
                <Text style={styles?.normaltext}>
                  {dashboard?.admin_approval}
                </Text>
              </View>
            </View>

            <View style={styles?.viewtext}>
              <View>
                <Text style={styles?.ordertext}>Added By</Text>
                <Text style={styles?.normalLeft}>{dashboard?.addedby}</Text>
              </View>
              <View>
                <Text style={styles?.ordertext}>Tax Amount</Text>
                <Text style={styles?.normaltext}>{dashboard?.taxamount}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              // alinItem: 'center',
              // alignSelf: 'center',
              marginTop: 20,
              // justifyContent: 'center',
              marginBottom: 0,
            }}>
            <Text style={styles?.produst}>Ordered Product</Text>
          </View>

          <View style={styles?.detailsView1}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  alinItem: 'center',
                  //  paddingVertical: 5,
                  //  paddingHorizontal:10,
                }}>
                <View>
                  <VegUrbanImageLoader
                    source={IMAGE_BASE_URL + item?.thumbnail_image}
                    style={{
                      width: 68,
                      height: 60,
                      borderRadius: 10,
                      // flex:1
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      // alignContent:'flex-end'
                      alinItem: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={styles?.ordertext}></Text>
                    <Text
                      style={[
                        styles?.ordertext,
                        {
                          color: COLORS?.red,
                          marginTop: -10,
                        },
                      ]}>
                      ${item?.amount || 0}
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      marginLeft: 15,
                      // flexDirection:'row',
                    }}>
                    <Text
                      numberOfLines={3}
                      style={[
                        styles?.normalLeft,
                        {
                          maxWidth: '90%',
                        },
                      ]}>
                      {item?.description}
                    </Text>
                    <Text
                      style={[
                        styles?.ordertext,
                        {
                          marginTop: 2,
                        },
                      ]}>
                      {dashboard?.quantity} x item
                    </Text>
                    <Text style={styles?.normalLeft}>
                      Prpduct : {item?.product_name}
                    </Text>
                    <Text style={styles?.normalLeft}>
                      Category : {item?.category}
                    </Text>

                    <Text style={styles?.normalLeft}>
                      Weight : {item?.weight}kg
                    </Text>
                    <Text style={styles?.normalLeft}>Sold : {item?.sold}</Text>

                    <Text style={styles?.normalLeft}>Size : {sizesText}</Text>
                    <Text style={styles?.normalLeft}>Size : {colorsText}</Text>

                    {/* <View style={{
                        flexDirection: 'row',
                        flex: 1
                      }}>
                        <Text style={styles?.normalLeft}>Color</Text>
                        <View
                          style={{
                            backgroundColor: item?.productcolor,
                            width: 15,
                            height: 15,
                            borderRadius: 20,
                            marginVertical: 3,
                            marginHorizontal: 5
                          }}
                        >
                        </View>
                      </View> */}

                    {/* <Image
                      source={{
                        uri:item?.product_id?.product_images[0]
                      }}
                      style={{
                        width:60,
                        height:60,
                        flex:1
                      }}
                      /> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginBottom: 10, flex: 1}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  totalView: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    flex: 1,
  },
  statusIcon: {
    width: 30,
    height: 30,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    color: COLORS?.black,
  },
  filed: {
    borderRadius: 5,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
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
  detailsView1: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    fontSize: 12,
    fontFamily: FONTS?.regular,
    color: COLORS?.black,
    textAlign: 'left',
    marginTop: 2,
  },
  produst: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    textAlign: 'center',
  },
});

export default ProductDetail;

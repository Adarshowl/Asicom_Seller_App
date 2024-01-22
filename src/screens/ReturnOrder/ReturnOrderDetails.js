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

const ReturnOrderDetails = ({navigation, route}) => {
  const [amount, setAmount] = useState(100);
  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);
  const error = '';
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const {item} = route.params;
  console.log('Item in Order Screen:', item);
  const id = item?.order_id?._id;

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [showEmpty, setShowEmpty] = useState(false);
  const [address, setAddressData] = useState({});
  const [selecStatus, setDeliveryStatus] = useState([]);

  const [OrderProduct, setOrderProduct] = useState([]);

  // console.log(" Product", OrderProduct)
  const [loading, setLoading] = useState('');
  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 0.5;
    } else {
      return 0.2;
    }
  };
  const getBorderWidth1 = () => {
    if (error) {
      return 1;
    }
    if (focused1) {
      return 0.2;
    } else {
      return 0.2;
    }
  };

  const getBorderColor1 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused1) {
      return COLORS?.black;
    } else {
      return COLORS?.black;
    }
  };

  const getBgColor1 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused1) {
      return COLORS?.white;
    } else {
      // return COLORS.lightest_gray1;
      return COLORS?.white;
      // return COLORS?.colorSecondary;
    }
  };
  const deliveryStatus = [
    {name: 'On The Way', code: '1', value: 'On The Way'},
    {name: 'Picked Up', code: '1', value: 'Shipped'},
    {name: 'Delivered', code: '3', value: 'Delivered'},
  ];
  const handleStatus = unit => {
    setDeliveryStatus(unit);
  };

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.ORDER_DETAILS + id));
      // console.log("orderList", userToken)

      ApiCall('get', null, API_END_POINTS.ORDER_DETAILS + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log(response?.data?.data)

          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response?.data?.data));
            setDashboard(response?.data?.data);
            setOrderProduct(response?.data?.response);
            setAddressData(response?.data?.data?.addressId);

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
  const OrderStatusUpdate = () => {
    console.log('iiiiiiii', item?._id);
    setLoading(true);

    try {
      const body = {
        updateId: item._id,
        delivery_status: selecStatus,
      };
      // console.log(body)
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Order_Update_Status));

      ApiCall('post', body, API_END_POINTS.Order_Update_Status, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log(" orderstatus sss ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            // setDashboard(response?.data?.data)

            navigation.goBack('Order');
            ShowToastMessage(response?.data?.success);
          } else if (response?.statusCode === 500) {
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

  // const colorsText = Array.isArray(OrderProduct?.productcolor) ? OrderProduct?.productcolor.join(', ') : '';
  //   // const sizesText = dashboard?.productsize.join(',');
  //   const sizesText = Array.isArray(OrderProduct?.productsize) ? OrderProduct.productsize.join(', ') : '';

  const renderItem = ({item}) => {
    //  const sizesText = item?.productsize.join(',');

    const colorsText = Array.isArray(item?.productcolor)
      ? item?.productcolor.join(', ')
      : '';
    const sizesText = Array.isArray(item?.productsize)
      ? item.productsize.join(', ')
      : '';
    console.log(sizesText);

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <VegUrbanImageLoader
              source={IMAGE_BASE_URL + item?.product_id?.thumbnail_image}
              styles={{
                width: 68,
                height: 60,
                borderRadius: 10,
              }}
            />
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
              <Text style={styles?.orderText}></Text>
              <Text
                style={[
                  styles?.orderText,
                  {
                    color: appPrimaryColor,
                    marginTop: -10,
                    fontFamily: FONTS?.bold,
                  },
                ]}>
                ${item?.amount || 0}
              </Text>
            </View>
          </View>

          <View style={{marginLeft: 15}}>
            <Text style={styles?.normalLeft}>
              {item?.product_id?.description}
            </Text>
            <Text style={[styles?.orderText, {marginTop: 2}]}>
              {item?.quantity} x item
            </Text>
            <Text style={styles?.normalLeft}>
              Product : {item?.product_name}
            </Text>
            <Text style={styles?.normalLeft}>
              Category : {item?.product_id?.category}
            </Text>
            <Text style={styles?.normalLeft}>
              Sub Category : {item?.product_id?.subcategory}
            </Text>
            <Text style={styles?.normalLeft}>
              Unit Type : {item?.product_id?.unittype}
            </Text>

            <Text style={styles?.normalLeft}>
              Weight : {item?.product_id?.weight}kg
            </Text>
            <Text style={styles?.normalLeft}>Color : {item?.color}</Text>
            <Text style={styles?.normalLeft}>Size : {item?.size}</Text>
            <Text style={styles?.normalLeft}>
              Prodcut Return Policy : {item?.product_id?.product_return_policy}
            </Text>

            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles?.normalLeft}>Color</Text>
              <View
                style={{
                  backgroundColor: item?.color,
                  width: 15,
                  height: 15,
                  borderRadius: 20,
                  marginVertical: 3,
                  marginHorizontal: 5
                }}
              />
            </View> */}
          </View>
        </View>
      </View>
    );
  };

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
            elevation: 5,
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
          title="Order Details"
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
                <Text style={styles?.ordertext}>Order Code</Text>
                <Text
                  style={[
                    styles?.normalLeft,
                    {
                      color: appPrimaryColor,
                      fontFamily: FONTS?.bold,
                    },
                  ]}>
                  {dashboard?.order_id}
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
                  {dashboard?.addressId?.name}
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
                <Text style={styles?.ordertext}>Payment Method</Text>
                <Text style={styles?.normaltext}>
                  {dashboard?.payment_mode}
                </Text>
              </View>
            </View>

            <View style={styles?.viewtext}>
              <View>
                <Text style={styles?.ordertext}>Payment Status</Text>
                <Text style={styles?.normalLeft}>
                  {dashboard?.payment_status}
                </Text>
              </View>
              <View>
                <Text style={styles?.ordertext}>Delivery Status</Text>
                {/* <Text style={styles?.normaltext}>

                  {dashboard?.delivery_status}
                  </Text> */}

                <Text
                  style={[
                    styles.normaltext,
                    {
                      // alignSelf: 'flex-start',
                      color:
                        item?.is_cancelled === 'Active'
                          ? COLORS.red
                          : item?.delivery_status === 'Picked Up'
                          ? '#F49127'
                          : item?.delivery_status === 'Delivered'
                          ? COLORS.green
                          : item?.delivery_status === 'On The Way'
                          ? COLORS.ontheway
                          : item?.delivery_status === 'Shipped'
                          ? COLORS.ontheway
                          : COLORS.black,
                      fontFamily: FONTS.bold,
                    },
                  ]}
                  numberOfLines={1}>
                  {item?.is_cancelled === 'Active'
                    ? 'cancelled'
                    : item?.delivery_status === 'Shipped'
                    ? 'On the way'
                    : item?.delivery_status === 'Delivered'
                    ? 'Delivered'
                    : 'Pending'}
                </Text>
              </View>
            </View>

            <View style={styles?.viewtext}>
              <View
                style={{
                  maxWidth: '65%',
                }}>
                <Text style={styles?.ordertext}>Shipping Address</Text>
                <Text style={styles?.normalLeft}>Name: {address?.name}</Text>
                <Text style={styles?.normalLeft}>Email: {address?.email}</Text>

                <Text style={styles?.normalLeft}>
                  Address: {address?.address}
                </Text>
                <Text style={styles?.normalLeft}>
                  Address Type: {address?.addressType}
                </Text>
                <Text style={styles?.normalLeft}>City: {address?.city}</Text>
              </View>
              <View>
                <Text style={styles?.ordertext}>Total Amount</Text>
                <Text
                  style={[
                    styles?.normaltext,
                    {
                      color: COLORS?.colorPrimary,
                      fontFamily: FONTS?.bold,
                      // marginTop: 25
                    },
                  ]}>
                  ${dashboard?.totalamount || 0}
                </Text>
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
            <Text style={[styles?.produst,{
            color:appPrimaryColor
            }]}>Ordered Product</Text>
          </View>

          <View style={styles?.detailsView1}>
            <FlatList
              data={OrderProduct}
              keyExtractor={item => item._id}
              renderItem={renderItem}
            />
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <View style={styles?.totalView}>
              <View style={styles?.viewtext}>
                <Text style={styles?.ordertext}>SUB TOTAL</Text>
                {/* <Text style={styles?.normalLeft}>paid</Text> */}
                <Text style={styles?.ordertext}>
                  ${dashboard?.totalamount || 0}
                </Text>
              </View>

              {/* <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>TAX</Text>
                <Text style={styles?.ordertext}>$0.00</Text>

              </View> */}

              <View style={styles?.viewtext}>
                <Text style={styles?.ordertext}>Delivery Comission</Text>
                <Text style={styles?.ordertext}>
                  ${dashboard?.delivery_commission || 0}
                </Text>
              </View>
              <View style={styles?.viewtext}>
                <Text style={styles?.ordertext}>Shipping Cost</Text>
                <Text style={styles?.ordertext}>
                  {dashboard?.shippingcharges || 0}
                </Text>
              </View>
              {/* <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>DISCOUNT</Text>
                <Text style={styles?.ordertext}>$0.00</Text>

              </View> */}
              <View
                style={{
                  borderWidth: 0.2,
                  width: '100%',
                  color: COLORS?.gray,
                  marginVertical: 8,
                  height: 0,
                }}
              />

              <View style={styles?.viewtext}>
                <Text style={styles?.ordertext}>GRAND TOTAL</Text>
                <Text style={styles?.ordertext}>
                  ${dashboard?.totalamount || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: '10%',
            flex: 1,
          }}
        />
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

export default ReturnOrderDetails;

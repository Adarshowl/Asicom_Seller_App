// import {
//   Alert,
//   FlatList,
//   I18nManager,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Picker} from '@react-native-picker/picker';
//
// import GlobalStyle from '../../styles/GlobalStyle';
// import moment from 'moment';
// import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {COLORS} from '../../constants/Colors';
// import themeContext from '../../constants/themeContext';
// import {useTranslation} from 'react-i18next';
// import {FONTS} from '../../constants/Fonts';
// import ApiCall from '../../network/ApiCall';
// import {API_END_POINTS, IMAGE_BASE_URL} from '../../network/ApiEndPoints';
// import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
// import SellerEProgressBar from '../../utils/SellerEProgressBar';
// import {useSelector} from 'react-redux';
// import {CommonActions} from '@react-navigation/native';
// import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
// import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
//
// const OrderDetails = ({navigation, route}) => {
//   const [amount, setAmount] = useState(100);
//   const userToken = useSelector(state => state.state?.userToken);
//   const userData = useSelector(state => state.state?.userData);
//   const [focused, setFocused] = React.useState(false);
//   const [focused1, setFocused1] = React.useState(false);
//   const error = '';
//
//   const theme = useContext(themeContext);
//   const {t} = useTranslation();
//   const [count, setCount] = useState(1);
//   const [show, setShow] = useState(false);
//   const {item} = route.params;
//   // console.log('Item in Order Screen:', item);
//   const id = item?._id;
//
//   useEffect(() => {
//     getAllShop();
//   }, []);
//   const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
//   const appcurrency = useSelector(state => state.state?.appcurrency);
//
//   const [activeDeliveryBoy, setActiveDeliveryBoy] = useState([]);
//   const [deliveryBoy, setDeliveryBoy] = useState(null);
//   const [deliveryAssign, setDeliveryAssign] = useState(null);
//   const [dashboard, setDashboard] = useState('');
//   const [showEmpty, setShowEmpty] = useState(false);
//   const [address, setAddressData] = useState({});
//   const [selecStatus, setDeliveryStatus] = useState(null);
//   const [selectDeliveryBoy, setSelectDeliveryBoy] = useState(null);
//   const [selectDeliveryBoyName, setSelectDeliveryBoyName] = useState('');
//
//   const [OrderProduct, setOrderProduct] = useState([]);
//
//   // console.log(" Product", OrderProduct)
//   const [loading, setLoading] = useState('');
//   const getBorderWidth = () => {
//     if (error) {
//       return 1;
//     }
//     if (focused) {
//       return 0.5;
//     } else {
//       return 0.2;
//     }
//   };
//   const getBorderWidth1 = () => {
//     if (error) {
//       return 1;
//     }
//     if (focused1) {
//       return 0.2;
//     } else {
//       return 0.2;
//     }
//   };
//
//   const getBorderColor1 = () => {
//     if (error) {
//       return COLORS.red;
//     }
//
//     if (focused1) {
//       return COLORS?.black;
//     } else {
//       return COLORS?.black;
//     }
//   };
//
//   const getBgColor1 = () => {
//     if (error) {
//       return COLORS.red;
//     }
//     if (focused1) {
//       return COLORS?.white;
//     } else {
//       // return COLORS.lightest_gray1;
//       return COLORS?.white;
//       // return COLORS?.colorSecondary;
//     }
//   };
//   const deliveryStatus = [
//     {name: 'On The Way', code: '1', value: 'On The Way'},
//     {name: 'Picked Up', code: '1', value: 'Shipped'},
//     {name: 'Delivered', code: '3', value: 'Delivered'},
//   ];
//   const handleStatus = unit => {
//     setDeliveryStatus(unit);
//   };
//   const handleDeliveryBoyStatus = (unit, index) => {
//     console.log(unit);
//     if (unit != null) {
//       // console.log(activeDeliveryBoy[index - 1].name);
//       setSelectDeliveryBoyName(activeDeliveryBoy[index - 1]?.name);
//       setSelectDeliveryBoy(unit);
//     } else {
//       setSelectDeliveryBoyName('');
//       setSelectDeliveryBoy(null);
//       console.log('Please select delivery boy');
//       ShowToastMessage('Please select delivery boy');
//     }
//   };
//
//   const getAllAvailableDelivery = () => {
//     try {
//       ApiCall('get', null, API_END_POINTS.getActiveDeliveryBoy, {
//         'Content-Type': 'application/json',
//         'x-access-token': userToken,
//       })
//         .then(response => {
//           ShowConsoleLogMessage("deli -> "+JSON.stringify(response?.data?.data));
//
//           if (response?.statusCode === 200) {
//             if (response?.data?.status) {
//               setActiveDeliveryBoy(response?.data?.data);
//             } else {
//               setActiveDeliveryBoy([]);
//             }
//           } else if (response?.statusCode === 500) {
//             if (response.data?.message === 'Token Mismatch') {
//               Alert.alert(
//                 'Session Expired',
//                 'Your session has expired due to a security issue. Please log in again to continue using the application.',
//                 [
//                   {
//                     text: 'OK',
//                     onPress: () => {
//                       clearUserToken();
//                     },
//                   },
//                 ],
//               );
//             }
//           } else {
//             setShowEmpty(true);
//           }
//         })
//
//         .catch(error => {
//           ShowConsoleLogMessage("deli  error -> "+JSON.stringify(error));
//
//           setShowEmpty(true);
//           console.log('error axios -> ', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       ShowConsoleLogMessage("deli catch error -> "+JSON.stringify(error));
//       // ShowToastMessage(` You selected : ${error.message}`);
//       setLoading(false);
//     }
//   };
//
//   const getAllShop = () => {
//     setLoading(true);
//     try {
//       console.log(
//         'response axios >>> ',
//         JSON.stringify(API_END_POINTS.ORDER_DETAILS + id),
//       );
//       console.log('orderList', userToken);
//
//       ApiCall('get', null, API_END_POINTS.ORDER_DETAILS + id, {
//         'Content-Type': 'application/json',
//         'x-access-token': userToken || userData?.remember_token,
//       })
//         .then(response => {
//           // console.log(response?.data?.data)
//
//           if (response?.statusCode === 200) {
//             // console.log(
//             //   'Response data: ',
//             //   JSON.stringify(response?.data?.deliveryBoyCommission),
//             // );
//             if (response?.data?.isDeliveryAssign) {
//               setDeliveryAssign(response?.data?.isDeliveryAssign);
//             } else {
//               setDeliveryAssign(null);
//               getAllAvailableDelivery();
//             }
//             setDeliveryBoy(response?.data?.deliveryBoyCommission);
//             setDashboard(response?.data?.data);
//             setOrderProduct(response?.data?.response);
//             setAddressData(response?.data?.data?.addressId);
//
//             if (response.data?.length === 0) {
//               setShowEmpty(true);
//             }
//           } else if (response?.statusCode === 500) {
//             if (response.data?.message === 'Token Mismatch') {
//               Alert.alert(
//                 'Session Expired',
//                 'Your session has expired due to a security issue. Please log in again to continue using the application.',
//                 [
//                   {
//                     text: 'OK',
//                     onPress: () => {
//                       clearUserToken();
//                     },
//                   },
//                 ],
//               );
//             }
//           } else {
//             setShowEmpty(true);
//           }
//         })
//
//         .catch(error => {
//           setShowEmpty(true);
//           console.log('error axios -> ', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       ShowToastMessage(` You selected : ${error.message}`);
//       setLoading(false);
//     }
//   };
//   const OrderStatusUpdate = () => {
//     console.log('iiiiiiii', item?._id);
//     setLoading(true);
//
//     try {
//       const body = {
//         updateId: item._id,
//         delivery_status: selecStatus,
//         // payment_status:
//       };
//       console.log(body);
//       // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Order_Update_Status));
//
//       ApiCall('post', body, API_END_POINTS.Order_Update_Status, {
//         'Content-Type': 'application/json',
//         'x-access-token': userToken || userData?.jwtoken,
//       })
//         .then(response => {
//           console.log(' orderstatus sss ', JSON.stringify(response));
//
//           if (response?.statusCode === 200) {
//             // setDashboard(response?.data?.data)
//
//             navigation.goBack('Order');
//             ShowToastMessage(response?.data?.success);
//           } else if (response?.statusCode === 500) {
//           } else {
//           }
//         })
//         .catch(error => {
//           console.log('error axios -> ', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       ShowToastMessage(` You selected : ${error.message}`);
//       setLoading(false);
//     }
//   };
//
//   const OrderDeliveryBoyUpdate = () => {
//     console.log('iiiiiiii', userToken);
//     setLoading(true);
//
//     try {
//       const body = {
//         orderId: item._id,
//         deliveryBoyId: selectDeliveryBoy,
//       };
//       console.log(body);
//       console.log(
//         'response axios >>> ',
//         JSON.stringify(API_END_POINTS.assignDeliveryBoyToOrder),
//       );
//
//       ApiCall('post', body, API_END_POINTS.assignDeliveryBoyToOrder, {
//         // 'Content-Type': 'application/json',
//         'x-access-token': userToken || userData?.jwtoken,
//       })
//         .then(response => {
//           console.log(' orderstatus sss ', JSON.stringify(response));
//
//           if (response?.statusCode === 200) {
//             // setDashboard(response?.data?.data)
//
//             // navigation.goBack('Order');
//             ShowToastMessage(response?.data?.success);
//
//             setDeliveryAssign({
//               deliveryBoyId: {
//                 name: selectDeliveryBoyName,
//               },
//             });
//           } else if (response?.statusCode === 500) {
//           } else {
//           }
//         })
//         .catch(error => {
//           console.log('error axios -> ', error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       ShowToastMessage(` You selected : ${error.message}`);
//       setLoading(false);
//     }
//   };
//
//   const clearUserToken = async () => {
//     try {
//       await AsyncStorage.clear();
//       // await AsyncStorage.removeItem('userToken');
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{name: 'Auth'}],
//         }),
//       );
//     } catch (error) {
//       console.error('Error clearing userToken:', error);
//     }
//   };
//
//   // const colorsText = Array.isArray(OrderProduct?.productcolor) ? OrderProduct?.productcolor.join(', ') : '';
//   //   // const sizesText = dashboard?.productsize.join(',');
//   //   const sizesText = Array.isArray(OrderProduct?.productsize) ? OrderProduct.productsize.join(', ') : '';
//
//   const renderItem = ({item}) => {
//     //  const sizesText = item?.productsize.join(',');
//
//     const colorsText = Array.isArray(item?.productcolor)
//       ? item?.productcolor.join(', ')
//       : '';
//     const sizesText = Array.isArray(item?.productsize)
//       ? item.productsize.join(', ')
//       : '';
//     console.log(sizesText);
//
//     return (
//       <View style={styles?.detailsView1}>
//         <View style={{flexDirection: 'row'}}>
//           <View>
//             <VegUrbanImageLoader
//               source={IMAGE_BASE_URL + item?.product_id?.thumbnail_image}
//               styles={{
//                 width: 68,
//                 height: 60,
//                 borderRadius: 10,
//               }}
//             />
//             <View style={{justifyContent: 'center', alignSelf: 'center'}}>
//               <Text style={styles?.orderText}></Text>
//               <Text
//                 style={[
//                   styles?.orderText,
//                   {
//                     color: appPrimaryColor,
//                     // marginTop: -10,
//                     fontFamily: FONTS?.bold,
//                   },
//                 ]}>
//                 {appcurrency}
//                 {item?.amount || 0}
//               </Text>
//             </View>
//           </View>
//
//           <View style={{marginLeft: 15, flex: 1}}>
//             <Text style={styles?.normalLeft}>
//               {item?.product_id?.description}
//             </Text>
//             <Text style={[styles?.orderText, {marginTop: 2}]}>
//               {item?.quantity} x item
//             </Text>
//             <Text style={styles?.normalLeft}>
//               Product : {item?.product_name}
//             </Text>
//             <Text style={styles?.normalLeft}>
//               Category : {item?.product_id?.category}
//             </Text>
//             <Text style={styles?.normalLeft}>
//               Sub Category : {item?.product_id?.subcategory}
//             </Text>
//             <Text style={styles?.normalLeft}>
//               Unit Type : {item?.product_id?.unittype}
//             </Text>
//
//             <Text style={styles?.normalLeft}>
//               Weight : {item?.product_id?.weight}kg
//             </Text>
//             <Text style={styles?.normalLeft}>Color : {item?.color}</Text>
//             <Text style={styles?.normalLeft}>Size : {item?.size}</Text>
//             <Text style={styles?.normalLeft}>
//               Prodcut Return Policy : {item?.product_id?.product_return_policy}
//             </Text>
//
//             {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Text style={styles?.normalLeft}>Color</Text>
//               <View
//                 style={{
//                   backgroundColor: item?.color,
//                   width: 15,
//                   height: 15,
//                   borderRadius: 20,
//                   marginVertical: 3,
//                   marginHorizontal: 5
//                 }}
//               />
//             </View> */}
//           </View>
//         </View>
//       </View>
//     );
//   };
//
//   return (
//     <SafeAreaView
//       style={[
//         GlobalStyle.mainContainerBgColor,
//         {
//           backgroundColor: theme?.colors?.bg_color_onBoard,
//           flex: 1,
//           // backgroundColor:'red'
//         },
//       ]}>
//       <SellerEProgressBar loading={loading} />
//
//       <View
//         style={[
//           GlobalStyle.commonToolbarBG,
//           {
//             backgroundColor: theme.colors.bg_color_onBoard,
//             elevation: 5,
//             // flex:1
//           },
//         ]}>
//         <Ionicons
//           name="ios-arrow-back"
//           color={appPrimaryColor}
//           size={25}
//           style={[
//             styles.backIcon,
//             {
//               opacity: !show ? 1 : 0.0,
//               transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
//               marginStart: 15,
//             },
//           ]}
//           onPress={() => {
//             navigation.goBack();
//           }}
//         />
//         <VegUrbanCommonToolBar
//           title="Order Details"
//           style={{
//             // backgroundColor: theme.colors.bg_color_onBoard,
//             marginStart: 10,
//             fontFamily: FONTS?.bold,
//             alinItem: 'center',
//           }}
//           textStyle={{
//             color: appPrimaryColor,
//             fontFamily: FONTS?.bold,
//             fontSize: 18,
//             textAlin: 'center',
//           }}
//         />
//       </View>
//       <ScrollView
//         style={{
//           flex: 1,
//         }}
//         contentContainerStyle={{
//           flexGrow: 1,
//           // flex: 1,
//           // backgroundColor: 'red',
//         }}>
//         <View style={styles?.detailsView}>
//           <View style={styles?.viewtext}>
//             <View style={{}}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Order Code
//               </Text>
//               <Text
//                 style={[
//                   styles?.normalLeft,
//                   {
//                     color: appPrimaryColor,
//                     fontFamily: FONTS?.bold,
//                   },
//                 ]}>
//                 {dashboard?.order_id}
//               </Text>
//             </View>
//             <View
//               style={{
//                 maxWidth: '51%',
//               }}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 User Name
//               </Text>
//               <Text
//                 numberOfLines={2}
//                 style={[
//                   styles?.normaltext,
//                   {
//                     // width:'80%'
//                   },
//                 ]}>
//                 {dashboard?.addressId?.name}
//               </Text>
//             </View>
//           </View>
//
//           <View style={styles?.viewtext}>
//             <View
//               style={{
//                 justifyContent: 'flex-end',
//               }}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Date & Time
//               </Text>
//               <Text style={styles?.normalLeft}>
//                 {/* {address?.createdAt} */}
//                 {moment(address?.createdAt).format('DD-MM-YYYY')} :
//                 {moment(address?.createdAt).format('LT')}
//               </Text>
//             </View>
//             <View style={{}}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Payment Method
//               </Text>
//               <Text style={styles?.normaltext}>{dashboard?.payment_mode}</Text>
//             </View>
//           </View>
//
//           <View style={styles?.viewtext}>
//             <View>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Payment Status
//               </Text>
//               <Text style={styles?.normalLeft}>
//                 {dashboard?.payment_status}
//               </Text>
//             </View>
//             <View>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Delivery Status
//               </Text>
//               {/* <Text style={styles?.normaltext}>
//
//                   {dashboard?.delivery_status}
//                   </Text> */}
//
//               <Text
//                 style={[
//                   styles.normaltext,
//                   {
//                     // alignSelf: 'flex-start',
//                     // color:
//                     //   item?.is_cancelled === 'Active'
//                     //     ? COLORS.red
//                     //     : item?.delivery_status === 'Picked Up'
//                     //     ? '#F49127'
//                     //     : item?.delivery_status === 'Delivered'
//                     //     ? COLORS.green
//                     //     : item?.delivery_status === 'On The Way'
//                     //     ? COLORS.ontheway
//                     //     : item?.delivery_status === 'Shipped'
//                     //     ? COLORS.ontheway
//                     //     : COLORS.black,
//
//                     color:
//                       item?.is_cancelled === 'Active'
//                         ? 'red'
//                         : item?.delivery_status === 'Shipped'
//                         ? '#F77156'
//                         : item?.delivery_status === 'Delivered'
//                         ? COLORS.green
//                         : item?.delivery_status === 'On The Way'
//                         ? '#F77156'
//                         : '#F49127',
//                     fontFamily: FONTS.bold,
//                   },
//                 ]}
//                 numberOfLines={1}>
//                 {/*{item?.is_cancelled === 'Active'*/}
//                 {/*  ? 'cancelled'*/}
//                 {/*  : item?.delivery_status === 'Shipped'*/}
//                 {/*  ? 'On the way'*/}
//                 {/*  : item?.delivery_status === 'Delivered'*/}
//                 {/*  ? 'Delivered'*/}
//                 {/*  : 'Pending'}*/}
//
//                 {item?.is_cancelled === 'Active'
//                   ? 'Cancelled'
//                   : item?.delivery_status}
//               </Text>
//             </View>
//           </View>
//
//           <View style={styles?.viewtext}>
//             <View
//               style={{
//                 maxWidth: '65%',
//               }}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Shipping Address
//               </Text>
//               <Text style={styles?.normalLeft}>Name: {address?.name}</Text>
//               <Text style={styles?.normalLeft}>Email: {address?.email}</Text>
//
//               <Text style={styles?.normalLeft}>
//                 Address: {address?.address}
//               </Text>
//               <Text style={styles?.normalLeft}>
//                 Address Type: {address?.addressType}
//               </Text>
//               <Text style={styles?.normalLeft}>City: {address?.city}</Text>
//             </View>
//             <View>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Total Amount
//               </Text>
//               <Text
//                 style={[
//                   styles?.normaltext,
//                   {
//                     color: appPrimaryColor,
//                     fontFamily: FONTS?.bold,
//                     // marginTop: 25
//                   },
//                 ]}>
//                 {appcurrency}
//                 {dashboard?.totalamount || 0}
//               </Text>
//             </View>
//           </View>
//         </View>
//
//         <View
//           style={{
//             // alinItem: 'center',
//             // alignSelf: 'center',
//             marginTop: 20,
//             // justifyContent: 'center',
//           }}>
//           <Text
//             style={[
//               styles?.productText,
//               {
//                 color: appPrimaryColor,
//               },
//             ]}>
//             Ordered Product
//           </Text>
//         </View>
//
//         <FlatList
//           data={OrderProduct}
//           keyExtractor={item => item._id}
//           renderItem={renderItem}
//         />
//
//         <View
//           style={{
//             flexGrow: 1,
//             marginTop: 30,
//           }}>
//           <View style={styles?.totalView}>
//             <View style={styles?.viewtext}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 SUB TOTAL
//               </Text>
//               {/* <Text style={styles?.normalLeft}>paid</Text> */}
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 {appcurrency}
//                 {dashboard?.totalamount || 0}
//               </Text>
//             </View>
//
//             {/* <View style={styles?.viewtext}>
//
//                 <Text style={styles?.ordertext}>TAX</Text>
//                 <Text style={styles?.ordertext}>$0.00</Text>
//
//               </View> */}
//
//             <View style={styles?.viewtext}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Delivery Commission
//               </Text>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 {appcurrency}
//                 {deliveryBoy?.delivery_boy_commission}
//                 {/*{dashboard?.delivery_commission || 0}*/}
//               </Text>
//             </View>
//             <View style={styles?.viewtext}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 Shipping Cost
//               </Text>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 {dashboard?.shippingcharges || 0}
//               </Text>
//             </View>
//             {/* <View style={styles?.viewtext}>
//
//                 <Text style={styles?.ordertext}>DISCOUNT</Text>
//                 <Text style={styles?.ordertext}>$0.00</Text>
//
//               </View> */}
//             <View
//               style={{
//                 borderWidth: 0.2,
//                 width: '100%',
//                 color: COLORS?.gray,
//                 marginVertical: 8,
//                 height: 0,
//               }}
//             />
//
//             <View style={styles?.viewtext}>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 GRAND TOTAL
//               </Text>
//               <Text
//                 style={[
//                   styles?.ordertext,
//                   {
//                     color: appPrimaryColor,
//                   },
//                 ]}>
//                 {appcurrency}
//                 {dashboard?.totalamount || 0}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View
//           style={{
//             marginLeft: 20,
//             marginTop: 15,
//           }}>
//           <Text
//             style={[
//               styles?.ordertext,
//               {
//                 color: appPrimaryColor,
//                 fontSize: 16,
//                 marginLeft: 3,
//               },
//             ]}>
//             Delivery Status Update
//           </Text>
//         </View>
//
//         <View
//           style={[
//             styles.textView,
//             {
//               borderColor: getBorderColor1(),
//               elevation: 0,
//             },
//             {
//               shadowOffset: {
//                 width: 3,
//                 height: 3,
//               },
//             },
//             {
//               backgroundColor: getBgColor1(),
//               borderWidth: getBorderWidth1(),
//               borderRadius: 8,
//               marginBottom: 10,
//               height: 55,
//               marginTop: 20,
//               marginHorizontal: 20,
//             },
//           ]}>
//           {item?.is_cancelled === 'Active' ? (
//             <View>
//               <Text
//                 style={{
//                   paddingVertical: 15,
//                   paddingHorizontal: 10,
//                   marginLeft: 10,
//                   color: COLORS?.black,
//                   fontFamily: FONTS?.regular,
//                 }}>
//                 Cancellation
//               </Text>
//             </View>
//           ) : item?.delivery_status === 'Delivered' ? (
//             <View>
//               <Text
//                 style={{
//                   paddingVertical: 15,
//                   paddingHorizontal: 10,
//                   marginLeft: 10,
//                   color: COLORS?.black,
//                   fontFamily: FONTS?.regular,
//                 }}>
//                 Delivered
//               </Text>
//             </View>
//           ) : (
//             <View>
//               <Picker
//                 selectedValue={selecStatus}
//                 onValueChange={itemValue => handleStatus(itemValue)}
//                 mode="dropdown">
//                 {/* Default "Select a Category" option */}
//                 {/*<Picker.Item*/}
//                 {/*  label={*/}
//                 {/*    // {dashboard?.delivery_status}*/}
//                 {/*    item?.is_cancelled === 'Active'*/}
//                 {/*      ? 'Cancellation'*/}
//                 {/*      : item?.delivery_status === 'Shipped'*/}
//                 {/*      ? 'On the way'*/}
//                 {/*      : item?.delivery_status === 'Delivered'*/}
//                 {/*      ? 'Delivered'*/}
//                 {/*      : 'Pending'*/}
//                 {/*  }*/}
//                 {/*  value={null}*/}
//                 {/*/>*/}
//                 <Picker.Item label={'Select a status'} value={null} />
//
//                 {deliveryStatus.map(name => (
//                   <Picker.Item
//                     label={name.name}
//                     value={name.value}
//                     key={name.code}
//                   />
//                 ))}
//               </Picker>
//             </View>
//           )}
//         </View>
//
//         <View
//           style={{
//             // flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginHorizontal: 20,
//             marginTop: 20,
//           }}>
//           {item?.delivery_status !== 'Delivered' ? (
//             <VegUrbanCommonBtn
//               height={40}
//               width={'100%'}
//               borderRadius={20}
//               textSize={16}
//               textColor={COLORS?.white}
//               text={'Update Status'}
//               backgroundColor={COLORS?.colorPrimary}
//               onPress={() => {
//                 if (selecStatus != null) {
//                   OrderStatusUpdate();
//                 } else {
//                   ShowToastMessage('Please select status ');
//                 }
//               }}
//               textStyle={{
//                 fontFamily: FONTS?.bold,
//               }}
//             />
//           ) : null}
//         </View>
//
//         {item?.is_cancelled !== 'Active' && deliveryAssign == null ? (
//           <View
//             style={{
//               margin: 20,
//               marginTop: 15,
//             }}>
//             <Text
//               style={[
//                 styles?.ordertext,
//                 {
//                   color: appPrimaryColor,
//                   fontSize: 16,
//                   marginLeft: 3,
//                 },
//               ]}>
//               Assign delivery boy
//             </Text>
//
//             <View
//               style={{
//                 borderRadius: 8,
//                 borderWidth: 0.2,
//                 marginTop: 20,
//               }}>
//               <Picker
//                 selectedValue={selectDeliveryBoy}
//                 onValueChange={(itemValue, itemIndex) =>
//                   handleDeliveryBoyStatus(itemValue, itemIndex)
//                 }
//                 mode="dropdown">
//                 {/* Default "Select a Category" option */}
//                 <Picker.Item label={'Select a delivery boy'} value={null} />
//
//                 {activeDeliveryBoy?.map(name => (
//                   <Picker.Item
//                     label={name.name}
//                     value={name?._id}
//                     key={name?._id}
//                   />
//                 ))}
//               </Picker>
//             </View>
//             <View
//               style={{
//                 // flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginTop: 20,
//               }}>
//               <VegUrbanCommonBtn
//                 height={40}
//                 width={'100%'}
//                 borderRadius={20}
//                 textSize={16}
//                 textColor={COLORS?.white}
//                 text={'Confirm'}
//                 backgroundColor={COLORS?.colorPrimary}
//                 onPress={() => {
//                   if (selectDeliveryBoy != null) {
//                     OrderDeliveryBoyUpdate();
//                   } else {
//                     ShowToastMessage('Please select delivery boy');
//                   }
//                 }}
//                 textStyle={{
//                   fontFamily: FONTS?.bold,
//                 }}
//               />
//             </View>
//           </View>
//         ) : null}
//
//         {deliveryAssign ? (
//           <View
//             style={{
//               marginLeft: 20,
//               marginRight: 10,
//               marginVertical: 15,
//             }}>
//             <Text
//               style={[
//                 styles?.ordertext,
//                 {
//                   color: appPrimaryColor,
//                   fontSize: 16,
//                   paddingBottom: 16,
//                   marginLeft: 3,
//                 },
//               ]}>
//               Delivery Boy Status
//             </Text>
//
//             <Text
//               style={[
//                 styles?.ordertext,
//                 {
//                   color: COLORS.black,
//                   fontSize: 14,
//                   marginLeft: 3,
//                   marginRight: 3,
//                   fontFamily: FONTS.regular,
//                 },
//               ]}>
//               {deliveryAssign?.deliveryBoyId?.name} is assigned to deliver this
//               product.
//             </Text>
//           </View>
//         ) : null}
//         {/*<View*/}
//         {/*  style={{*/}
//         {/*    marginBottom: '10%',*/}
//         {/*    flex: 1,*/}
//         {/*  }}*/}
//         {/*/>*/}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//
//   totalView: {
//     flex: 1,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 0.2,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//     flex: 1,
//   },
//   statusIcon: {
//     width: 30,
//     height: 30,
//   },
//   statusText: {
//     textAlign: 'center',
//     fontSize: 12,
//     fontFamily: FONTS?.bold,
//     marginTop: 5,
//     color: COLORS?.black,
//   },
//   filed: {
//     borderRadius: 5,
//     borderWidth: 1,
//     width: 50,
//     height: 50,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 30,
//     height: 30,
//     resizeMode: 'cover',
//     alignSelf: 'center',
//   },
//   detailsView: {
//     flex: 1,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 0.2,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     marginTop: 30,
//   },
//   detailsView1: {
//     flex: 1,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     borderWidth: 0.2,
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//     marginTop: 15,
//   },
//   viewtext: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alinItem: 'center',
//     paddingVertical: 5,
//   },
//   ordertext: {
//     fontFamily: FONTS?.bold,
//     fontSize: 14,
//     color: COLORS?.black,
//   },
//   normaltext: {
//     fontSize: 12,
//     fontFamily: FONTS?.regular,
//     color: COLORS?.black,
//     textAlign: 'right',
//   },
//   normalLeft: {
//     fontSize: 12,
//     fontFamily: FONTS?.regular,
//     color: COLORS?.black,
//     textAlign: 'left',
//     marginTop: 2,
//   },
//   productText: {
//     fontSize: 16,
//     fontFamily: FONTS?.bold,
//     color: COLORS?.black,
//     textAlign: 'center',
//   },
// });
//
// export default OrderDetails;



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
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import GlobalStyle from '../../styles/GlobalStyle';
import moment from 'moment';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS, IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import { ShowToastMessage } from '../../utils/Utility';
import SellerEProgressBar from '../../utils/SellerEProgressBar';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';

const OrderDetails = ({ navigation, route }) => {
  const [amount, setAmount] = useState(100);
  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);
  const error = '';

  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const { item } = route.params;
  // console.log('Item in Order Screen:', item);
  const id = item?._id;

  useEffect(() => {
    getAllShop();
  }, []);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const appcurrency = useSelector(state => state.state?.appcurrency);

  const [activeDeliveryBoy, setActiveDeliveryBoy] = useState([]);
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [deliveryAssign, setDeliveryAssign] = useState(null);
  const [dashboard, setDashboard] = useState('');
  const [showEmpty, setShowEmpty] = useState(false);
  const [address, setAddressData] = useState({});
  const [selecStatus, setDeliveryStatus] = useState(null);
  const [selectDeliveryBoy, setSelectDeliveryBoy] = useState(null);
  const [selectDeliveryBoyName, setSelectDeliveryBoyName] = useState('');
  const [selctPaymentStatus, setselctPaymentStatus] = useState(null);

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
    { name: 'On The Way', code: '1', value: 'On The Way' },
    { name: 'Picked Up', code: '2', value: 'Shipped' },
    { name: 'Delivered', code: '3', value: 'Delivered' },
  ];

  const paymentStatus = [
    { name: 'Paid', code: '1', value: 'Paid' },
    { name: 'UnPaid', code: '2', value: 'UnPaid' },
  ];
  const handleStatus = unit => {
    setDeliveryStatus(unit);
  };

  const handlepaymentstatus = unit => {
    setselctPaymentStatus(unit);
  };
  const handleDeliveryBoyStatus = (unit, index) => {
    console.log(unit);
    if (unit != null) {
      // console.log(activeDeliveryBoy[index - 1].name);
      setSelectDeliveryBoyName(activeDeliveryBoy[index - 1]?.name);
      setSelectDeliveryBoy(unit);
    } else {
      setSelectDeliveryBoyName('');
      setSelectDeliveryBoy(null);
      console.log('Please select delivery boy');
      ShowToastMessage('Please select delivery boy');
    }
  };

  const getAllAvailableDelivery = () => {
    try {
      ApiCall('get', null, API_END_POINTS.getActiveDeliveryBoy, {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            if (response?.data?.status) {
              setActiveDeliveryBoy(response?.data?.data);
            } else {
              setActiveDeliveryBoy([]);
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

  const getAllShop = () => {
    setLoading(true);
    try {
      console.log(
        'response axios >>> ',
        JSON.stringify(API_END_POINTS.ORDER_DETAILS + id),
      );
      console.log('orderList', userToken);

      ApiCall('get', null, API_END_POINTS.ORDER_DETAILS + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log(response?.data?.data)

          if (response?.statusCode === 200) {
            // console.log(
            //   'Response data: ',
            //   JSON.stringify(response?.data?.deliveryBoyCommission),
            // );
            if (response?.data?.isDeliveryAssign) {
              setDeliveryAssign(response?.data?.isDeliveryAssign);
            } else {
              setDeliveryAssign(null);
              getAllAvailableDelivery();
            }
            setDeliveryBoy(response?.data?.deliveryBoyCommission);
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
        // payment_status:
      };
      console.log(body);
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Order_Update_Status));

      ApiCall('post', body, API_END_POINTS.Order_Update_Status, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          console.log(' orderstatus sss ', JSON.stringify(response));

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
  const PaymentStatusUpdate = () => {
    console.log('iiiiiiii', selctPaymentStatus);
    setLoading(true);

    try {
      const body = {
        updateId: item._id,
        payment_status: selctPaymentStatus,
        // payment_status:
      };
      console.log(body);
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Order_Update_Status));

      ApiCall('post', body, API_END_POINTS.Order_Update_Status, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          console.log('payment status ', JSON.stringify(response));

          if (response?.statusCode === 200) {
            // setDashboard(response?.data?.data)

            navigation.goBack('Order');
            // ShowToastMessage(response?.data?.success);
            ShowToastMessage('Payment Status Updated');
          } else if (response?.statusCode === 500) {
          } else {
            ShowToastMessage(response?.data?.errors);
          }
        })
        .catch(error => {
          console.log('error axios -> ', error)
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const OrderDeliveryBoyUpdate = () => {
    console.log('iiiiiiii', userToken);
    setLoading(true);

    try {
      const body = {
        orderId: item._id,
        deliveryBoyId: selectDeliveryBoy,
      };
      console.log(body);
      console.log(
          'response axios >>> ',
          JSON.stringify(API_END_POINTS.assignDeliveryBoyToOrder),
      );
      console.log(
        'response axios >>> ',
        JSON.stringify(userToken),
    );

      ApiCall('post', body, API_END_POINTS.assignDeliveryBoyToOrder, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          console.log(' delivery boy status ', response);

          if (response?.statusCode === 200) {
            // setDashboard(response?.data?.data)

            // navigation.goBack('Order');
            ShowToastMessage(response?.data?.success);

            setDeliveryAssign({
              deliveryBoyId: {
                name: selectDeliveryBoyName,
              },
            });
          } else if (response?.statusCode === 500) {
            console.log(' delivery boy status ', response);

          } else {
            console.log(' delivery ', response);

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
          routes: [{ name: 'Auth' }],
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  // const colorsText = Array.isArray(OrderProduct?.productcolor) ? OrderProduct?.productcolor.join(', ') : '';
  //   // const sizesText = dashboard?.productsize.join(',');
  //   const sizesText = Array.isArray(OrderProduct?.productsize) ? OrderProduct.productsize.join(', ') : '';

  const renderItem = ({ item }) => {
    //  const sizesText = item?.productsize.join(',');

    const colorsText = Array.isArray(item?.productcolor)
      ? item?.productcolor.join(', ')
      : '';
    const sizesText = Array.isArray(item?.productsize)
      ? item.productsize.join(', ')
      : '';
    console.log(sizesText);

    return (
      <View style={styles?.detailsView1}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <VegUrbanImageLoader
              source={IMAGE_BASE_URL + item?.product_id?.thumbnail_image}
              styles={{
                width: 68,
                height: 60,
                borderRadius: 10,
              }}
            />
            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={styles?.orderText}></Text>
              <Text
                style={[
                  styles?.orderText,
                  {
                    color: appPrimaryColor,
                    // marginTop: -10,
                    fontFamily: FONTS?.bold,
                  },
                ]}>
                {appcurrency}
                {item?.amount || 0}
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles?.normalLeft}>
              {item?.product_id?.description}
            </Text>
            <Text style={[styles?.orderText, { marginTop: 2 }]}>
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
          color={COLORS?.black}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
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
            // backgroundColor: theme.colors.bg_color_onBoard,
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
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          // flex: 1,
          // backgroundColor: 'red',
        }}>
        <View style={styles?.detailsView}>
          <View style={styles?.viewtext}>
            <View style={{}}>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Order Code
              </Text>
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
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                User Name
              </Text>
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
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Date & Time
              </Text>
              <Text style={styles?.normalLeft}>
                {/* {address?.createdAt} */}
                {moment(address?.createdAt).format('DD-MM-YYYY')} :
                {moment(address?.createdAt).format('LT')}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Payment Method
              </Text>
              <Text style={styles?.normaltext}>
                {dashboard?.payment_mode == "Cod" ? "COD" : dashboard?.payment_mode}

                {/*{dashboard?.payment_mode}*/}
              </Text>
            </View>
          </View>

          <View style={styles?.viewtext}>
            <View>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Payment Status
              </Text>
              <Text style={styles?.normalLeft}>
                {dashboard?.payment_status}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Delivery Status
              </Text>
              {/* <Text style={styles?.normaltext}>

                  {dashboard?.delivery_status}
                  </Text> */}

              <Text
                style={[
                  styles.normaltext,
                  {
                    // alignSelf: 'flex-start',
                    // color:
                    //   item?.is_cancelled === 'Active'
                    //     ? COLORS.red
                    //     : item?.delivery_status === 'Picked Up'
                    //     ? '#F49127'
                    //     : item?.delivery_status === 'Delivered'
                    //     ? COLORS.green
                    //     : item?.delivery_status === 'On The Way'
                    //     ? COLORS.ontheway
                    //     : item?.delivery_status === 'Shipped'
                    //     ? COLORS.ontheway
                    //     : COLORS.black,

                    color:
                      item?.is_cancelled === 'Active'
                        ? 'red'
                        : item?.delivery_status === 'Shipped'
                          ? '#F77156'
                          : item?.delivery_status === 'Delivered'
                            ? COLORS.green
                            : item?.delivery_status === 'On The Way'
                              ? '#F77156'
                              : '#F49127',
                    fontFamily: FONTS.bold,
                  },
                ]}
                numberOfLines={1}>
                {/*{item?.is_cancelled === 'Active'*/}
                {/*  ? 'cancelled'*/}
                {/*  : item?.delivery_status === 'Shipped'*/}
                {/*  ? 'On the way'*/}
                {/*  : item?.delivery_status === 'Delivered'*/}
                {/*  ? 'Delivered'*/}
                {/*  : 'Pending'}*/}

                {item?.is_cancelled === 'Active'
                  ? 'Cancelled'
                  : item?.delivery_status}
              </Text>
            </View>
          </View>

          <View style={styles?.viewtext}>
            <View
              style={{
                maxWidth: '65%',
              }}>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Shipping Address
              </Text>
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
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Total Amount
              </Text>
              <Text
                style={[
                  styles?.normaltext,
                  {
                    color: COLORS?.black,
                    fontFamily: FONTS?.bold,
                    // marginTop: 25
                  },
                ]}>
                {appcurrency}
                {dashboard?.totalamount || 0}
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
          }}>
          <Text
            style={[
              styles?.productText,
              {
                color: appPrimaryColor,
              },
            ]}>
            Ordered Product
          </Text>
        </View>

        <FlatList
          data={OrderProduct}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />

        <View
          style={{
            flexGrow: 1,
            marginTop: 30,
          }}>
          <View style={styles?.totalView}>
            <View style={styles?.viewtext}>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                SUB TOTAL
              </Text>
              {/* <Text style={styles?.normalLeft}>paid</Text> */}
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                {appcurrency}
                {dashboard?.totalamount || 0}
              </Text>
            </View>

            {/* <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>TAX</Text>
                <Text style={styles?.ordertext}>$0.00</Text>

              </View> */}

            <View style={styles?.viewtext}>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Delivery Commission
              </Text>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                {appcurrency}
                {deliveryBoy?.delivery_boy_commission}
                {/*{dashboard?.delivery_commission || 0}*/}
              </Text>
            </View>
            <View style={styles?.viewtext}>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Shipping Cost
              </Text>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
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
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                GRAND TOTAL
              </Text>
              <Text
                style={[
                  styles?.ordertext,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                {appcurrency}
                {dashboard?.totalamount || 0}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 15,
          }}>
          <Text
            style={[
              styles?.ordertext,
              {
                color: COLORS?.black,
                fontSize: 16,
                marginLeft: 3,
              },
            ]}>
            Delivery Status Update
          </Text>
        </View>

        <View
          style={[
            styles.textView,
            {
              borderColor: getBorderColor1(),
              elevation: 0,
            },
            {
              shadowOffset: {
                width: 3,
                height: 3,
              },
            },
            {
              backgroundColor: getBgColor1(),
              borderWidth: getBorderWidth1(),
              borderRadius: 8,
              marginBottom: 10,
              height: 55,
              marginTop: 20,
              marginHorizontal: 20,
            },
          ]}>
          {item?.is_cancelled === 'Active' ? (
            <View>
              <Text
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  marginLeft: 10,
                  color: COLORS?.black,
                  fontFamily: FONTS?.regular,
                }}>
                Cancellation
              </Text>
            </View>
          ) : item?.delivery_status === 'Delivered' ? (
            <View>
              <Text
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  marginLeft: 10,
                  color: COLORS?.black,
                  fontFamily: FONTS?.regular,
                }}>
                Delivered
              </Text>
            </View>
          ) : (
            <View>
              <Picker
                selectedValue={selecStatus}
                onValueChange={itemValue => handleStatus(itemValue)}
                mode="dropdown">
                {/* Default "Select a Category" option */}
                {/*<Picker.Item*/}
                {/*  label={*/}
                {/*    // {dashboard?.delivery_status}*/}
                {/*    item?.is_cancelled === 'Active'*/}
                {/*      ? 'Cancellation'*/}
                {/*      : item?.delivery_status === 'Shipped'*/}
                {/*      ? 'On the way'*/}
                {/*      : item?.delivery_status === 'Delivered'*/}
                {/*      ? 'Delivered'*/}
                {/*      : 'Pending'*/}
                {/*  }*/}
                {/*  value={null}*/}
                {/*/>*/}
                <Picker.Item label={'Select a status'} value={null} />

                {deliveryStatus.map(name => (
                  <Picker.Item
                    label={name.name}
                    value={name.value}
                    key={name.code}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>

        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            marginTop: 20,
          }}>
          {item?.delivery_status !== 'Delivered' ? (
            <VegUrbanCommonBtn
              height={40}
              width={'100%'}
              borderRadius={20}
              textSize={16}
              textColor={COLORS?.white}
              text={'Update Status'}
              backgroundColor={appPrimaryColor}
              onPress={() => {
                if (selecStatus != null) {
                  OrderStatusUpdate();
                } else {
                  ShowToastMessage('Please select status ');
                }
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          ) : null}
        </View>

        {item?.is_cancelled !== 'Active' && deliveryAssign == null ? (
          <View
            style={{
              margin: 20,
              marginTop: 15,
            }}>
            <Text
              style={[
                styles?.ordertext,
                {
                  color: COLORS?.black,
                  fontSize: 16,
                  marginLeft: 3,
                },
              ]}>
              Assign delivery boy
            </Text>

            <View
              style={{
                borderRadius: 8,
                borderWidth: 0.2,
                marginTop: 20,
              }}>
              <Picker
                selectedValue={selectDeliveryBoy}
                onValueChange={(itemValue, itemIndex) =>
                  handleDeliveryBoyStatus(itemValue, itemIndex)
                }
                mode="dropdown">
                {/* Default "Select a Category" option */}
                <Picker.Item label={'Select a delivery boy'} value={null} />

                {activeDeliveryBoy?.map(name => (
                  <Picker.Item
                    label={name.name}
                    value={name?._id}
                    key={name?._id}
                  />
                ))}
              </Picker>
            </View>
            <View
              style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <VegUrbanCommonBtn
                height={40}
                width={'100%'}
                borderRadius={20}
                textSize={16}
                textColor={COLORS?.white}
                text={'Confirm'}
                backgroundColor={appPrimaryColor}
                onPress={() => {
                  if (selectDeliveryBoy != null) {
                    OrderDeliveryBoyUpdate();
                  } else {
                    ShowToastMessage('Please select delivery boy');
                  }
                }}
                textStyle={{
                  fontFamily: FONTS?.bold,
                }}
              />
            </View>
          </View>
        ) : null}

        {deliveryAssign ? (
          <View
            style={{
              marginLeft: 20,
              marginRight: 10,
              marginVertical: 15,
            }}>
            <Text
              style={[
                styles?.ordertext,
                {
                  color: COLORS?.black,
                  fontSize: 16,
                  paddingBottom: 16,
                  marginLeft: 3,
                },
              ]}>
              Delivery Boy Status
            </Text>

            <Text
              style={[
                styles?.ordertext,
                {
                  color: COLORS.black,
                  fontSize: 14,
                  marginLeft: 3,
                  marginRight: 3,
                  fontFamily: FONTS.regular,
                },
              ]}>
              {deliveryAssign?.deliveryBoyId?.name} is assigned to deliver this
              product.
            </Text>
          </View>
        ) : null}



        {dashboard?.payment_mode !== 'Stripe' && (
          <View
            style={{
              margin: 20,
              marginTop: 15,
            }}>
            <Text
              style={[
                styles?.ordertext,
                {
                  color: COLORS?.black,
                  fontSize: 16,
                  marginLeft: 3,
                },
              ]}>
              Payment Status Change
            </Text>

            <View
              style={[
                styles.textView,
                {
                  borderColor: getBorderColor1(),
                  elevation: 0,
                },
                {
                  shadowOffset: {
                    width: 3,
                    height: 3,
                  },
                },
                {
                  backgroundColor: getBgColor1(),
                  borderWidth: getBorderWidth1(),
                  borderRadius: 8,
                  marginBottom: 10,
                  height: 55,
                  marginTop: 20,
                  marginHorizontal: 4,
                },
              ]}
              >

              {dashboard?.payment_status === 'Paid' ? (
                <View>
                  <Text
                    style={{
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      marginLeft: 10,
                      color: COLORS?.black,
                      fontFamily: FONTS?.regular,
                    }}>
                    Paid
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    // borderRadius: 8,
                    // borderWidth: 0.2,
                    // marginTop: 20,
                  }}>
                  <Picker
                    selectedValue={selctPaymentStatus}
                    onValueChange={(itemValue, itemIndex) =>
                      handlepaymentstatus(itemValue, itemIndex)
                    }
                    mode="dropdown">
                    {/* Default "Select a Category" option */}
                    <Picker.Item label={'Select a Payment Status'} value={null} />

                    {paymentStatus?.map(name => (
                      <Picker.Item
                        label={name.name}
                        value={name.value}
                        key={name.code}
                      />
                    ))}
                  </Picker>
                </View>
              )}

            </View>
            <View
              style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {dashboard?.payment_status !== 'Paid' ? (

                <VegUrbanCommonBtn
                  height={40}
                  width={'100%'}
                  borderRadius={20}
                  textSize={16}
                  textColor={COLORS?.white}
                  text={'Confirm'}
                  backgroundColor={appPrimaryColor}
                  onPress={() => {
                    if (selctPaymentStatus != null) {
                      PaymentStatusUpdate();
                    } else {
                      ShowToastMessage('Please select payment status');
                    }
                  }}
                  textStyle={{
                    fontFamily: FONTS?.bold,
                  }}
                />
              ) : null}
            </View>
          </View>
        )}

        {/*<View*/}
        {/*  style={{*/}
        {/*    marginBottom: '10%',*/}
        {/*    flex: 1,*/}
        {/*  }}*/}
        {/*/>*/}
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 15,
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
  productText: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    textAlign: 'center',
  },
});

export default OrderDetails;

import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { requestExternalWritePermission } from '../../utils/RequestUserPermission';
import icons from '../../constants/icons';

import { CommonActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import { FONTS, } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import { ShowConsoleLogMessage, ShowToastMessage } from '../../utils/Utility';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIZES } from '../../constants';
import Foundation from 'react-native-vector-icons/Foundation';

import ApiCall from '../../network/ApiCall';
import { API_END_POINTS, IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const GeneralSetting = ({ route }) => {
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;
  const [loading, setLoading] = useState('');
  const [count, setCount] = useState(0);

  const navigation = useNavigation();

  const [showCameraModal, setShowCameraModal] = useState(false);

  const [shop_name, setShopName] = useState('');
  const [delivery_boy_pickup_latitude, setDeliveryboylat] = useState('');
  const [delivery_boy_pickup_longitude, setdeliveryboylong] = useState('');
  const [shop_phone, setshopPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [barcode, setBarcode] = useState('');
  const [shop_address, setShopAddress] = useState(false);
  const [shop_meta_title, setMetaTitle] = useState('');
  const [shop_meta_description, setMetaDcription] = useState('');
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const [image, setImage] = useState(null);

  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);
  const [thumbImage, setThumbImage] = useState('');
  const [thumbSelected, setThumbSelected] = useState(false);

  useEffect(() => {
    getShopSetting();
  }, []);


const openThumbImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.4,
      forceJpg: true,
      includeBase64: true,
    }).then(images => {
      setThumbImage('data:image/jpeg;base64,' + images.data);
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

  const openImageCamera = () => {
    ImagePicker.openCamera({
      multiple: false,
      cropping: true,
    }).then(images => {
      setImage(images.path);
      setShowCameraModal(false);
    });
  };


  // const dispatch = useDispatch()
  // const userData = useSelector(state => state.state?.userData);
  const [havePermission, setHavePermission] = useState(false);

  const openImagePicker = () => {
    try {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.4,
        forceJpg: true,
        includeBase64: true,
      }).then(images => {
        setImage('data:image/jpeg;base64,' + images.data);
      });
    } catch (error) {
      ShowConsoleLogMessage('Image picker error => ' + JSON.stringify(error));
    }
  };

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
    // setImage(userData?.image)

    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else {
        return true;
      }
    };
    requestCameraPermission()
  }, []);
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
          console.log("Response data: ", JSON.stringify(response.data));

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
      setShopName(productList?.shop_name);
      setShopAddress(productList?.shop_address);
      // setPhoneNo(userData?.response.phone);
      setshopPhone(String(productList?.shop_phone ?? ''));
      setMetaTitle(productList?.shop_meta_title);
      setMetaDcription(productList?.shop_meta_description);
      setThumbImage(productList?.shop_top_banner);

    }
  }, [productList]);

  // { use Token } , updateId, shop_name, shop_logo, shop_phone, shop_address,
  //   shop_meta_title, shop_meta_description,
  //  delivery_boy_pickup_longitude, delivery_boy_pickup_latitude
  const updateGeneralSetting = () => {
    // console.log("iiiiiiii", item?._id)
    setLoading(true);

    try {
      const body = {
        updateId: productList?._id,
        shop_name: shop_name,
        shop_logo: image,
        shop_phone: shop_phone,
        shop_address: shop_address,
        shop_meta_title: shop_meta_title,
        shop_meta_description: shop_meta_description,
        shop_top_banner : thumbImage,
        delivery_boy_pickup_longitude: 'test',
        delivery_boy_pickup_latitude: 'text',
      };

      console.log(body)
      console.log("response axios >>> ", JSON.stringify(API_END_POINTS.SHOP_SETTING_UPDATE));

      ApiCall('post', body, API_END_POINTS.SHOP_SETTING_UPDATE, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          console.log(" add product ", JSON.stringify(response));

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

  const renderCameraModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showCameraModal}
        onRequestClose={() => {
          setShowCameraModal(false);
        }}
        style={{
          flexGrow: 1,
        }}>
        <View
          style={{
            backgroundColor: '#00000090',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setShowCameraModal(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          />
          <View
            style={{
              maxHeight: SIZES.height * 0.7,
              backgroundColor: COLORS.white,
            }}>
            <View style={styles.activityIndicatorWrapper}>
              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  GlobalStyle.paddingVertical10,
                  GlobalStyle.paddingHorizontal15,
                ]}>
                <Text
                  style={[
                    styles.label,
                    {
                      marginTop: 0,
                      flex: 1,
                    },
                  ]}>
                  Choose file
                </Text>
                <Ionicons
                  name={'close'}
                  color={COLORS.black}
                  size={25}
                  onPress={() => setShowCameraModal(false)}
                />
              </View>
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: COLORS?.gray,
                }}
              />

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginVertical: 25,
                }}>
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {
                    setShowCameraModal(true);
                    if (havePermission) {
                      openImageCamera();
                    } else {
                      ShowToastMessage('Please provide camera permission');
                    }
                  }}>
                  <Ionicons name={'camera'} color={COLORS.primary} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {
                    // setShowCameraModal(false);
                    openImagePicker();
                    setShowCameraModal(false);
                  }}>
                  <Foundation name={'photo'} color={COLORS.primary} size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
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
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="General Settings"
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
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS?.bold,
            color: COLORS?.black,
            marginBottom: 10,
            marginLeft:15,
            marginTop:10
          }}>
          Shop Logo
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            // flexDirection: 'row',
            width: 120,
            marginVertical: 10,
          }}>
          {image ? (
            <ImageBackground
              style={{
                height: 140,
                width: 140,
                borderRadius: 100,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            // source={icons.profile_placeholder}
            >
              <Image
                source={{
                  uri: image
                  // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHL03nqSptOCTMXb8ym6QffVTfjk2C14HS-w&usqp=CAU'

                }}
                style={{
                  height: 100,
                  width: 100,
                  // resizeMode: 'center',
                  borderRadius: 100,
                  alignSelf: 'center',
                }}
                PlaceholderContent={
                  <ActivityIndicator
                    color={COLORS.primary}
                    size={'small'}
                  />
                }
              />
            </ImageBackground>
          ) : (
            <ImageBackground
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                borderWidth: 0.2,
                borderColor: COLORS?.gray,
                // backgroundColor: theme?.colors?.bg
              }}
            // source={icons.profile_placeholder}
            >
              <Image
                // source={icons.img_place}
                source={{
                  uri: IMAGE_BASE_URL + productList?.shop_logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHL03nqSptOCTMXb8ym6QffVTfjk2C14HS-w&usqp=CAU"
                  // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHL03nqSptOCTMXb8ym6QffVTfjk2C14HS-w&usqp=CAU'
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  alignSelf: 'center',
                  // backgroundColor:COLORS?.bg
                }}
              />
            </ImageBackground>
          )}

          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 5,
              padding: -6,
              borderRadius: 50,
            }}
            onPress={() => {
              setShowCameraModal(true);
            }}>
            <Image
              source={icons.imagePicker}
              style={{
                height: 25,
                width: 25,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 15,
            marginTop: 5,
            flex: 1,
            backgroundColor: COLORS?.white,
          }}>
          <VegUrbanEditText
            placeholder="Enter Shop Name"
            label="shop name"
            value={shop_name}
            maxLength={40}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'email-address'}
            onChangeText={v => setShopName(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Shop Address"
            label="Shop Address"
            value={shop_address}
            maxLength={30}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'email-address'}
            onChangeText={v => setShopAddress(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Shop Phone"
            label="Shop Phone"
            value={shop_phone}
            maxLength={10}
            multiLine={true}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setshopPhone(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Shop Meta Title"
            label="Meta Title"
            value={shop_meta_title}
            maxLength={50}
            multiLine={true}
            style={{
              color: theme?.colors?.white,
            }}
            // keyBoardType={'number-pad'}
            onChangeText={v => setMetaTitle(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12 }}>
            Maximum 50 Characters
          </Text>

          <VegUrbanEditText
            placeholder="Enter Shop Meta Decription"
            label="Meta Decription"
            value={shop_meta_description}
            maxLength={250}
            multiLine={true}
            style={{
              color: theme?.colors?.white,
            }}
            // keyBoardType={'number-pad'}
            onChangeText={v => setMetaDcription(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12 }}>
            Maximum 250 Characters
          </Text>

          <TouchableOpacity
          onPress={() => {
            if (isPermitted()) {
              openThumbImagePicker();
            }
          }}
          // onPress={() => {
          //   setThumbSelected(!thumbSelected);
          // }}
          style={{
            width: '95%',
            height: 80,
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: thumbSelected ? COLORS.primaryColor : COLORS.grey,
            borderRadius: 10,
            marginHorizontal: 8,
            backgroundColor: thumbSelected ? COLORS.ghostwhite : COLORS.white,
          }}>
          <Image
            style={{
              marginStart: 15,
              height: 25,
              width: 25,
              // opacity: imageArray.length < 3 ? 1 : 0.3,
            }}
            source={{
              uri: 'https://t4.ftcdn.net/jpg/03/83/26/13/360_F_383261384_86BWn0mijMqqo6svwYvLEDzcq9qe8w47.jpg',
              // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BR2GViXukYWZ0TtHuQkIaBI__EyrpkYPpXPkvr-EBF6isTvEeqyTNdSL2RSEkNMX3dA&usqp=CAU',
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: appPrimaryColor,
              fontFamily: 'OpenSans-ExtraBold',

              // marginBottom: 15,
              marginEnd: 20,
              // textAlign: 'left',
            }}>
            Upload Shop Banner
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={25}
            color={COLORS?.gray}
            style={{
              marginEnd: 5,
              // opacity: imageArray.length < 3 ? 1 : 0.3,
            }}
          />
        </TouchableOpacity>
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
              uri: thumbImage?.startsWith('data')
                ? thumbImage
                : IMAGE_BASE_URL + thumbImage,
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
              updateGeneralSetting();
            }}
            textStyle={{
              fontFamily: FONTS?.bold,

              // textTransform: 'uppercase',
            }}
          />
        </View>
        {renderCameraModal()}

      </ScrollView>
    </View>
  );
};

export default GeneralSetting;
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
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: 60,
    width: 60,
    // flex: 1,
    marginHorizontal: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    // flex: 1, // Expands to fill available space
    // paddingLeft: 10, // Add left padding to the label
    fontSize: 16,
  },
});

import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  I18nManager,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS} from '../../../constants/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {SIZES, STRING} from '../../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {requestExternalWritePermission} from '../../../utils/RequestUserPermission';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS} from '../../../constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import GlobalStyle from '../../../styles/GlobalStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import ApiCall from '../../../network/ApiCall';
import {fetchUserData} from '../../../redux/actions';
// import {useDispatch} from 'react-redux';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import {useDispatch, useSelector} from 'react-redux';

import '../../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import SellerEProgressBar from '../../../utils/SellerEProgressBar';

const SignUp = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t, i18n} = useTranslation();
  const defaultImage = useSelector(state => state.state?.defaultImage);

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');

  const [password, setPassword] = useState('');
  const [addressDefault, setAddressDefault] = useState(false);
  const [seller_name, setUserName] = useState('');

  const [code, setCode] = useState('');
  // const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [showOtp, setShowOtp] = useState(false);
  const [address, setAddress] = useState(false);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [seller_phone, setPhoneNo] = useState(false);
  const [focused, setFocused] = React.useState(false);
  const [focused2, setFocused2] = React.useState(false);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  const error = '';

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 1;
    } else {
      return 0.2;
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.bg_color;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return theme?.colors?.bg;

      // return theme?.colors?.bg_color;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;
    }
  };
  const getBorderWidth2 = () => {
    if (error) {
      return 1;
    }
    if (focused2) {
      return 1;
    } else {
      return 0.2;
    }
  };

  const getBorderColor2 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused2) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.bg_color;
    }
  };

  const getBgColor2 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused2) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;
    }
  };

  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = password => {
    return password.length >= 6;
  };
  const isUsernameValid = username => {
    return username.length >= 6;
  };

  const onSingupClick = async () => {
    setLoading(true);
    try {
      const lowerCaseEmail = email.toLowerCase();
      if (validateFieldNotEmpty(seller_name)) {
        ShowToastMessage('seller Name is required');
      } else if (validateFieldNotEmpty(lowerCaseEmail)) {
        ShowToastMessage('Email is required');
      } else if (validateFieldNotEmpty(shopName)) {
        ShowToastMessage('Shop Name is required');
      } else if (validateFieldNotEmpty(seller_phone)) {
        ShowToastMessage('Phone is required');
      } else if (seller_phone?.length !== 10) {
        ShowToastMessage('Phone must be 10 digits');
      } else if (validateFieldNotEmpty(address)) {
        ShowToastMessage('Address is required');
      } else if (validateFieldNotEmpty(password)) {
        ShowToastMessage('password is required');
      } else {
        const body = {
          seller_name: seller_name,
          seller_phone: seller_phone,
          seller_email: lowerCaseEmail,
          password: password,
          address: address,
          seller_shop_name: shopName,
        };
        ShowConsoleLogMessage(API_END_POINTS.API_SINGUP);
        console.log('body', body);

        try {
          const response = await ApiCall(
            'post',
            body,
            API_END_POINTS.API_SINGUP,
            {
              'Content-Type': 'application/json',
            },
          );

          if (response.data && response.data.status === true) {
            AsyncStorage.setItem('userData', JSON.stringify(response?.data));
            // AsyncStorage.setItem('userToken', response.data.jwtoken);
            ShowConsoleLogMessage('login', response);
            console.log('login responce ', response?.data);
            dispatch(fetchUserData(response.data));
            // dispatch(fetchUserToken(response.data.jwtoken));

            setEmail('');
            setPassword('');
            setAddress('');
            setUserName('');
            setPhoneNo('');
            setShopName('');
            ShowToastMessage(response?.data?.message);
            navigation.navigate('Login');
          } else {
            ShowToastMessage(response?.data?.message);
          }
        } catch (error) {
          // console.error('Error making API call:', error);
          // ShowToastMessage('An error occurred during login.');
        }
      }
    } catch (error) {
      console.error('Error in login process:', error);
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // const handleButtonPress = () => {
  //   if (isEmailValid(email) && isPasswordValid(password) && isUsernameValid(username)) {
  //     if (password === ConfirmPwd) {
  //       // Passwords match and meet the minimum length requirement (6 characters)
  //       // Proceed to the next step or action, e.g., navigate to 'MainContainer'
  //       navigation.navigate('MainContainer');
  //     } else {
  //       // Passwords do not match
  //       Snackbar.show({
  //         text: 'Passwords do not match',
  //         duration: Snackbar.LENGTH_LONG,
  //       });
  //     }
  //   } else {
  //     if (!isEmailValid(email)) {
  //       Snackbar.show({
  //         text: 'Invalid Email',
  //         duration: Snackbar.LENGTH_LONG,
  //       });
  //     }
  //     if (!isPasswordValid(password)) {
  //       Snackbar.show({
  //         text: 'Invalid Password',
  //         duration: Snackbar.LENGTH_LONG,
  //       });
  //     }
  //     if (!isUsernameValid(username)) {
  //       Snackbar.show({
  //         text: 'Invalid username',
  //         duration: Snackbar.LENGTH_LONG,
  //       });
  //     }
  //   }
  // };

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };
  const [showCameraModal, setShowCameraModal] = useState(false);

  const openImageCamera = () => {
    ImagePicker.openCamera({
      multiple: false,
      cropping: true,
    }).then(images => {
      // const updatedUserData = { ...userData, profile_img: images.path };
      // setUserData(updatedUserData);
      setImage(images.path);
      setShowCameraModal(false);
    });
  };
  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch()
  // const userData = useSelector(state => state.state?.userData);

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
    // setImage(icons.img_place)

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
    requestCameraPermission();
  }, []);

  useEffect(() => {
    // getUserFromStorage();
    // setTimeout(async () => {
    //   await getUserFromStorage();
    // }, 0);
  }, []);
  // const [userData, setUserData] = useState({});
  const [havePermission, setHavePermission] = useState(false);

  const openImagePicker = () => {
    try {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
      }).then(images => {
        setImage(images.path);
      });
    } catch (error) {
      ShowConsoleLogMessage('Image picker error => ' + JSON.stringify(error));
    }
  };
  const [image, setImage] = useState(null);
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
                    setShowCameraModal(false);
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
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: COLORS?.white,
          flex: 1,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <ScrollView>
        {/* <Ionicons
        name="ios-arrow-back"
        color={COLORS.white}
        size={25}
        style={[
          styles.backIcon,
          {
            opacity: !show ? 1 : 0.0,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          },
        ]}
        onPress={() => {
          navigation.goBack();
          // ShowToastMessage('Coming Soon!');
        }}
      /> */}
        {/* <Image source={images.app_logo} style={styles.app_logo} /> */}
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              // alignItems: 'center',
              // paddingHorizontal: 15,
              backgroundColor: theme.colors?.bg_color_onBoard,
            },
          ]}>
          <Ionicons
            name="ios-arrow-back"
            // color={COLORS.black}
            color={COLORS?.black}
            size={25}
            style={[
              styles.backIcon,
              {
                opacity: !show ? 1 : 0.0,
                transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              },
            ]}
            onPress={() => {
              navigation.goBack();
              // ShowToastMessage('Coming Soon!');
            }}
          />

          <Text
            style={[
              styles.heading,
              {
                marginTop: 15,
                color: appPrimaryColor,
                marginBottom: 40,
                fontFamily: FONTS?.bold,
              },
            ]}>
            {!show ? t('Fill Your Profile') : ' '}
          </Text>

          <VegUrbanEditText
            placeholder="Seller Name"
            // label={STRING.email}
            iconPosition={'left'}
            value={seller_name}
            maxLength={50}
            icon={
              <FontAwesome
                name={'user-o'}
                size={20}
                color={theme?.colors?.grey}
                style={{
                  marginHorizontal: 15,
                }}
              />
            }
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setUserName(v)}
          />
          <VegUrbanEditText
            placeholder={STRING.email}
            // label={STRING.email}
            maxLength={50}
            iconPosition={'left'}
            value={email}
            style={{
              color: theme?.colors?.white,
            }}
            icon={
              <Fontisto
                name={'email'}
                size={20}
                color={theme?.colors?.grey}
                // color={COLORS.primary}
                style={{
                  marginHorizontal: 15,
                }}
              />
            }
            keyBoardType={'email-address'}
            onChangeText={v => {
              setEmail(v);
              setIsEmailValid(validateEmail(v)); // Update isEmailValid based on email validity
            }}
          />

          {!isEmailValid && (
            <Text
              style={{
                color: 'red',
                marginStart: 5,
                fontFamily: FONTS?.regular,
                fontSize: 12,
                marginBottom: 8,
                marginTop: -5,
              }}>
              Please Enter Valid Email
            </Text>
          )}
          <VegUrbanEditText
            placeholder="Seller Shop Name"
            // label={STRING.email}
            maxLength={50}
            iconPosition={'left'}
            value={shopName}
            style={{
              color: theme?.colors?.white,
            }}
            icon={
              <Feather
                name={'shopping-bag'}
                size={20}
                color={theme?.colors?.grey}
                // color={COLORS.primary}
                style={{
                  marginHorizontal: 15,
                }}
              />
            }
            onChangeText={v => setShopName(v)}
          />
          <VegUrbanEditText
            placeholder="Seller Phone"
            // label={STRING.email}
            iconPosition={'left'}
            value={seller_phone}
            style={{
              color: theme?.colors?.white,
            }}
            maxLength={10}
            keyBoardType={'number-pad'}
            icon={
              <Feather
                name={'phone'}
                size={20}
                color={theme?.colors?.grey}
                // color={COLORS.primary}
                style={{
                  marginHorizontal: 15,
                }}
              />
            }
            onChangeText={v => setPhoneNo(v)}
          />
          <VegUrbanEditText
            placeholder="Address"
            // label={STRING.email}

            iconPosition={'left'}
            value={address}
            style={{
              color: theme?.colors?.white,
            }}
            multiline={true}
            maxLength={600}
            maxHeight={700}
            icon={
              <MaterialIcons
                name={'post-add'}
                size={20}
                color={theme?.colors?.grey}
                // color={COLORS.primary}
                style={{
                  marginHorizontal: 15,
                }}
              />
            }
            onChangeText={v => setAddress(v)}
          />
          <View
            style={[
              styles.textView,
              {
                borderColor: getBorderColor(),
                elevation: 5,
                // flexDirection: getFlexDirection(),
              },
              {
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
              },
              {
                backgroundColor: getBgColor(),
                borderWidth: getBorderWidth(),

                borderRadius: 12,
                // elevation: getElevation(),
              },
            ]}>
            {/* Left side lock icon */}
            <SimpleLineIcons
              name="lock"
              size={20}
              color={theme?.colors?.grey}
              style={{
                paddingLeft: 16,
              }}
            />
            {/* TextInput */}
            <TextInput
              placeholderTextColor={theme?.colors?.textColor}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              placeholder={STRING?.pwd}
              secureTextEntry={!showOtp}
              value={password}
              onChangeText={v => setPassword(v)}
              style={{
                flex: 1,
                paddingLeft: 18,
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular,
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
            {/* Right side eye icon */}
            <TouchableOpacity onPress={() => setShowOtp(!showOtp)}>
              <Octicons
                name={showOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowOtp(!showOtp)}
                color={theme?.colors?.grey}
                style={{
                  paddingEnd: 5,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={[
            styles.forgot_text,
            {
              color: theme.colors?.textColor,
              // textAlign: 'right',
              // color: "#4B97F2",
              fontWeight: '700'

            },
          ]}>
          {t('Remember Me')}
        </Text> */}

          <View
            style={{
              // justifyContent:'center',
              // alignSelf:'center',
              alignItems: 'center',
              // textAlign:'center'
              marginTop: 30,
            }}>
            <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={18}
              fontWeight={'bold'}
              text={'Sign Up'}
              textColor={COLORS?.white}
              backgroundColor={appPrimaryColor}
              // onPress={() => {
              //   // closeSignUpModal();
              //   navigation.navigate('MainContainer')
              // }}
              onPress={() => {
                ShowConsoleLogMessage(API_END_POINTS.API_SINGUP);

                onSingupClick();
                // handleButtonPress()
                // navigation.navigate('ForgotPageNext');
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
          <View
            style={{
              //  marginHorizontal:10,
              marginBottom: 20,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={[
                styles.head,
                {
                  marginLeft: 5,
                  color: theme?.colors?.textColor,
                  fontFamily: FONTS?.regular,
                },
              ]}>
              {!show ? t('Already have an account?') : ' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  styles.head,
                  {
                    color: appPrimaryColor,
                    marginLeft: 5,
                    fontFamily: FONTS?.bold,
                  },
                ]}>
                {!show ? t('Sign in') : ' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderCameraModal()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 15,
    marginStart: 15,
    borderRadius: 100,
    alignSelf: 'flex-start',
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
  heading: {
    textAlign: 'center',
    fontSize: 27,
    color: COLORS.black,
    marginTop: 8,
  },
  heading11: {
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    // fontWeight:'bold',
    marginTop: 8,
  },
  head: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  app_logo: {
    height: 105,
    // resizeMode: 'center',
    alignSelf: 'center',
    width: '25%',
    // marginTop: 30,
    resizeMode: 'cover',
    marginBottom: 30,
    borderRadius: 100,
    padding: 50,
    margin: 20,
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.black,
    marginBottom: 30,
    marginStart: 30,
    marginTop: 10,
    // flexDirection:'flex-end'
    // textDecorationLine: 'underline',
  },
  resendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  resendWrapperText: {
    fontFamily: 'OpenSans-Medium',
    color: COLORS.colorPrimary,
    marginStart: 5,
  },
  msg_privacy_terms: {
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    flex: 1,
  },
  containerRemember: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginVertical: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  label: {
    // flex: 1, // Expands to fill available space
    // paddingLeft: 10, // Add left padding to the label
    fontSize: 16,
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Remove the default background color
    borderWidth: 0, // Remove the border
    padding: 0, // Remove padding
    height: 20,
    width: 10,
  },
  container: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  line: {
    flex: 1, // To make the line expand and fill available space
    height: 0.5, // Adjust the height of the line as needed
    backgroundColor: COLORS?.gray, // Line color
  },
  text: {
    paddingHorizontal: 10, // Add horizontal padding to the text
    fontWeight: 'bold',
    fontSize: 19,
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
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    // borderWidth: 0.2,
    alignSelf: 'center',
    marginVertical: 12,
    // backgroundColor: theme?.colors?.bg_color,
    // borderColor: COLORS?.bg_color,
    // placeholderTextColor:theme?.colors?.textColor,

    // placeholderTextColor: COLORS.editTextBorder,
    paddingHorizontal: 10,
    height: 55,
    marginHorizontal: 0,
    // borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

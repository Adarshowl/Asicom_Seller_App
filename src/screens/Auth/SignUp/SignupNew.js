import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  I18nManager,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { SIZES } from '../../../constants';
import ApiCall from '../../../network/ApiCall';
import { fetchUserData, fetchUserToken } from '../../../redux/actions';
import ImagePicker from 'react-native-image-crop-picker';
import icons from '../../../constants/icons';
import { requestExternalWritePermission } from '../../../utils/RequestUserPermission';
import { COLORS } from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts'
import { useIsFocused } from '@react-navigation/native';

import { STRING } from '../../../constants';
import Foundation from 'react-native-vector-icons/Foundation';
import GlobalStyle from '../../../styles/GlobalStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText'
import VegUrbanFloatEditText from '../../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import PhoneInput from 'react-native-phone-number-input';
import { ShowToastMessage } from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import '../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_END_POINTS } from '../../../network/ApiEndPoints';
import { useDispatch } from 'react-redux';
// import {useDispatch} from 'react-redux';
import {
  ShowConsoleLogMessage,
  validateFieldNotEmpty,
} from '../../../utils/Utility';
import SellerEProgressBar from '../../../utils/SellerEProgressBar';

const SignupNew = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [refer, setRefer] = useState('');
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [seller_name, setUserName] = useState("")
  const [seller_phone, setPhoneNo] = useState('');
  const [shopName, setShopName] = useState('');

  const [address, setAddress] = useState('');
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showConfirmOtp, setShowConfirmOtp] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [focused, setFocused] = React.useState(false);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  const [isModalVisible, setModalVisible] = useState(false);

  const genderOptions = [
    { label: 'Other', value: 'Other' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const handleGenderChange = (value) => {
    setSelectedGender(value);
    toggleModal();
  };
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const [selectedGender, setSelectedGender] = useState('Other'); // State variable to store the selected gender


  // const handleGenderChange = (value) => {
  //   setSelectedGender(value);
  // };

  const [focused2, setFocused2] = React.useState(false);

  const error = ""
  const userToken = useSelector((state) => state.state?.userToken);
  // const userData = useSelector((state) => state.state?.userData);  // console.log(userData)
  // console.log("profile section", userData)
  const [userData, setUserData] = useState({});
  useEffect(() => {
    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        // console.log(value, '------------------');
        if (error) {
        } else {
          if (value !== null) {
            let tmp = JSON.parse(value)
            setUserData(tmp?.response);
            ShowConsoleLogMessage("data for te", (fetchUserData(JSON.parse(value))))
            dispatch(fetchUserData(tmp?.response))
            // getDriverProfile(tmp?.id)
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE' + err);
    }
  };

  const [profileGet, setProfileGet] = useState('');
  console.log("list get profile", userData)
  const isFocused = useIsFocused();
  const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);



  // useEffect(() => {
  //   getUserProfile();
  // }, []);


  useEffect(() => {
    if (userData) {
      setUserName(userData?.name);
      setAddress(userData?.address);
      // setPhoneNo(userData?.response.phone);
      setEmail(userData?.email)
      setPhoneNo(userData?.phone + "");
      setImage(userData?.image);
    }
  }, [userData]);


  const getUserProfile = () => {
    setLoading(true);
    try {
      // console.log("response axi os >>> ", JSON.stringify(API_END_POINTS.GET_PROFILE));

      ApiCall('get', null, API_END_POINTS.GET_PROFILE, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,

      }).then(async response => {

        if (response?.statusCode === 200) {

          let obj = {
            jwtoken: userToken,
            response: response?.data?.response
          }
          console.log("Response get: ", JSON.stringify(obj));
          AsyncStorage.setItem('userData', JSON.stringify(obj));
          dispatch(fetchUserData(obj))
          const updatedData = response?.data?.response;

          ShowConsoleLogMessage(response?.data)
          setImage(updatedData?.image);
          setUserName(updatedData?.name);
          setAddress(updatedData?.address);
          setPhoneNo(updatedData?.seller_phone);
          // setProfileGet(response?.data?.response)
          // ShowToastMessage('Profile Updated successful')
          navigation.goBack()
        } else if (response?.statusCode === 500) {
          if (response.data?.message === "Token Mismatch") {
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
              ]
            );
          }
        } else {
        }
      })
        .catch(error => {
          console.log("error axios -> ", error);
        }).finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(`You selected : ${error.message}`);
      setLoading(false);
    }
  };



 
 
  const closeSignUpModal = () => {
    setShow(!show);
  };

  const isPasswordValid = (password) => {

    return password.length >= 6;
  };
  const isUsernameValid = (username) => {

    return username.length >= 6;
  };


  // const handleButtonPress = () => {
  //   if (isEmailValid(email)) {
  //     navigation.navigate('MainContainer')
  //     // Email is valid, proceed to the next step or action
  //     // For example, navigate to 'ForgotPageNext'
  //   } else {
  //     // Email is not valid, show an error message
  //     ShowToastMessage('Invalid Email', 'Please enter a valid email address.');
  //   }
  // };
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };
  const [showCameraModal, setShowCameraModal] = useState(false);

  // const openImageCamera = () => {
  //   ImagePicker.openPicker({
  //     multiple: false,
  //     cropping: true,
  //     freeStyleCropEnabled: true,
  //     compressImageQuality: 0.4,
  //     forceJpg: true,
  //     includeBase64: true,
  //   }).then(images => {
  //     // const updatedUserData = { ...userData, profile_img: images.path };
  //     // setUserData(updatedUserData);
  //     setImage('data:image/jpeg;base64,' + images.data);
  //     setShowCameraModal(true);
  //   });
  // };

  const openImageCamera = () => {
    ImagePicker.openCamera({
      multiple: false,
      cropping: true,
    }).then(images => {
      setImage(images.path);
      setShowCameraModal(false);
    });
  };

  const [loading, setLoading] = useState(false)

  // const dispatch = useDispatch()
  // const userData = useSelector(state => state.state?.userData);

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
    setImage(userData?.image)

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


  // console.log("image",image)

  const uploadPhotos = async () => {
    setLoading(true);
    // setLoading(true);
    // const params = new FormData();
    // params.append('seller_name', seller_name);
    // params.append('address', address + '');
    // params.append('seller_phone', seller_phone + '');
    // if (seller_phone.length !== 10) {
    //   // Check if the phone number is not 10 digits
    //   setLoading(false);
    //   ShowToastMessage('Mobile number must be 10 digits');
    //   return; // Don't proceed with the API call
    // }
    // if (image == null) {
    //   params.append('image', '');
    // } else if (image != 'null') {
    //   params.append('image', image);
    // } else {
    //   params.append('image', '');
    // }


    try {
      
      const body = {
        seller_name: seller_name,
        seller_phone: seller_phone,
        address: address,
        image: image
      };
     
      // Make sure API_END_POINTS.UPDATE_PROFILE is correctly defined
      ShowConsoleLogMessage(API_END_POINTS.UPDATE_PROFILE);
      console.log("body", body);

      try {
        const response = await ApiCall('post', body, API_END_POINTS.UPDATE_PROFILE, {
          'Content-Type': 'application/json',
          'x-access-token': userToken || userData?.remember_token,
        });

        ShowConsoleLogMessage("update profile response -> " + JSON.stringify(response));

        if (response.data && response.data.status === true) {
          await AsyncStorage.setItem('userData', JSON.stringify(response?.data));

          const updatedData = response?.data?.response;
          // getUserProfile();
          // setUserName(updatedData?.name);
          // setAddress(updatedData?.address);
          // setPhoneNo(updatedData?.seller_phone);
          // setImage(updatedData?.image);
          // dispatch(fetchUserData(response?.data));

          // ShowToastMessage(response?.data?.message);

          // navigation.goBack('Profile');
          ShowToastMessage('Profile Updated successful')


          getUserProfile();
        } else {
          // ShowToastMessage(response?.data?.message);
          if (response.data?.message === "Token Mismatch") {
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
              ]
            );
          }
        }
      } catch (error) {
        console.error('Error making API call:', error);
        ShowToastMessage('An error occurred during profile update.');
      }
    } catch (error) {
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
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
        })
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

  const renderSignUpModal = () => {
    return (
      <Modal
        visible={show}
        animationType="slide"
        style={{ flexGrow: 1 }}
        transparent={true}
        onRequestClose={() => {
          closeSignUpModal();
        }}>
        <View style={GlobalStyle.signupModalBg}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => { }}
            style={GlobalStyle.signupModalBgTrans}></TouchableOpacity>
          <View
            style={[
              GlobalStyle.loginModalBg,
              {
                alignItems: 'center',
                paddingHorizontal: 15,
                flex: 0.85,
                backgroundColor: theme.colors?.bg_color_onBoard,
              },
            ]}>
            <Ionicons
              name="close"
              color={theme?.colors?.colorPrimary}
              size={25}
              style={[
                styles.backIcon,
                {
                  alignSelf: 'flex-end',
                  // marginBottom: 10,
                  // marginEnd: 15,
                },
              ]}
              onPress={() => {
                closeSignUpModal();
              }}
            />
            {showAfter ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: '100%',
                }}>
                <Text
                  style={[
                    styles.heading,
                    {
                      color: theme?.colors?.textColor,
                    },
                  ]}>
                  {t('personal_info')}
                </Text>
                <VegUrbanFloatEditText
                  label={t('name')}
                  iconPosition="left"
                  icon={
                    <Fontisto
                      name={'person'}
                      size={20}
                      color={COLORS.gray}
                      style={
                        {
                          // marginStart: 5,
                          // marginEnd: 10,
                          // marginTop: 5,
                          // alignSelf: 'center',
                          // width: 25,
                          // backgroundColor: 'red',
                        }
                      }
                    />
                  }
                  style={{
                    marginTop: 5,
                  }}
                  value={name}
                  onChangeText={value => {
                    setName(value);
                  }}
                  error={''}
                />
                <VegUrbanFloatEditText
                  label={t('email')}
                  iconPosition="left"
                  icon={
                    <MaterialIcons
                      name={'alternate-email'}
                      size={20}
                      color={COLORS.gray}
                      style={
                        {
                          // marginStart: 5,
                          // marginEnd: 10,
                          // marginTop: 5,
                          // alignSelf: 'center',
                          // width: 25,
                          // backgroundColor: 'green',
                        }
                      }
                    />
                  }
                  style={{
                    marginTop: 5,
                  }}
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                  }}
                  error={''}
                />
                <VegUrbanFloatEditText
                  label={t('refer')}
                  iconPosition="left"
                  icon={
                    <FontAwesome5
                      name={'user-friends'}
                      size={20}
                      color={COLORS.gray}
                      style={
                        {
                          // marginStart: 5,
                          // marginEnd: 15,
                          // marginTop: 5,
                          // alignSelf: 'center',
                          // width: 25,
                          // backgroundColor: 'blue',
                        }
                      }
                    />
                  }
                  style={{
                    marginTop: 5,
                  }}
                  value={refer}
                  onChangeText={value => {
                    setRefer(value);
                  }}
                  error={''}
                />
                <TouchableOpacity
                  activeOpacity={1.0}
                  onPress={() => setTerms(!terms)}
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginStart: 10,
                  }}>
                  <MaterialIcons
                    name={terms ? 'check-box' : 'check-box-outline-blank'}
                    size={20}
                    color={
                      terms
                        ? theme?.colors?.colorPrimary
                        : theme?.colors?.textColor
                    }
                    style={{
                      marginEnd: 10,
                      marginTop: 5,
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    style={[
                      styles.msg_privacy_terms,
                      {
                        color: theme?.colors?.textColor,
                      },
                    ]}>
                    {t('msg_privacy_terms')}
                  </Text>
                </TouchableOpacity>
                <VegUrbanCommonBtn
                  height={60}
                  width={'100%'}
                  borderRadius={5}
                  textSize={16}
                  textColor={theme?.colors?.btnTextColor}
                  text={t('submit')}
                  marginTop={30}
                  backgroundColor={theme?.colors?.colorPrimary}
                  onPress={() => {
                    // setShowAfter(!showAfter);
                    navigation.navigate('MainContainer');
                  }}
                  textStyle={{
                    fontFamily: 'OpenSans-Medium',
                  }}
                />
              </ScrollView>
            ) : (
              <>
                <Text
                  style={[
                    styles.heading,
                    {
                      color: theme.colors?.textColor,
                    },
                  ]}>
                  {t('verify_your_mobile')}
                </Text>
                <PhoneInput
                  ref={phoneInput}
                  containerStyle={[
                    GlobalStyle.phoneContainer,
                    {
                      backgroundColor: theme.colors?.bg_color_onBoard,
                      borderBottomColor: theme?.colors?.colorPrimary,
                    },
                  ]}
                  placeholder={t('mobile')}
                  placeholderTextColor={theme.colors?.white}
                  codeTextStyle={{ color: theme.colors?.white }}
                  textInputStyle={{
                    fontFamily: 'OpenSans-Medium',
                    color: theme.colors?.white,
                  }}
                  countryPickerButtonStyle={{
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                  textContainerStyle={[
                    GlobalStyle.textContainerStyle,
                    {
                      backgroundColor: theme.colors?.bg_color_onBoard,
                    },
                  ]}
                  defaultValue={mobileNumber}
                  onChangeText={text => {
                    setMobileNumber(text);
                  }}
                  onChangeFormattedText={text => {
                    setMobileNumber(text);
                  }}
                  maxLength={10}
                />
                <View
                  style={{
                    alignItems: 'center',
                    height: 60,
                    marginTop: 10,
                  }}>
                  <OtpInputs
                    handleChange={code => setCode(code)}
                    numberOfInputs={6}
                    inputContainerStyles={[
                      GlobalStyle.inputContainerStyles,
                      {
                        borderColor: theme.colors?.colorPrimary,
                      },
                    ]}
                    selectTextOnFocus={() => {
                      setFocused(true);
                    }}
                    onBlur={() => {
                      setFocused(false);
                    }}
                    inputStyles={[
                      GlobalStyle.otpInputStyles,
                      {
                        color: theme.colors?.white,
                      },
                    ]}
                  />
                </View>
                <View style={styles.resendWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={GlobalStyle.flexRowAlignCenter}>
                    <MaterialIcons
                      name="message"
                      size={25}
                      color={theme?.colors?.colorPrimary}
                      style={{
                        marginStart: 15,
                      }}
                    />
                    <Text
                      style={[
                        styles.resendWrapperText,
                        {
                          color: theme?.colors?.colorPrimary,
                        },
                      ]}>
                      {t('resend')}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.resendWrapperText,
                      {
                        marginStart: 'auto',
                        marginEnd: 15,
                        color: theme?.colors?.colorPrimary,
                      },
                    ]}>
                    00:00
                  </Text>
                </View>
                <VegUrbanCommonBtn
                  height={60}
                  width={'85%'}
                  borderRadius={5}
                  textSize={16}
                  textColor={theme?.colors?.btnTextColor}
                  text={t('send_otp')}
                  marginTop={30}
                  backgroundColor={theme?.colors?.colorPrimary}
                  onPress={() => {
                    setShowAfter(!showAfter);
                  }}
                  textStyle={{
                    fontFamily: 'OpenSans-Medium',
                  }}
                />
              </>
            )}
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
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <ScrollView>

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
          <View style={{
            flexDirection: 'row',
            alinItem: 'center',
            marginBottom: 20
          }}>
            <Ionicons
              name="ios-arrow-back"
              // color={COLORS.black}
              color={appPrimaryColor}

              size={25}
              style={[
                styles.backIcon,
                {
                  opacity: !show ? 1 : 0.0,
                  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
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
                  // marginTop: 15,
                  fontFamily: FONTS?.bold,
                  color: appPrimaryColor,
                  // marginBottom:40,
                  marginLeft: 15

                },
              ]}>
              {!show ? t('Manage Account') : ' '}
            </Text>
          </View>

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
                    uri: userData?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHL03nqSptOCTMXb8ym6QffVTfjk2C14HS-w&usqp=CAU"
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


          <View style={{
            marginHorizontal: 16,
            marginTop: 30
          }}>
            <VegUrbanEditText
              // placeholder='Seller Name'
              label="Seller Name"
              iconPosition={'left'}
              value={seller_name}
              maxLength={50}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular

              }}
              // keyBoardType={'email-address'}
              onChangeText={v => setUserName(v)}
            />
            <VegUrbanEditText
              // placeholder="Shop Address"
              label="Shop Address"
              iconPosition={'left'}
              value={address}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular

              }}
              // keyBoardType={'email-address'}
              onChangeText={v => setAddress(v)}
            />



            <VegUrbanEditText
              // placeholder="Email"
              label={STRING.email}
              iconPosition={'right'}
              value={email}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular

              }}
              editable={false}
              // icon={
              //   <Fontisto name={"email"}
              //     size={20}
              //     color={theme?.colors?.grey}
              //     style={{
              //       paddingEnd: 5

              //       // marginHorizontal: 15
              //     }} />

              // }
              keyBoardType={'email-address'}
            // onChangeText={v => {
            //   setEmail(v);
            //   setIsEmailValid(validateEmail(v)); // Update isEmailValid based on email validity
            // }}
            />
            {!isEmailValid && (
              <Text style={{
                color: 'red',
                marginStart: 10,
                fontFamily: FONTS?.regular,
                fontSize: 12
              }}>Please Enter Valid Email</Text>
            )}


            <VegUrbanEditText
              label="Seller Phone"
              iconPosition={'left'}
              value={seller_phone}
              editable={false}

              style={{
                color: theme?.colors?.white

              }}
              maxLength={10}
              keyBoardType={'number-pad'}

              // icon={
              //   <Feather name={"phone"} size={20}
              //     color={theme?.colors?.grey}

              //     // color={COLORS.primary}
              //     style={{
              //       marginHorizontal: 15
              //     }} />

              // }
              onChangeText={v => setPhoneNo(v)}
            />



          </View>

          {/* <View style={[
            styles.textView,
            {
              borderColor: getBorderColor(),
              // flexDirection: getFlexDirection(),
            },
            {
              backgroundColor: getBgColor(),
              borderWidth: getBorderWidth(),
            },
          ]}
          > */}
          {/* <Picker
              selectedValue={selectedGender}
              onValueChange={handleGenderChange}
              // onFocus={() => {
              //   setFocused(true);
              // }}
              // onBlur={() => {
              //   setFocused(false);
              // }}
              style={[styles.picker, {
                color: theme?.colors?.textColor,
              }]}
              dropdownStyle={{
                backgroundColor: theme?.color?.black,
              }}
              mode="dropdown"
              dropdownIconColor={theme?.colors?.textColor}
              dropdownIconRippleColor={theme?.color?.bg}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker> */}
          {/* </View> */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={[styles.modalContent, {
                backgroundColor: theme?.colors?.bg
              }]}>
                <FlatList
                  data={genderOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleGenderChange(item.value)}
                    >
                      <Text style={[styles.modalText, {
                        color: theme?.colors?.white
                      }]}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value}
                />
              </View>
            </View>
          </Modal>


          {/* <Picker
          style={{}}
          selectedValue ={selctpicker}
          onValueChange ={(itemvalue) => {
            setpickerValue(itemvalue);
          }}
          
          >
            {
              gender.map((l) => (
                <Picker.Item label={l} value= {l} />
              ))
            }
          </Picker> */}
        </View>
        {renderSignUpModal()}
        {renderCameraModal()}

      </ScrollView>
      <View style={{
        // justifyContent:'center',
        // alignSelf:'center',
        alignItems: 'center',
        marginVertical: 5
        // textAlign:'center'

      }}>
        <VegUrbanCommonBtn
          height={45}
          width={'90%'}
          borderRadius={20}
          textSize={18}
          text={('Update')}
          textColor={COLORS?.white}
          backgroundColor={appPrimaryColor}
          onPress={() => {
            uploadPhotos()
            // navigation.goBack('Profile');
          }}
          textStyle={{
            fontFamily: FONTS?.bold
          }}

        />
      </View>
    </SafeAreaView>
  );
};

export default SignupNew;

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
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
    // marginTop: 8,
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
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    // fontWeight:'bold',
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
    margin: 20
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.black,
    marginBottom: 30,
    marginStart: 30,
    marginTop: 10
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
    marginHorizontal: 10


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
    flex: 1

  },
  openButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 5,
    marginHorizontal: 28,
    marginBottom: 38,
    borderRadius: 10,
    paddingHorizontal: 10

  },
  modalItem: {
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
  },
  modalText: {
    fontSize: 14,
    fontFamily: FONTS?.regular
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

  selectedGenderText: {
    marginTop: 20,
    fontSize: 18,
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
    width: '91%',
    // borderWidth: 0.2,
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 0,
    height: 55,
    // marginHorizontal: 60,
    borderRadius: 12,
    fontFamily: FONTS?.regular,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  picker: {
    // height: 55,
    width: '100%',
  },

});

import React, { useContext, useState } from "react";
import {
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { images, STRING } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";
import { FONTS } from "../../../constants/Fonts";
import ApiCall from "../../../network/ApiCall";
import { fetchUserData, fetchUserToken } from "../../../redux/actions";
import { COLORS } from "../../../constants/Colors";
import { API_END_POINTS } from "../../../network/ApiEndPoints";
import Octicons from "react-native-vector-icons/Octicons";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import GlobalStyle from "../../../styles/GlobalStyle";
import VegUrbanCommonBtn from "../../../utils/VegUrbanCommonBtn";
import themeContext from "../../../constants/themeContext";
import "../../../assets/i18n/i18n";
import { ShowConsoleLogMessage, ShowToastMessage, validateFieldNotEmpty } from "../../../utils/Utility";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import SellerEProgressBar from "../../../utils/SellerEProgressBar";
// import {useDispatch} from 'react-redux';

const Login = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);

  const error = '';
  const [loading, setLoading] = useState(false);
  const [addressDefault, setAddressDefault] = useState(false);
  const dispatch = useDispatch();
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const [phone, setPhone] = useState('');

  console.log('token', appPrimaryColor);
  const [isEmailSelected, setIsEmailSelected] = useState(true);
  const [loginOption, setLoginOption] = useState('email');
  const [isPhoneValid, setIsPhoneValid] = useState(true); // Initially set to true
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [validpwd, setvalidpwd] = useState(true);

  const isEmail = email => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  // const toggleLoginOption = option => {
  //   setLoginOption(option);
  // };

  const toggleLoginOption = (option) => {
    setLoginOption(option);
    // Clear email field when switching to phone login
    if (option === 'phone') {
      setEmail('');
      setPassword('')
      setIsEmailValid(true); // Reset validation
    }
    // Clear phone field when switching to email login
    if (option === 'email') {
      setPhone('');
      setPassword('')

      setIsPhoneValid(true); // Reset validation
    }
  };


  const validatePhone = text => {
    const isValid = text.length === 10; // Check if the length of text is 10
    setIsPhoneValid(isValid);
    setPhone(text);
  };

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
      return 0.5;
    } else {
      return 0.2;
    }
  };



  const isPasswordValid = password => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialCharacter = specialCharacterRegex.test(password);

    // Password is valid if it meets all requirements
    return (
      password.length >= 6 &&
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      hasSpecialCharacter
    );
  };

  const errorMessage = '';


  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleButtonPress = () => {
    if (isEmail(email) && isPasswordValid(password)) {
      navigation.navigate('MainContainer');
    } else {
      if (!isEmail(email)) {
        Snackbar.show({
          text: 'Invalid Email',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      if (!isPasswordValid(password)) {
        // Show a Snackbar message for an invalid password
        Snackbar.show({
          // text: 'Please enter email and Password',
          duration: Snackbar.LENGTH_LONG, // Use Snackbar.LENGTH_LONG
        });
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };
  const getBorderColor1 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused1) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return COLORS?.colorSecondary;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return COLORS?.colorSecondary;
    }
  };
  const getBgColor1 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused1) {
      return COLORS?.colorSecondary;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return COLORS?.colorSecondary;
    }
  };

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [show, setShow] = useState(false);

  // const onLoginClick = () => {

  //   const email = 'boy12@gmail.com'; // Set your email value here
  //   const password = '123456';

  //   if (validateFieldNotEmpty(email)) {
  //     ShowToastMessage('phone is required');
  //   } else if (validateFieldNotEmpty(password)) {
  //     ShowToastMessage('Password is required');
  //   } else {
  //     setLoading(true);
  //     let body = {
  //       email: email,
  //     password: password,
  //     };

  //     ShowConsoleLogMessage(body);
  //     ApiCall('post', body, 'https://masteradmin-zti3.onrender.com/api/admin/delivery-boy/login', {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzI4NjBjZGU2Y2I2M2QzNTViZGFhNCIsIm5hbWUiOiJNYXN0ZXIgIiwiaWF0IjoxNjk2OTEzMzU2LCJleHAiOjE2OTc1MTgxNTZ9.UebQvMB-sdzVo6LCTKngg0do4KTzrGPgZVVWCIWqGOU'
  //     })
  //       .then(response => {
  //         ShowConsoleLogMessage("login api response -> " + JSON.stringify(response));
  //         if (response?.data?.status == true) {
  //           // AsyncStorage.setItem('userData', String(response?.data?.user?.id));

  //           AsyncStorage.setItem(
  //             'userData',
  //             JSON.stringify(response?.data?.user),
  //           );
  //           setEmail('');
  //           setPassword('');
  //           ShowToastMessage(response?.data?.message);
  //           navigation.navigate('MainContainer');
  //           // getUserProfile(response?.data.user?.id)
  //         } else {
  //           ShowToastMessage(response?.data?.message);
  //         }
  //       })
  //       .catch(error => {
  //         // crashlytics().recordError(error);
  //         ShowToastMessage("api error");
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };

  // const onLoginClick = async () => {
  //   setLoading(true);
  //   try {
  //     const lowerCaseEmail = email.toLowerCase();
  //     if (validateFieldNotEmpty(lowerCaseEmail)) {
  //       ShowToastMessage('Email is Required');
  //     } else if (validateFieldNotEmpty(password)) {
  //       ShowToastMessage('password is  required');
  //     } else {
  //       const body = {
  //         email: lowerCaseEmail,
  //         password: password,
  //       };
  //       ShowConsoleLogMessage(API_END_POINTS.API_LOGIN)
  //       console.log(body)

  //       try {
  //         const response = await ApiCall('post', body, API_END_POINTS.API_LOGIN, {
  //           'Content-Type': 'application/json',
  //         });
  //       // ShowConsoleLogMessage("login api response \n\n\n\n\n\n\n\n\n -> "+JSON.stringify( response.data))
  //         if (response.data && response.data.status === true) {
  //           AsyncStorage.setItem('userData', JSON.stringify(response?.data));
  //           // AsyncStorage.setItem('userToken', response.data.jwtoken);
  //          // ShowConsoleLogMessage("login", response?.data)
  //          //console.log("login responce ", response)
  //           dispatch(fetchUserData(response?.data));
  //           //  dispatch(fetchUserToken(response.data.jwtoken));

  //           setEmail('');
  //           setPassword('');
  //           ShowToastMessage(response.data.message)
  //           navigation.navigate('MainContainer');
  //         } else {
  //            ShowToastMessage(
  //             response?.data?.message
  //           );
  //           // ShowToastMessage("invalid credentials",
  //           //   // response?.data?.message
  //           // );
  //         }
  //       } catch (error) {
  //         // console.error('Error making API call:', error);
  //         // ShowToastMessage('An error occurred during login.');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in login process:', error);
  //     ShowToastMessage(`An error occurred: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onLoginClick11 = async () => {
    setLoading(true);
    try {
      const lowerCaseEmail = email.toLowerCase();
      if (validateFieldNotEmpty(lowerCaseEmail)) {
        ShowToastMessage('Email is Required');
      } else if (validateFieldNotEmpty(password)) {
        ShowToastMessage('password is  required');
      } else {
        const body = {
          email: lowerCaseEmail,
          password: password,
        };
        ShowConsoleLogMessage(API_END_POINTS.API_LOGIN);
        console.log(body);

        try {
          const response = await ApiCall(
            'post',
            body,
            API_END_POINTS.API_LOGIN,
            {
              'Content-Type': 'application/json',
            },
          );
          ShowConsoleLogMessage(
            'login api response \n\n\n\n\n\n\n\n\n -> ' +
            JSON.stringify(response.data.jwtoken),
          );
          if (response?.data?.status === true) {
            AsyncStorage.setItem('userData', JSON.stringify(response?.data));
            dispatch(fetchUserData(response?.data));
            dispatch(fetchUserToken(response.data.jwtoken));
            setEmail('');
            setPassword('');
            ShowToastMessage(response.data.message);
            navigation.navigate('MainContainer');
            // navigation.navigate('ForgotPageNext', { item: response?.data });
          } else {
            ShowToastMessage(response?.data?.message);
          }
        } catch (error) { }
      }
    } catch (error) {
      console.error('Error in login process:', error);
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onLoginClick = async () => {
    setLoading(true);
    try {
      const lowerCaseEmail = email.toLowerCase();
      if (validateFieldNotEmpty(lowerCaseEmail || phone)) {
        ShowToastMessage('Email is Required');
      } else if (validateFieldNotEmpty(password)) {
        ShowToastMessage('password is  required');
      } else {
        const body = {
          email: lowerCaseEmail || phone,
          password: password,
        };
        ShowConsoleLogMessage(API_END_POINTS.API_LOGIN_SEND_OTTP);
        console.log(body);

        try {
          const response = await ApiCall(
            'post',
            body,
            API_END_POINTS.API_LOGIN_SEND_OTTP,
            {
              'Content-Type': 'application/json',
            },
          );
          ShowConsoleLogMessage(
            'login api response \n\n\n\n\n\n\n\n\n -> ' +
            JSON.stringify(response.data),
          );
          if (response?.data?.status === true) {
            ShowConsoleLogMessage(
              'login api response \n\n\n\n\n\n\n\n\n -> ' +
              JSON.stringify(response.data),
            );
            console.log('first login >>>', response?.data);
            // AsyncStorage.setItem('userData', JSON.stringify(response?.data));
            // dispatch(fetchUserData(response?.data));
            // dispatch(fetchUserToken(response.data.jwtoken));
            setEmail('');
            setPassword('');
            ShowToastMessage(response?.data?.message);
            // navigation.navigate('MainContainer');
            navigation.navigate('ForgotPageNext', {
              item: response?.data?.userId,
              userEmail: email,
              userphone: phone,
            });
          } else {
            ShowToastMessage(response?.data?.message);
          }
        } catch (error) { }
      }
    } catch (error) {
      console.error('Error in login process:', error);
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: appPrimaryColor,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <ScrollView>
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              backgroundColor: COLORS?.backgroundColor,
              marginHorizontal: 15,
            },
          ]}>
          {/* <Ionicons
            name="ios-arrow-back"
            // color={COLORS.black}
            color={theme.colors.textColor}

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
            }}
          /> */}

          <Text
            style={[
              styles.heading,
              {
                marginStart: 3,
                color: COLORS?.white,
                marginTop: '20%',
              },
            ]}>
            {!show ? t('hi, welcome to ') : ' '}
          </Text>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <Image
              // source={{
              //   uri:'https://i.pinimg.com/1200x/15/e0/67/15e067e33fbd9ed2f9a41b15d4941bf3.jpg'
              // }}
              source={images.app_logo}
              style={styles.app_logo}
            />

            <View
              style={{
                marginStart: 2,
                marginTop: 15,
                // justifyContent: 'center',
                // alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={[
                  styles.heading,
                  {
                    // marginStart: 10,
                    marginEnd: 20,
                    color: COLORS?.white,
                    fontFamily: FONTS?.bold,
                  },
                ]}>
                {/*{!show ? t('Active eCommerce') : ' '}*/}
                Asicom Seller E-Commerce{'\n'}app
              </Text>
              {/*<Text*/}
              {/*  style={[*/}
              {/*    styles.heading,*/}
              {/*    {*/}
              {/*      color: theme?.colors?.black,*/}
              {/*      marginHorizontal: 10,*/}
              {/*      marginBottom: 30,*/}

              {/*      color: COLORS?.white,*/}
              {/*      fontFamily: FONTS?.bold,*/}
              {/*    },*/}
              {/*  ]}>*/}
              {/*  {!show ? t('seller app') : ' '}*/}
              {/*</Text>*/}
            </View>
          </View>

          {/* </View> */}

          <Text
            style={[
              styles.heading,
              {
                color: theme?.colors?.black,
                marginHorizontal: 2,
                marginBottom: 30,

                color: COLORS?.white,
              },
            ]}>
            {!show ? t('login to your account') : ' '}
          </Text>
          {loginOption === 'email' && (
            <View>
              <Text style={{ color: COLORS?.white, fontFamily: FONTS?.regular }}>
                Email
              </Text>
              <View
                style={[
                  styles.textView,
                  {
                    borderColor: getBorderColor1(),
                    // flexDirection: getFlexDirection(),
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
                    borderRadius: 12,
                  },
                ]}>
                <FontAwesome
                  name={'user-o'}
                  size={20}
                  color={COLORS?.black}
                  // color={theme?.colors?.white}
                  style={{
                    paddingLeft: 16,
                  }}
                />

                <TextInput
                  placeholder="Email"
                  placeholderTextColor={COLORS?.black}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  keyboardType={'email-address'}
                  value={email}
                  onChangeText={v => {
                    setEmail(v);
                    setIsEmailValid(validateEmail(v));
                  }}
                  style={{
                    flex: 1,
                    paddingLeft: 18,
                    color: COLORS?.black,
                    fontFamily: FONTS?.regular,
                  }}
                  onFocus={() => {
                    setFocused1(true);
                  }}
                  onBlur={() => {
                    setFocused1(false);
                  }}
                />
              </View>
            </View>
          )}

          {!isEmailValid && loginOption === 'email' && (
            <Text
              style={{
                color: 'red',
                marginStart: 5,
                fontFamily: FONTS?.regular,
                fontSize: 12,
                marginBottom: 2,
                marginTop: -5,
              }}>
              Please Enter Valid Email
            </Text>
          )}
          {loginOption === 'phone' && (
            <View>
              <Text style={{ color: COLORS?.white, fontFamily: FONTS?.regular }}>
                Phone
              </Text>
              <View
                style={[
                  styles.textView,
                  {
                    borderColor: getBorderColor1(),
                    // flexDirection: getFlexDirection(),
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
                    borderRadius: 12,
                  },
                ]}>
                <FontAwesome
                  name={'user-o'}
                  size={20}
                  color={COLORS?.black}
                  // color={theme?.colors?.white}
                  style={{
                    paddingLeft: 16,
                  }}
                />

                <TextInput
                  maxLength={10}
                  placeholder="Phone"
                  placeholderTextColor={COLORS?.black}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  keyboardType={'phone-pad'}
                  value={phone}
                  onChangeText={text => validatePhone(text)}
                  // onChangeText={text => {
                  //   setPhone(text);
                  //   // setvalidpwd(isPasswordValid(text)); // Update isEmailValid based on email validity
                  // }}
                  style={{
                    flex: 1,
                    paddingLeft: 18,
                    color: COLORS?.black,
                    fontFamily: FONTS?.regular,
                  }}
                  onFocus={() => {
                    setFocused1(true);
                  }}
                  onBlur={() => {
                    setFocused1(false);
                  }}
                />
              </View>
            </View>
          )}

          {!isPhoneValid && loginOption === 'phone' && (
            <Text
              style={{
                color: 'red',
                marginStart: 5,
                fontFamily: FONTS?.regular,
                fontSize: 12,
                marginBottom: 2,
                marginTop: -5,
              }}>
              Please enter 10 numbers for the phone
            </Text>
          )}
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            {loginOption === 'phone' && (
              <TouchableOpacity onPress={() => toggleLoginOption('email')}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS?.white,
                    fontFamily: FONTS?.regular,
                    textDecorationLine: 'underline',
                  }}>
                  or, Login with an email
                </Text>
              </TouchableOpacity>
            )}
            {loginOption === 'email' && (
              <TouchableOpacity onPress={() => toggleLoginOption('phone')}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS?.white,
                    fontFamily: FONTS?.regular,
                    textDecorationLine: 'underline',
                  }}>
                  or, Login with phone
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={{ color: COLORS?.white, fontFamily: FONTS?.regular }}>
            Password
          </Text>
          <View
            style={[
              styles.textView,
              {
                borderColor: getBorderColor(),
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
              },
            ]}>
            <SimpleLineIcons
              name="lock"
              size={20}
              color={COLORS?.black}
              style={{
                // marginHorizontal: 15,
                paddingLeft: 16,
              }}
            />
            <TextInput
              maxLength={10}
              placeholder={STRING?.pwd}
              secureTextEntry={!showOtp}
              placeholderTextColor={COLORS?.black}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              value={password}
              onChangeText={text => {
                setPassword(text);
                // setvalidpwd(isPasswordValid(text)); // Update isEmailValid based on email validity
              }}
              style={{
                flex: 1,
                paddingLeft: 18,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
            <TouchableOpacity onPress={() => setShowOtp(!showOtp)}>
              <Octicons
                name={showOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowOtp(!showOtp)}
                // color={COLORS.primary}
                color={COLORS?.black}
                style={{
                  // marginHorizontal: 20,
                  paddingEnd: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          {!validpwd && (
            <Text
              numberOfLines={3}
              style={{
                color: 'red',
                marginStart: 10,
                fontFamily: FONTS?.regular,
                fontSize: 13,
              }}>
              Password must contain 8-40 character, 1 uppercase(A-Z) 1
              lowercase(e-z), 1 number(0-9), and a special character except
              space
            </Text>
          )}

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAddressDefault(!addressDefault);
            }}
            style={[
              {
                flex: 1,
                marginHorizontal: 25,
                marginVertical: 30,
                marginBottom: 25,
                alignSelf: 'center',
                marginBottom:40,


              },
              GlobalStyle.flexRowAlignCenter,
            ]}>
            <MaterialCommunityIcons
              name={
                addressDefault ? 'checkbox-marked' : 'checkbox-blank-outline'
              }
              size={22}
              color={theme.colors.colorPrimary}
            />

            <Text
              style={[
                GlobalStyle.addUpSelectionText,
                {
                  color: theme.colors.textColor,
                  fontFamily: FONTS?.bold,
                  // marginBottom:10,
                  marginLeft: 18

                },
              ]}>
              {t('Remember')}
            </Text>
          </TouchableOpacity> */}
          {/* <Text
            onPress={() => navigation.navigate('ForgotPassword')}
            style={[
              styles.forgot_text,
              {
                // color: theme.colors?.textColor,
                textAlign: 'right',
                color: COLORS?.red,
                fontWeight: 'bold'

              },
            ]}>
            {t('forgot_text')}
          </Text> */}

          <View
            style={{
              // justifyContent:'center',
              // alignSelf:'center',
              alignItems: 'center',
              // textAlign:'center'
              marginTop: 50,
            }}>
            <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={18}
              fontWeight={'bold'}
              text={'Login'}
              borderWidth={1}
              borderColor={COLORS?.white}
              textColor={COLORS?.colorPrimary}
              backgroundColor={COLORS?.white}
              // onPress={() => {
              //   closeSignUpModal();
              // }}
              // onPress={() => {
              //   handleButtonPress()

              // }}
              onPress={() => {
                // navigation.navigate('MainContainer');

                onLoginClick();
                // if (mobile) {
                // navigation.navigate('MainContainer');
                // } else  {
                //   ShowToastMessage('Please enter mobile number');
                // }
                // languageRestart();
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
                  color: theme?.colors?.gray,
                  // marginHorizontal:10,
                  // marginBottom:20,
                  // marginTop:20
                  fontWeight: '600',
                },
              ]}>
              Don't have an account?
              {/* {!show ? ('Dont have an account?') : ' '} */}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={[
                  styles.head,
                  {
                    color: COLORS?.black,
                    marginLeft: 5,
                    // marginHorizontal:10,
                    // marginBottom:20,
                    // marginTop:20
                    fontWeight: 'bold',
                    color: COLORS?.white,
                  },
                ]}>
                {!show ? t('Sign Up') : ' '}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.container}>
            <View style={styles.line} />
            <Text

              style={[
                styles.text,
                {
                  alignItems: 'center',
                  textAlign: 'center',

                  fontFamily: FONTS?.bold,
                  color: theme?.colors?.textColor
                },
              ]}>
              {!show ? t('or Continue with') : ' '}
            </Text>
            <View style={styles.line} />
          </View> */}

          {/* <View
            style={{
              paddingVertical: 25,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => ShowToastMessage('FB Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
                }}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => ShowToastMessage('Google Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png',
                }}
                style={{
                  resizeMode: 'center',
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ShowToastMessage('Apple Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png'
                }}
                style={{
                  height: 30,
                  resizeMode: 'cover',
                  width: 30,
                  tintColor: theme.colors?.white,
                }}
              />
            </TouchableOpacity>

          </View> */}
          <View
            style={{
              //  marginHorizontal:10,
              marginBottom: 20,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  backIcon: {
    marginTop: 15,
    marginStart: 15,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  heading: {
    fontFamily: FONTS?.regular,

    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.white,
    // marginTop: 5,
  },

  error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 13,
    fontFamily: FONTS?.bold,

    // fontFamily: 'Quicksand-Regular',
  },
  head: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  app_logo: {
    height: 80,
    width: 80,
    // marginTop: 30,
    // // resizeMode: 'cover',
    // marginBottom: 30,
    marginTop: 5,
    // padding: 50,
    // margin: 20
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: FONTS?.regular,
    // fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    marginBottom: 5,
    marginEnd: 5,
    marginTop: 5,
    // marginVertical: 5,
    // flexDirection:'flex-end'
    textDecorationLine: 'underline',
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
  checkboxContainer: {
    // backgroundColor: 'transparent', // Remove the default background color
    borderWidth: 0, // Remove the border
    padding: 0, // Remove padding
    height: 20,
    width: 10,
    borderColor: COLORS?.black, // Line color
  },
  containerRemember: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginVertical: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
    // textAlign:'center'
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS?.gray,
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.black,
    // marginTop: 10,  },
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
    height: 42,
    marginHorizontal: 0,
    // borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

import {
  Alert,
  I18nManager,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  ActivityIndicator
} from 'react-native';
import { Switch } from 'react-native-elements';
import { FONTS } from '../../constants/Fonts';
import LogoutConfirmationModal from './LogoutConfirmationModal'; // Import your custom modal
import { CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useContext, useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import icons from '../../constants/icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import GlobalStyle from '../../styles/GlobalStyle';
import { SIZES, STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import { ShowToastMessage, ShowConsoleLogMessage } from '../../utils/Utility';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import themeContext from '../../constants/themeContext';
import Octicons from 'react-native-vector-icons/Octicons';
import { useTranslation } from 'react-i18next';
import { EventRegister } from 'react-native-event-listeners';
import SellerEProgressBar from '../../utils/SellerEProgressBar';
import { fetchUserData, fetchUserToken } from '../../redux/actions';


const Profile = ({ navigation, route }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [mobile, setMobile] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const [conPass, setConPass] = useState('');

  const [oldPassShow, setOldPassShow] = useState(true);
  const [newPassShow, setNewPassShow] = useState(true);
  const [conPassShow, setConPassShow] = useState(true);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState('');

  const { selectedLanguage } = route.params || { selectedLanguage: 'English(US)' };

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector((state) => state.state?.userData);
  const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);

  console.log("token", appPrimaryColor)

  const isLoading = useSelector((state) => state.loading);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  const [userData111, setUserData] = useState({});
  console.log("userdata profile", userData)

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  // useEffect(() => {
  //   getUserProfile();
  // }, []);
  // const [profileGet, setProfileGet] = useState('');
  // console.log("list get profile", profileGet)
  // const getUserProfile = () => {
  //   // setLoading(true);
  //   try {
  //     // console.log("response axi os >>> ", JSON.stringify(API_END_POINTS.GET_PROFILE));

  //     ApiCall('get', null, API_END_POINTS.GET_PROFILE, {
  //       'Content-Type': 'application/json',
  //       'x-access-token': userToken || userData?.jwtoken,

  //     }).then( response => {

  //       if (response?.statusCode === 200) {

  //         // let obj = {
  //         //   jwtoken: userToken,
  //         //   response: response?.data?.response
  //         // }
  //         // console.log("Response get: ", JSON.stringify(obj));

  //         setProfileGet(response?.data?.response)
  //         // ShowToastMessage('Profile Updated successful')
  //       } else if (response?.statusCode === 500) {
  //         if (response.data?.message === "Token Mismatch") {
  //           Alert.alert(
  //             'Session Expired',
  //             'Your session has expired due to a security issue. Please log in again to continue using the application.',
  //             [
  //               {
  //                 text: 'OK',
  //                 onPress: () => {
  //                   clearUserToken();
  //                 },
  //               },
  //             ]
  //           );
  //         }
  //       } else {
  //       }
  //     })
  //       .catch(error => {
  //         console.log("error axios -> ", error);
  //       }).finally(() => {
  //         setLoading(false);
  //       });
  //   } catch (error) {
  //     ShowToastMessage(`You selected : ${error.message}`);
  //     setLoading(false);
  //   }
  // };

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };
  const dispatch = useDispatch()

  // useEffect(() => {
  //   setLogoutModalVisible(!isLogoutModalVisible)
  // }, [userData])


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
            // setUserData(tmp);
            // ShowConsoleLogMessage("data for te", (fetchUserData(JSON.parse(value))))
            dispatch(fetchUserData(tmp))
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE' + err);
    }
  };


  // const handleLogoutConfirm = () => {

  //   Alert.alert(
  //     'Logout',
  //     'Are you sure want to logout',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           // handleBackButton()
  //           return null;
  //         },
  //       },
  //       {
  //         text: 'Confirm',
  //         onPress: async () => {
  //           try {
  //             // Clear all user data from AsyncStorage
  //             await AsyncStorage.clear();

  //             // Reset the navigation stack to the 'Auth' screen
  //             navigation.dispatch(
  //               CommonActions.reset({
  //                 index: 0,
  //                 routes: [{ name: 'Auth' }],
  //               })
  //             );
  //           } catch (error) {
  //             console.error('Error logging out:', error);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  const handleLogoutConfirm = () => {
    Alert.alert(
      'Logout',
      'Are you sure want to logout',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              dispatch(fetchUserToken(null));
              dispatch(fetchUserToken(''));
              await AsyncStorage.clear();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                }),
              );
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };




  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Veg urban | A UI KIT framework for building apps',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const closeConfirmModal = () => {
    setShowConfirm(!showConfirm);
  };

  const renderChangePasswordModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={showConfirm}
        onRequestClose={() => {
          closeConfirmModal();
        }}>
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              {
                backgroundColor: theme.colors.bg_color_onBoard,
              },
            ]}>
            <Ionicons
              name="close"
              color={theme.colors.colorPrimary}
              size={25}
              style={[
                styles.backIcon,
                {
                  alignSelf: 'flex-end',
                  marginTop: 20,
                  marginBottom: 5,
                  marginEnd: 15,
                },
              ]}
              onPress={() => {
                closeConfirmModal();
              }}
            />
            <Text
              style={[
                {
                  color: theme.colors.textColor,

                  fontSize: 18,
                  fontFamily: 'OpenSans-Regular',
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                },
              ]}>
              {STRING.change_password}
            </Text>

            <VegUrbanFloatEditText
              label={STRING.old_pass}
              style={{
                marginTop: 5,
              }}
              value={oldPass}
              secureTextEntry={oldPassShow}
              keyBoardType="default"
              onChangeText={value => {
                setOldPass(value);
              }}
              error={''}
              icon={
                <FontAwesome
                  name={oldPassShow ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{
                    marginEnd: 5,
                  }}
                  color={COLORS.grey}
                  onPress={() => setOldPassShow(!oldPassShow)}
                />
              }
              iconPosition={'right'}
            />

            <VegUrbanFloatEditText
              label={STRING.new_pass}
              style={{
                marginTop: 5,
              }}
              value={newPass}
              keyBoardType="default"
              onChangeText={value => {
                setNewPass(value);
              }}
              secureTextEntry={newPassShow}
              error={''}
              icon={
                <FontAwesome
                  name={newPassShow ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{
                    marginEnd: 5,
                  }}
                  color={COLORS.grey}
                  onPress={() => setNewPassShow(!newPassShow)}
                />
              }
              iconPosition={'right'}
            />
            <VegUrbanFloatEditText
              label={STRING.confirm_new_pass}
              style={{
                marginTop: 5,
              }}
              value={conPass}
              keyBoardType="default"
              onChangeText={value => {
                setConPass(value);
              }}
              secureTextEntry={conPassShow}
              error={''}
              icon={
                <FontAwesome
                  name={conPassShow ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{
                    marginEnd: 5,
                  }}
                  color={COLORS.grey}
                  onPress={() => setConPassShow(!conPassShow)}
                />
              }
              iconPosition={'right'}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 10,
              }}>
              <VegUrbanCommonBtn
                height={55}
                width={'100%'}
                borderRadius={2}
                textSize={17}
                marginTop={17}
                textColor={theme.colors.btnTextColor}
                text={STRING.change_password}
                backgroundColor={theme.colors.colorPrimary}
                onPress={() => {
                  closeConfirmModal();
                }}
                textStyle={{
                  fontFamily: 'OpenSans-Medium',
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };



  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: appPrimaryColor,
        },
      ]}>

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: appPrimaryColor,
          },
        ]}>
        <View
          style={[
            styles.backIcon,
            {
              // opacity: !show ? 1 : 0.0,
              // justifyContent:'flex-end',
              alignItems: 'flex-end',
              flex: 1,
              marginHorizontal: 20
            },
          ]}
        >
          <Entypo
            name="cross"
            // color={COLORS.black}
            color={COLORS?.white}
            size={25}

            onPress={() => {
              navigation.goBack();
              // ShowToastMessage('Coming Soon!');
            }}
          />
        </View>

        {/* <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme?.colors?.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        /> */}

      </View>
      {loading ? (

        <SellerEProgressBar loading={loading} />

        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>Loading...</Text>
        // </View>
      ) : (
        <ScrollView>
          <View
            style={styles?.divLine}
          />
          <View
            style={[
              styles.wrapper,
              {
                // backgroundColor: theme?.colors?.bg_color,
              },
            ]}>
            <View style={[
              // GlobalStyle.flexRowAlignCenter
              , {
                marginTop: 2,
                flexDirection:'row',
// justifyContent:'space-evenly'
              }]
            }>
              <Image
                source={{
                  uri: userData?.image || userData?.response?.image || 'https://img.freepik.com/premium-vector/people-ribbon-logo-modern-leadership-logo-human-charity-logo_327835-2463.jpg'
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 20
                }}
              />

              <View
                style={{
                                    // alignSelf: 'flex-start',
                   marginLeft: 15, 
                  // backgroundColor:'red',
                  flex:1 }}>
                <Text
                  // numberOfLines={1}

                  style={[
                    GlobalStyle.bothSideMediumText,
                    { 
                      color: COLORS?.white,
                      fontSize: 18,
                      fontFamily: FONTS?.bold,
                      // maxWidth: '82%'
                    //  flexGrow:1
                    },
                  ]}>
                  
                  {userData?.name || userData?.response?.name}
                  {/* Andrew Ainsley */}
                  {/* {STRING.is_login} */}
                </Text>
                <Text
                  numberOfLines={1}

                  style={[
                    GlobalStyle.bothSideText,
                    {
                      color: COLORS?.white,
                      fontSize: 14,
                      fontFamily: FONTS?.medium,
                      // maxWidth: '80%'

                    },
                  ]}
                >
                  {/* testing_demo@gmail.com */}
                  {userData?.email || userData?.response?.email}
                </Text>
              </View>

              <View
                style={{
                 // flexGrow: 1,
                  // backgroundColor:'yellow',
                  alignSelf:'flex-start',
                  alignItems:'flex-end',
                  marginTop:10
                }}
              >
                <ToolBarIcon
                  title={MaterialIcons}
                  iconName={'edit'}
                  icSize={25}
                  icColor={COLORS?.grey}
                  style={{
                    marginEnd: 10,
                    backgroundColor: theme?.colors?.toolbar_icon_bg,
                  }}
                  onPress={() => {
                    navigation.navigate('SignupNew');
                  }}
                />
              </View>
            </View>

          </View>

          <View
            style={[styles?.divLine, {
              marginTop: 15
            }]}
          />
          <View
            style={[
              GlobalStyle.bgWrapper,
              {
                backgroundColor: appPrimaryColor,
              },
            ]}>
            <ItemView
              title="Profile"
              // title={STRING.notifications}
              onPress={() => {
                navigation.navigate('SignupNew');
              }}
              icon={
                <FontAwesome
                  name={'user-o'}
                  size={25}
                  color={COLORS?.white}
                />
              }
            />
            <ItemView
              title="Dashboard"
              // title={STRING.notifications}
              onPress={() => {
                // ShowToastMessage('Coming soon!');

                navigation.navigate('Home');
              }}
              icon={
                <MaterialCommunityIcons
                  name={'view-dashboard-outline'}
                  size={25}
                  color={COLORS?.white}
                />
              }
            />

            <ItemView
              title="Orders"
              onPress={() => {
                // ShowToastMessage('Coming soon!');

                navigation.navigate('Order');
              }}
              icon={
                <AntDesign

                  name={'shoppingcart'}
                  size={22}
                  color={COLORS?.white}
                />
              }
            />
            <ItemView
              title="Change Password"
              onPress={() => {
                // ShowToastMessage('Coming soon!');

                navigation.navigate('PasswordConform');
              }}
              icon={
                <AntDesign

                  name={'lock'}
                  size={22}
                  color={COLORS?.white}
                />
              }
            />
            <ItemView
              title='Products'
              onPress={() => {
                navigation.navigate('Produxts');
                // ShowToastMessage('Coming soon!');
              }}

              icon={
                <Feather
                  name={'box'}
                  size={25}
                  color={COLORS?.white}
                />
              }

            />
            <ItemView
              title='Support Ticket'
              onPress={() => {
                navigation.navigate('SupportTicket');
                // ShowToastMessage('Coming soon!');
              }}

              icon={
                <Foundation

                  name={'ticket'}
                  size={25}
                  color={COLORS?.white}
                />
              }

            />
              <ItemView
              title='Return Order'
              onPress={() => {
                navigation.navigate('ReturnOrder');
                // ShowToastMessage('Coming soon!');
              }}

              icon={
                <MaterialCommunityIcons

                  name={'cart-variant'}
                  size={25}
                  color={COLORS?.white}
                />
              }

            />
            <ItemView
              title='Payments'
              onPress={() => {
                navigation.navigate('PaymentHistory');
                // ShowToastMessage('Coming soon!');
              }}
              icon={
                <MaterialIcons
                  name={'payment'}
                  size={25}
                  color={COLORS?.white}
                />
              }
            />

            <ItemView
              title='Withdrawal'
              onPress={() => {
                navigation.navigate('Withdrawal');
                // ShowToastMessage('Coming soon!');
              }}
              icon={
                <Entypo
                  name={'credit-card'}
                  size={25}
                  color={COLORS?.white}
                />
              }
            />

            {/* <ItemView
            title={STRING.language}
            onPress={() => {
              navigation.navigate('Language');
              // ShowToastMessage('Coming soon!');
            }}

            icon={

              <FontAwesome name={'language'} size={20} color={theme?.colors?.grey} />


            }
          /> */}
            {/* <TouchableOpacity activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Language');
                // ShowToastMessage('Coming soon!');
              }}
              style={[
                styles.itemWrapper
                ,
                {
                  // flexDirection:'row',
                  justifyContent: 'space-between'

                }]}>
              <View
                style={[
                  // styles.itemIcon,
                  {
                    marginEnd: 10,
                    // width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',

                    // justifyContent:'space-between'
                    flexDirection: 'row'

                  },
                ]}>
                <FontAwesome name={'language'} size={20}
                  color={COLORS?.white}

                  style={{
                    marginStart: 12
                  }}
                />
                <Text
                  style={[
                    styles.itemText,
                    {
                      color: COLORS?.white,
                      marginStart: 22,

                    },
                  ]}>
                  Change Language
                </Text>

              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginEnd: 10,
                  alignItems: 'center',
                  justifyContent: 'center'

                }}>
                <Text style={[
                  styles.itemText,
                  {
                    color: COLORS?.white,
                    marginEnd: 12
                  },
                ]}>{selectedLanguage}</Text>

                <Ionicons
                  name={'chevron-forward'}
                  size={18}
                  color={COLORS?.white}
                  style={{
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1, }],
                    marginTop: 5

                  }}
                />
              </View>

            </TouchableOpacity> */}

            <ItemView
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}
              title={STRING.privacy_policy}
              icon={<Ionicons name={'lock-closed-outline'} size={25}
                color={COLORS?.white}
              />}
            />
            {/* <ItemView
              onPress={() => {
                // navigation.navigate('PrivacyPolicy');
              }}
              title='Commission History'
              icon={<Feather name={'crosshair'} size={25}
                color={COLORS?.white}
              />}
            /> */}

            <ItemView
              onPress={() => {

                navigation.navigate('ProductQuries');
              }}
              title='Product Quries'
              icon={<AntDesign name={'questioncircleo'} size={25}
                color={COLORS?.white}
              />}
            />


            {/* <ItemView
            onPress={showLogoutModal}


            title={STRING.logout}
            show={true}
            icon={<Feather name={'log-out'} size={20} color={theme?.colors?.grey} />}
          /> */}
            <View
              style={[styles?.divLine, {
                marginTop: 15,
                marginHorizontal: -20,
                marginBottom: 15
              }]}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.itemWrapper}
              onPress={handleLogoutConfirm}

            >
              <View
                style={[
                  styles.itemIcon,
                  {
                    marginEnd: 10,
                  },
                ]}>
                <Feather name={'log-out'} size={20}
                  color={COLORS?.white}
                />
              </View>
              <Text
                style={[
                  styles.itemText,
                  {
                    color: COLORS?.white,
                    // fontFamily: FONTS?.medium
                  },
                ]}>
                {STRING.logout}</Text>
              <View
                style={{
                  flex: 1,
                }}
              />

            </TouchableOpacity>
            <View
              style={[styles?.divLine, {
                marginTop: 15,
                marginHorizontal: -20
              }]}
            />
            {/* <TouchableOpacity
            onPress={showLogoutModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: theme?.colors?.bg,
            }}
          >
            <Feather name={'log-out'} size={20} color={theme?.colors?.grey} />
            <Text style={{ marginLeft: 10 }}>{STRING.logout}</Text>
          </TouchableOpacity> */}

            {/* Render the logout confirmation modal */}
            {/* <View style={{ flex: 1 }}>
            <LogoutConfirmationModal
              visible={isLogoutModalVisible}
              onCancel={hideLogoutModal}
              // onConfirm={handleLogoutConfirm}
            />
          </View> */}
          </View>


        </ScrollView>
      )}



    </SafeAreaView>
  );
};

export default Profile;

const ItemView = ({ icon, title, onPress, show }) => {
  const theme = useContext(themeContext);

  return (

    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.itemWrapper}>
      <View
        style={[
          styles.itemIcon,
          {
            marginEnd: 10,
          },
        ]}>
        {icon}
      </View>

      <Text style={[styles.itemText, {
        color: COLORS?.white
      }]}>{title || 'Home'}</Text>

      <View
        style={{
          flex: 1,
        }}
      />
      {show ? null : (
        <View
          style={[
            styles.itemIcon,
            {
              marginStart: 10,
            },
          ]}>
          <Ionicons
            name={'chevron-forward'}
            size={18}
            color={COLORS?.white}
            style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: SIZES.width,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
  wrapper: {
    padding: 10,
    marginTop: 10,
    // backgroundColor: COLORS.colorPrimaryLight,
    // backgroundColor: COLORS.red,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    textAlign: 'center',

    flex: 1,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,


  },
  divLine: {
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    borderColor: COLORS?.white,
    flex: 1,

  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
    marginBottom: 10,
    paddingVertical: 5,
  },
  itemIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  itemText: {
    fontFamily: FONTS?.regular,
    fontSize: 16,
    color: COLORS.white,
    // flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignItems: 'flex-start',
  },
});


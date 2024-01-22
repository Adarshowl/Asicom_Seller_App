import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { I18nManager, LogBox, Text, View } from 'react-native';
import Splash from './src/screens/Auth/Splash';
import ForgotPassword from './src/screens/Auth/ForgotPassword';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store/configureStore';

import RNRestart from 'react-native-restart';
import Offers from './src/screens/Offers';
import Currency from './src/screens/Currency';
import Language from './src/screens/Language';
import AppColors from './src/constants/AppColors';
import Theme from './src/screens/Theme';
import { STRING } from './src/constants';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './src/constants/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RTL from './src/screens/RTL';
import DrawerNav from './src/navigation/DrawerNav';
import './src/assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import SignUp from './src/screens/Auth/SignUp';
import PasswordConform from './src/screens/Auth/ForgotPassword/PasswordConform';
import HomeSwiper from './src/screens/Home/HomeSwiper';
import CategoryHome from './src/screens/Home/CategoryHome';
import TabHomecat from './src/screens/Home/TabHomecat';
import Checkout from './src/screens/Checkout/Checkout';
import ERecipt from './src/screens/Order/ERecipt';
import TrackList from './src/screens/Track/TrackList';
import Wallet from './src/screens/Wallet/Index';
import WalletList from './src/screens/Wallet/WalletList';
import SignupNew from './src/screens/Auth/SignUp/SignupNew';
import InviteFriends from './src/screens/InviteFriends/Index';
import Address from './src/screens/Address/Index';
import AddNewAddress from './src/screens/Address/AddNewAddress';
import WishList from './src/screens/WishList/WishList';
import HelpCenter from './src/screens/HelpCenter/HelpCenter';
import chat from './src/screens/HelpCenter/chat';
import ShippingAddress from './src/screens/Address/ShippingAddress';
import ChooseShipping from './src/screens/Checkout/ChooseShipping';
import PromoCode from './src/screens/Checkout/PromoCode';
import Produxts from './src/screens/Products/Produxts';
import Shops from './src/screens/ShopSetting/Index';
import UpgradePackage from './src/screens/UpgradePackage/Index';
import RefundRequest from './src/screens/RefundRequest/Index';
import AddNewProduct from './src/screens/Products/AddNewProduct';
import PaymentHistory from './src/screens/Payment/PaymentHistory';
import PaymentDetsils from './src/screens/Payment/PaymentDetsils';
import Withdrawal from './src/screens/Withdrawal/Index';
import AddBalance from './src/screens/Withdrawal/AddBalance';
import WithdrawalDetails from './src/screens/Withdrawal/WithdrawalDetails';
import ProductQuries from './src/screens/ProductQuries/Index';
import ProductQuriesDetails from './src/screens/ProductQuries/ProductQuriesDetails';
import BannerSetting from './src/screens/ShopSetting/BannerSetting';
import GeneralSetting from './src/screens/ShopSetting/GeneralSetting';
import SocialMediaLink from './src/screens/ShopSetting/SocialMediaLink';
import Refund from './src/screens/RefundRequest/Refund';
import Bank from './src/screens/PaymentSetting/Index';
import UpdateBank from './src/screens/PaymentSetting/UpdateBank';
import RefundDetails from './src/screens/RefundRequest/RefundDetails';
import SupportTicket from './src/screens/SupportTicket/Index';
import UpdateSupportT from './src/screens/SupportTicket/UpdateSupportT';
import CreteSupportT from './src/screens/SupportTicket/CreteSupportT';
import SupportDetails from './src/screens/SupportTicket/SupportDetails';
import UpdateProduct from './src/screens/Products/UpdateProduct';
import CreateBank from './src/screens/PaymentSetting/CreateBank';
import ReturnOrder from './src/screens/ReturnOrder/Index';
import ReturnOrderDetails from './src/screens/ReturnOrder/ReturnOrderDetails';
import UpdateQuries from './src/screens/ProductQuries/UpdateQuries';


const store = configureStore();


const OnBoarding = lazy(() => import('./src/screens/Auth/OnBoarding'));
const Login = lazy(() => import('./src/screens/Auth/Login'));
const Profile = lazy(() => import('./src/screens/Profile/index'));
const ProductDetail = lazy(() =>
  import('./src/screens/Products/ProductDetail'),
);

const Search = lazy(() => import('./src/screens/Search'));
const AddressList = lazy(() => import('./src/screens/Address/AddressList'));
const Order = lazy(() => import('./src/screens/Order'));
const OrderConfirm = lazy(() => import('./src/screens/Order/OrderConfirm'));
const TrackOrder = lazy(() => import('./src/screens/TrackOrder'));
const OrderDetails = lazy(() => import('./src/screens/Order/OrderDetails'));
const Cart = lazy(() => import('./src/screens/Cart'));
const Notification = lazy(() => import('./src/screens/Notification'));
const Transaction = lazy(() => import('./src/screens/Transaction'));
const About = lazy(() => import('./src/screens/Content/About'));
const Contact = lazy(() => import('./src/screens/Content/Contact'));
const FAQ = lazy(() => import('./src/screens/Content/FAQ'));
const CategoryData = lazy(() => import('./src/screens/Category/CategoryData'))
const TermsCondition = lazy(() =>
  import('./src/screens/Content/TermsCondition'),
);
const ForgotPageNext = lazy(() => import('./src/screens/Auth/ForgotPassword/ForgotPageNext'))
const PrivacyPolicy = lazy(() => import('./src/screens/Content/PrivacyPolicy'));
const CategoryDataList = lazy(() => import('./src/screens/Category/CategoryDataList'))

const AddressAddUpdate = lazy(() =>
  import('./src/screens/Address/AddressAddUpdate'),
);
const FlashSale = lazy(() => import('./src/screens/Flash/FlashSale'));
const Review = lazy(() => import('./src/screens/Review'));

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
const Stack = createNativeStackNavigator();

export const languageRestart = async () => {
  //changing language based on what was chosen
  //   if (//selected language is LTR) {
  //     if (I18nManager.isRTL) {
  //       await I18nManager.forceRTL(false);
  //     }
  // } else {
  if (!I18nManager.isRTL) {
    await I18nManager.forceRTL(true);
  } else if (I18nManager.isRTL) {
    await I18nManager.forceRTL(false);
  }
  // }
  RNRestart.restart();
};

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: I18nManager.isRTL ? 'slide_from_left' : 'slide_from_right',
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const App = () => {
  if (!__DEV__) {
    console.log = () => { };
    console.info = () => { };
    console.warn = () => { };
    console.debug = () => { };
    console.error = () => { };
  }
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    getUserFromStorage();
    const listener = EventRegister.addEventListener(STRING.app_theme, data => {
      setDarkMode(data);
      AsyncStorage.setItem(STRING.app_theme, data + '');
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_theme, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (value == 'true') {
              setDarkMode(true);
            } else {
              setDarkMode(false);
            }
          } else {
          }
        }
      });
      await AsyncStorage.getItem(STRING.app_lang, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            STRING.APP_LANGUAGE = value;
            changeLanguage(value);
          } else {
            STRING.APP_LANGUAGE = 'en';
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  return (
    <Provider store={store}>

      <themeContext.Provider value={darkMode ? AppColors.dark : AppColors.light}>
        <Suspense
          fallback={
            <View>
              <Text>Loading...</Text>
            </View>
          }>
          <NavigationContainer
            // theme={STRING.APP_THEME == 'dark' ? AppColors.dark : AppColors.light}>
            theme={darkMode ? AppColors.dark : AppColors.light}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: I18nManager.isRTL
                  ? 'slide_from_left'
                  : 'slide_from_right',
                statusBarAnimation: 'slide',
                statusBarColor: darkMode
                  ? AppColors.dark.colors.transparent
                  : AppColors.light.colors.transparent,
                statusBarStyle: 'light',
              }}
            >
              <Stack.Screen name="Auth" component={Auth} />
              {/*<Stack.Screen name="MainContainer" component={BottomTabNav} />*/}
              <Stack.Screen name="MainContainer" component={DrawerNav} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Produxts" component={Produxts} />
              <Stack.Screen name="Shops" component={Shops} />
              <Stack.Screen name="Bank" component={Bank} />
              <Stack.Screen name="UpdateBank" component={UpdateBank} />
              <Stack.Screen name="UpdateProduct" component={UpdateProduct} />

              <Stack.Screen name="UpgradePackage" component={UpgradePackage} />
              <Stack.Screen name="RefundRequest" component={RefundRequest} />
              <Stack.Screen name="RefundDetails" component={RefundDetails} />
              <Stack.Screen name="SupportTicket" component={SupportTicket} />
              <Stack.Screen name="UpdateSupportT" component={UpdateSupportT} />
              <Stack.Screen name="CreteSupportT" component={CreteSupportT} />
              <Stack.Screen name="SupportDetails" component={SupportDetails} />
              <Stack.Screen name="CreateBank" component={CreateBank} />
              <Stack.Screen name="UpdateQuries" component={UpdateQuries} />

              <Stack.Screen name="ReturnOrderDetails" component={ReturnOrderDetails} />

              <Stack.Screen name="ReturnOrder" component={ReturnOrder} />

              <Stack.Screen name="ProductDetail" component={ProductDetail} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="AddressList" component={AddressList} />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
              <Stack.Screen name="TrackOrder" component={TrackOrder} />
              <Stack.Screen name="OrderDetails" component={OrderDetails} />
              <Stack.Screen name="Carts" component={Cart} />
              <Stack.Screen name="ERecipt" component={ERecipt} />
              <Stack.Screen name="SignupNew" component={SignupNew} />
              <Stack.Screen name="WishList" component={WishList} />
              <Stack.Screen name="HelpCenter" component={HelpCenter} />
              <Stack.Screen name="ChooseShipping" component={ChooseShipping} />
              <Stack.Screen name="PromoCode" component={PromoCode} />

              {/* <Stack.Screen name="SignupNew" component={SignupNew} /> */}


              <Stack.Screen name="ShippingAddress" component={ShippingAddress} />

              <Stack.Screen name="chat" component={chat} />

              <Stack.Screen name="HomeSwiper" component={HomeSwiper} />
              <Stack.Screen name="CategoryHome" component={CategoryHome} />
              <Stack.Screen name="TabHomecat" component={TabHomecat} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="TrackList" component={TrackList} />
              <Stack.Screen name="Wallet" component={Wallet} />
              <Stack.Screen name="WalletList" component={WalletList} />
              <Stack.Screen name="Address" component={Address} />
              <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
              <Stack.Screen name="AddNewProduct" component={AddNewProduct} />

              <Stack.Screen name="InviteFriends" component={InviteFriends} />
              <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
              <Stack.Screen name="BannerSetting" component={BannerSetting} />
              <Stack.Screen name="GeneralSetting" component={GeneralSetting} />
              <Stack.Screen name="SocialMediaLink" component={SocialMediaLink} />
              <Stack.Screen name="Refund" component={Refund} />

              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="Transaction" component={Transaction} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="Contact" component={Contact} />
              <Stack.Screen name="FAQ" component={FAQ} />
              <Stack.Screen name="TermsCondition" component={TermsCondition} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="CategoryData" component={CategoryData} />
              <Stack.Screen name="CategoryDataList" component={CategoryDataList} />
              <Stack.Screen name="ForgotPageNext" component={ForgotPageNext} />
              <Stack.Screen name="PasswordConform" component={PasswordConform} />
              <Stack.Screen name="PaymentDetsils" component={PaymentDetsils} />
              <Stack.Screen name="Withdrawal" component={Withdrawal} />
              <Stack.Screen name="AddBalance" component={AddBalance} />
              <Stack.Screen name="ProductQuries" component={ProductQuries} />
              <Stack.Screen name="ProductQuriesDetails" component={ProductQuriesDetails} />

              <Stack.Screen name="WithdrawalDetails" component={WithdrawalDetails} />

              <Stack.Screen
                name="AddressAddUpdate"
                component={AddressAddUpdate}
              />
              <Stack.Screen name="FlashSale" component={FlashSale} />
              <Stack.Screen name="Review" component={Review} />
              <Stack.Screen name="Offers" component={Offers} />
              <Stack.Screen name="Currency" component={Currency} />
              <Stack.Screen name="Language" component={Language} />
              <Stack.Screen name="Theme" component={Theme} />
              <Stack.Screen name="RTL" component={RTL} />
            </Stack.Navigator>
          </NavigationContainer>
        </Suspense>
      </themeContext.Provider>
    </Provider>
  );
};

export default App;

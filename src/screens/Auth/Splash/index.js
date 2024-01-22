import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import images from "../../../constants/images";
import GlobalStyle from "../../../styles/GlobalStyle";
import { COLORS } from "../../../constants/Colors";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { fetchUserData, fetchUserToken, setAppColor, setAppCurrency, setDefaultImage } from "../../../redux/actions";
import ApiCall from "../../../network/ApiCall";
import { API_END_POINTS, API_TYPE } from "../../../network/ApiEndPoints";
import { ShowConsoleLogMessage } from "../../../utils/Utility";
// import FastImage from 'react-native-fast-image';
const Splash = ({navigation}) => {
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      await getAppConfiguration();
      await getCurrency();
      await getUserFromStorage();
    }, 0);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const savedImage = await getSavedAppImage();
  //       // ShowConsoleLogMessage('success value change' + savedImage[0]?.image);
  //       setImage(savedImage[0]?.image);
  //     } catch (error) {
  //       await getAppConfiguration();
  //       await getUserFromStorage();
  //       navigation.replace('MainContainer');
  //       ShowConsoleLogMessage(error);
  //     } finally {
  //       await getUserFromStorage();
  //       await getAppConfiguration();
  //       navigation.replace('MainContainer');
  //     }
  //   };
  //   const timeoutId = setTimeout(fetchData, 1000);
  //   return () => clearTimeout(timeoutId); // Cleanup the timer on unmount
  // }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            console.log('vallllllll', JSON.parse(value)?.response);
            // dispatch(fetchUserData(JSON.parse(value)))
            dispatch(fetchUserData(JSON.parse(value)?.response));
            dispatch(fetchUserToken(JSON.parse(value)?.jwtoken));
            navigation.replace('MainContainer');
          } else {
            navigation.replace('Login');
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getAppConfiguration = async () => {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.APP_COLOR_CHANGE,
    );
    if (response?.statusCode == 500) {
    } else {
      if (response.data.status == true) {
        // console.log(response?.data?.data?.app_default_image);
        const appPrimaryColor = response?.data?.data?.app_primary_color;
        AsyncStorage.setItem(
          'appPrimaryColor',
          JSON.stringify(appPrimaryColor),
        );
        AsyncStorage.setItem(
          'defaultImage',
          JSON.stringify(response?.data?.data?.app_default_image),
        );
        dispatch(setAppColor(appPrimaryColor));
        dispatch(setDefaultImage(response?.data?.data?.app_default_image));
        ShowConsoleLogMessage(
          JSON.stringify(response?.data?.data?.app_primary_color),
        );
      } else {
        // dispatch(changeAppColor('#FF6600'));
      }
    }
  };

  const getCurrency = async () => {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.CURRENCY_APP,
    );
    if (response?.statusCode == 500) {
    } else {
      console.log(response);

      if (response.data.status == true) {
        // console.log(response?.data?.data?.app_default_image);
        const appcurrency = response?.data?.data?.currency_symbol;
        AsyncStorage.setItem('appcurrency', JSON.stringify(appcurrency));
        // AsyncStorage.setItem('app_logo', JSON.stringify(response?.data?.data?.app_logo));

        dispatch(setAppCurrency(appcurrency));
        ShowConsoleLogMessage(
          JSON.stringify(response?.data?.data?.currency_symbol),
        );
      } else {
        // dispatch(changeAppColor('#FF6600'));
      }
    }
  };

  return (
    <View style={[GlobalStyle.mainContainerBgColor, styles.background]}>
      <FastImage style={styles.image} source={images.asicomlogo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  background: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

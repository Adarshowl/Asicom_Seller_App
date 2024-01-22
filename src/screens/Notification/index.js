import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  I18nManager,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { STRING } from '../../constants';
import NotificationItem from './NotificationItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';

import { Image } from 'react-native-elements';

const Notification = ({ navigation }) => {
  const [show, setShow] = useState(false);

  const theme = useContext(themeContext);
  const staticNotifications = [
    {
      id: 1,
      title: 'Today',
      notifications: [
        {
          id: 101,
          message: '30% Special Discount.',
          timestamp: '2023-10-01T09:00:00',
          title: "Special promotion only valis today",

          image: "https://cdn-icons-png.flaticon.com/128/3012/3012373.png"
        },

        // Add more notifications for "Today"
      ],
    },
    {
      id: 2,
      title: 'Yesterday',
      notifications: [
        {
          id: 201,
          message: 'New Services Available!',
          timestamp: '2023-09-30T17:30:00',
          title: "Now you can track orders in real",

          image: "https://cdn-icons-png.flaticon.com/128/11222/11222376.png"

        },
        {
          id: 202,
          message: '30% sepcial Discount!',
          timestamp: '2023-09-30T20:15:00',
          title: "Special promotion",

          image: "https://icon-library.com/images/location-icon-vector/location-icon-vector-28.jpg"

        },
      ],
    },
    {
      id: 2,
      title: 'December 22, 2024',
      notifications: [
        {
          id: 201,
          message: 'Credit Card Connected!',
          timestamp: '2023-09-30T17:30:00',
          title: "Credit Card has been linked!",
          image: "https://cdn-icons-png.flaticon.com/128/147/147258.png"

        },
        {
          id: 202,
          message: 'Account Steup Successful',
          timestamp: '2023-09-30T20:15:00',
          title: "Your account has been creadited",

          image: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png"

        },
        // Add more notifications for "Yesterday"
      ],
    },
  ];



  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}

          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              marginStart: 10
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
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
        <VegUrbanCommonToolBar
          title={STRING.notifications}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            marginStart: 20,
            fontFamily: FONTS?.bold,

          }}
        />
        <MaterialCommunityIcons

          name={'dots-horizontal-circle-outline'}
          size={26}
          // color={COLORS.colorPrimary} 
          style={{
            marginEnd: 10
          }}
          color={theme?.colors?.textColor}
        />
      </View>
      <FlatList
        data={staticNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationCategory}>
            <Text style={[styles.categoryTitle, {
              color: theme?.colors?.textColor
            }]}>{item.title}</Text>
            <FlatList
              data={item.notifications}
              keyExtractor={(notification) => notification.id.toString()}
              renderItem={({ item: notification }) => (
                <View
                // style={styles.notificationItem}
                >
                  <TouchableOpacity
                    // activeOpacity={0.9}
                    style={[
                      styles.wrapper,
                      {
                        backgroundColor: theme?.colors?.bg,
                        // flex:1
                      },
                    ]}
                    onPress={() => { }}>
                    {/* <Image
                      source={{
                        uri: notification?.image
                      }}
                      style={styles?.imagestyle}
                    /> */}
                    <ImageBackground

                      style={[styles.imagestyle, {
                        // backgroundColor:"#F2F4F4",
                        backgroundColor: theme?.colors?.colorPrimary,
                        alignItems: 'center',
                        // alignSelf: 'center',
                        justifyContent: 'center'
                      }]}
                    >
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius:50,

                          alignSelf: 'center',
                          margin: 8
                          // resizeMode:'contain',
                          // borderRadius: 10,
                          // marginTop: 30
                        }}
                        // style={styles.itemImage}
                        source={{
                          uri: notification?.image
                        }}
                      />
                    </ImageBackground>
                    <View style={{
                      marginStart: 8,
                      flex: 1,
                      marginVertical: 5,
                      marginLeft: 15
                    }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'

                        style={[
                          styles.headingtext,
                          {
                            // marginTop: show ? 5 : 0,
                            color: theme?.colors?.white,
                          },
                        ]}>
                        {notification?.message}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[styles.descText, {
                          color: theme?.colors?.textColor
                        }]}>
                        {notification?.title}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      />
      {/* <FlatList
        style={{
          paddingStart: 0,
          paddingEnd: 0,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 0,
        }}
        ListFooterComponent={() => {
          return <View style={{}} />;
        }}
        ListFooterComponentStyle={{
          paddingBottom: 0,
        }}
        showsVerticalScrollIndicator={false}
        // data={[1, 2, 3, 4, 56, 565, 8946]}
        renderItem={({item, index}) => (
          <NotificationItem show={index % 2 == 0} />
        )}
      /> */}
    </SafeAreaView>
  );
};

export default Notification;
const styles = StyleSheet.create({
  notificationCategory: {
    marginBottom: 0,
    marginTop: 10,
    flex: 1
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 18,
    // color: COLORS?.black,
    fontFamily: FONTS?.medium

  },
  headingtext: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  descText: {
    fontFamily: FONTS?.regular,
    fontSize: 15,
    marginTop: 3,
    color: COLORS.black,
  },
  notificationItem: {
    // backgroundColor:COLORS?.black,
    padding: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 1
  },
  wrapper: {
    elevation: 5,

    // backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row'
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    marginLeft: 10
  }
});

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {lazy, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import themeContext from '../constants/themeContext';
import Order from '../screens/Order';
import Profile from '../screens/Profile';
import {FONTS} from '../constants/Fonts';
import Produxts from '../screens/Products/Produxts';

const Category = lazy(() => import('../screens/Category'));
const Favorite = lazy(() => import('../screens/Favorite'));
const Cart = lazy(() => import('../screens/Cart'));

const Tab = createBottomTabNavigator();
const BottomTabNav = () => {
  const theme = useContext(themeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme?.colors.bg_color_onBoard,
          height: 60,
          paddingTop: 15,
          paddingBottom: 18,
          // borderTopWidth: 0,
        },
        tabBarItemStyle: {},
      }}
      // initialRouteName="Home"
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={'view-dashboard-outline'}
                size={22}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />

              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                    // fontFamily:FONTS?.bold
                  },
                ]}>
                {' '}
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Produxts"
        component={Produxts}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Feather
                name="box"
                size={22}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                {' '}
                Product
              </Text>
              {/* {focused ? (
                <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                        ? theme?.colors.colorPrimary
                        : theme?.colors.grey,
                    },
                  ]}>
                  {STRING.cart}
                </Text>
              ) : null} */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <AntDesign
                name={'shoppingcart'}
                size={22}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                {' '}
                Order
              </Text>
              {/* {focused ? (
                <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                        ? theme?.colors.colorPrimary
                        : theme?.colors.grey,
                    },
                  ]}>
                  {STRING.cart}
                </Text>
              ) : null} */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <AntDesign
                name="user"
                // name={focused ? 'heart' : 'hearto'}
                size={22}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: FONTS?.regular,
  },
});

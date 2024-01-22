import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {tabData} from '../../utils/data';
import TabOfferScreen from './TabOfferScreen';
import {Animated, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {SIZES} from '../../constants';

const Tab = createMaterialTopTabNavigator();

const CAMERA_TAB_ITEM_WIDTH = SIZES.width * 0.1;
const NORMAL_TAB_ITEM_WIDTH = SIZES.width / 2;

const MyTabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 5,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const tabBarItemWidth = NORMAL_TAB_ITEM_WIDTH;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // const inputRange = state.routes.map((_, i) => i);

        // const opacity = position.interpolate({
        //   inputRange,
        //   outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        // });

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              maxWidth: 80,
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              backgroundColor: isFocused
                ? COLORS.colorPrimary
                : COLORS.light_gray,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            <Animated.Text
              style={{
                color: isFocused ? COLORS.white : COLORS.colorPrimary,
                fontFamily: 'Quicksand-Bold',
              }}>
              {/* {label.toUpperCase()} */}
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
      {/* <TabBarIndicator state={state} /> */}
    </View>
  );
};
const TopTabNav = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
      style={{
        backgroundColor: COLORS.white,
      }}
      screenOptions={{
        tabBarAndroidRipple: {borderless: false},
        swipeEnabled: true,
        tabBarScrollEnabled: true,
      }}>
      {tabData.map(item => (
        <Tab.Screen
          key={item.id}
          name={item.name}
          children={TabOfferScreen}
          initialParams={{item: item}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TopTabNav;

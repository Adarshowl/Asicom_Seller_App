import React, {I18nManager, useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RefundRequest from './Index';
import AcceptedList from './AcceptedList';
import RejectedList from './RejectedList';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

import {FONTS} from '../../constants/Fonts';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const Refund = ({navigation}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const isRTL = I18nManager;
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Ionicons
          name="ios-arrow-back"
          color={COLORS.black}
          size={25}
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Refund Request"
          style={styles.toolbar}
          textStyle={styles.toolbarText}
        /> */}
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
                marginStart: 10,
              },
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          />

          <VegUrbanCommonToolBar
            title="Refund Request"
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
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: COLORS.black,
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS?.black,
          },
          indicatorStyle: {backgroundColor: appPrimaryColor},
        }}>
        <Tab.Screen name="All" component={RefundRequest} />
        <Tab.Screen name="Accepted" component={AcceptedList} />
        <Tab.Screen name="Rejected" component={RejectedList} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 0,
  },
  backIcon: {
    marginStart: 10,
  },
  toolbar: {
    marginStart: 10,
    fontFamily: FONTS.bold,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  toolbarText: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Refund;

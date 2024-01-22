import {FlatList, SafeAreaView, View} from 'react-native';
import React from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {STRING} from '../../constants';
import NotificationItem from './NotificationItem';

const Notification = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar title={STRING.notifications} />
      </View>
      <FlatList
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
        data={[1, 2, 3, 4, 56, 565, 8946]}
        renderItem={({item, index}) => (
          <NotificationItem show={index % 2 == 0} />
        )}
      />
    </SafeAreaView>
  );
};

export default Notification;

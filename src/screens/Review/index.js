import {FlatList, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {STRING} from '../../constants';
import TransactionItem from './TransactionItem';

const Transaction = ({navigation}) => {
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
        <VegUrbanCommonToolBar title={STRING.transaction_history} />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 15,
          // flex: 1,
        }}>
        <Text
          style={{
            marginHorizontal: 15,
            marginTop: 20,
            fontFamily: 'OpenSans-Medium',
            color: COLORS.gray,
            fontSize: 20,
          }}>
          {STRING.no_transaction_history_found}
        </Text>
        <Text
          style={{
            marginHorizontal: 15,
            marginTop: 15,
            fontFamily: 'OpenSans-Medium',
            color: COLORS.gray,
            fontSize: 15,
          }}>
          {STRING.you_have_not_any_transactional_history_yet}
        </Text>
      </View>
      <FlatList
        style={{
          paddingStart: 10,
          paddingEnd: 5,
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
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 0.5,
                backgroundColor: COLORS.light_gray,
                marginTop: 2,
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4]}
        renderItem={({item, index}) => <TransactionItem />}
      />
    </SafeAreaView>
  );
};

export default Transaction;

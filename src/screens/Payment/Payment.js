import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import PaymentItem from './PaymentItem';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';

const Payment = ({navigation}) => {
  return (
    <View
      style={GlobalStyle.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <ScrollView
        style={
          {
            // backgroundColor: 'red',
          }
        }>
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 14,
            color: COLORS.colorPrimary,
            marginStart: 15,
            marginTop: 8,
          }}>
          {STRING.delivery_date}
        </Text>
        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,
            paddingBottom: 65,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 15,
          }}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 8]}
          renderItem={({item, index}) => <PaymentItem show={index % 2 == 0} />}
        />
      </ScrollView>
    </View>
  );
};
export default Payment;

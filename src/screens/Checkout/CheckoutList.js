import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import AddressItem from './CheckoutItem';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CheckoutList = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 15,
        }}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({item, index}) => <AddressItem show={index % 2 == 0} />}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          backgroundColor: COLORS.colorPrimary,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          right: 15,
        }}>
        <AntDesign name={'plus'} color={COLORS.white} size={20} />
      </TouchableOpacity>
    </View>
  );
};
export default CheckoutList;

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';

const TransactionItem = ({item, show}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.wrapper]}
      onPress={() => {}}>
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          color: COLORS.black,
        }}>
        ID : 152
      </Text>
      <View
        style={{
          height: 0.5,
          backgroundColor: COLORS.light_gray,
          marginVertical: 5,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            fontSize: 14,
            color: COLORS.colorPrimary,
          }}>
          Payment Mode
        </Text>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            fontSize: 14,
            color: COLORS.white,
            backgroundColor: COLORS.light_green,
            paddingHorizontal: 10,
            paddingVertical: 1,
            borderRadius: 3,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {STRING.status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              color: COLORS.grey,
            }}>
            {STRING.transaction_date_and_time}
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              color: COLORS.grey,
            }}>
            25-10-2023 02:56 Pm
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            fontSize: 14,
            color: COLORS.colorPrimary,
          }}>
          {STRING.amount_} ₹120
        </Text>
      </View>

      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          marginTop: 5,
          color: COLORS.grey,
        }}>
        {STRING.message}
      </Text>
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          color: COLORS.grey,
          marginTop: 2,
        }}>
        In publishing and graphic design, Lorem ipsum is a placeholder text
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    backgroundColor: COLORS.search_bg_grey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

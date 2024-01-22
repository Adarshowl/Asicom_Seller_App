import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const PaymentItem = ({item, show}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.wrapper}
      onPress={() => {}}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              fontSize: 15,
              color: COLORS.black,
              marginStart: 5,
              flexWrap: 'wrap',
            }}>
            Fruit name
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 13,
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
                flexWrap: 'wrap',
              }}>
              Qty:1{'   '}₹10.00
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 13,
                color: COLORS.grey,
                marginStart: 5,
                flexWrap: 'wrap',
              }}>
              Tax(0%) {'   '} ₹0.00
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              color: COLORS.colorPrimary,
              marginEnd: 5,
              flexWrap: 'wrap',
              alignSelf: 'flex-end',
              marginStart: 'auto',
            }}>
            ₹10.00
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PaymentItem);

const styles = StyleSheet.create({
  imageStyle: {
    // height: 120,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    resizeMode: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    flexDirection: 'row',
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

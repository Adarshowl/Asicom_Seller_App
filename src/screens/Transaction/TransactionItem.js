import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';

const TransactionItem = ({item, show}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.wrapper]}
      onPress={() => {}}>
      {show ? (
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/7225580/pexels-photo-7225580.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
          style={{
            flex: 1,
            height: 250,
          }}
        />
      ) : null}
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          color: COLORS.black,
          marginTop: show ? 5 : 0,
        }}>
        Morning 9 am to 12 pm
      </Text>

      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          color: COLORS.grey,
        }}>
        Morning
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
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
